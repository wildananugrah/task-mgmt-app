import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const createTask = (data: Prisma.TaskCreateInput) => {
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
        OR: [
          { creatorId: userId },
          { assigneeId: userId },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks.');
  }
};


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
