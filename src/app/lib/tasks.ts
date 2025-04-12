import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const createTask = (body: any, userId: string) => {
  let data: Prisma.TaskCreateInput = {
    title: body.title,
    description: body.description,
    status: body.status,
    priority: body.priority,
    dueDate: new Date(body.dueDate).toISOString(),
    creator: {
      connect: {
        id: userId
      }
    },
    project: {
      connect: {
        id: body.projectId
      }
    },
  };
  if (body.taskId !== null)
    data.parentTask = {
      connect: { id: body.taskId }
    }
  return prisma.task.create({ data });
};

export const getTaskById = (id: string) => {
  return prisma.task.findUnique({
    where: { id },
    include: {
      creator: true,
      assignee: true,
      labels: true,
      comments: { include: { author: true } },
      project: true,
      relatedFrom: {
        include: {
          toTask: true,
        },
      },
      relatedTo: {
        include: {
          fromTask: true,
        },
      },
    },
  });
};

export const getAllTasks = async (userId: string) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        parentTaskId: null, // Only parent tasks
        OR: [
          { creatorId: userId },
          { assigneeId: userId },
        ]
      },
      orderBy: { createdAt: 'desc' },
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks.');
  }
};

export async function getSubTasks(taskId: string) {
  return await prisma.task.findMany({
    where: { parentTaskId: taskId },
    orderBy: { createdAt: 'asc' }
  });
}

export const updateTask = (id: string, data: Prisma.TaskUpdateInput) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = (id: string) => {
  return prisma.task.delete({
    where: { id },
  });
};

export async function getTaskParentChain(taskId: string) {
  const result = await prisma.$queryRaw`
  WITH RECURSIVE parent_chain AS (
    SELECT id, title, "parentTaskId"
    FROM "Task"
    WHERE id = ${taskId}

    UNION ALL

    SELECT t.id, t.title, t."parentTaskId"
    FROM "Task" t
    INNER JOIN parent_chain pc ON t.id = pc."parentTaskId"
  )
  SELECT * FROM parent_chain;
`
  return result;
}

export async function getLevelOneSubTasks(parentTaskId: string) {
  return await prisma.task.findMany({
    where: {
      parentTaskId: parentTaskId,
    },
    orderBy: {
      createdAt: 'asc', // optional: sort subtasks
    },
  });
}

export const searchTasksFullText = async (userId: string, keyword: string) => {
  try {
    return await prisma.$queryRaw`
    SELECT *,
      ts_rank(
        to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')),
        plainto_tsquery('english', ${keyword})
      ) AS rank
    FROM "Task"
    WHERE 
     "Task"."parentTaskId" is null and 
      (
        to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')) @@ plainto_tsquery('english', ${keyword})
        OR title ILIKE '%' || ${keyword} || '%'
        OR description ILIKE '%' || ${keyword} || '%'
      )
    ORDER BY rank DESC NULLS LAST;
  `;
    // const tasks = await prisma.task.findMany({
    //   where: {
    //     parentTaskId: null,
    //     AND: [
    //       {
    //         OR: [
    //           { creatorId: userId },
    //           { assigneeId: userId },
    //         ],
    //       },
    //       {
    //         OR: [
    //           { title: { contains: keyword, mode: 'insensitive' } },
    //           { description: { contains: keyword, mode: 'insensitive' } },
    //         ],
    //       }
    //     ],
    //   }
    // });
    // return tasks;
  } catch (error) {
    console.error('Error searching tasks:', error);
    throw new Error('Failed to search tasks.');
  }
};
