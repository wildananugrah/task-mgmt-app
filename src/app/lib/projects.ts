import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const createProject = (body: any, userId: string) => {
  let data: Prisma.ProjectCreateInput = {
    description: body.description,
    name: body.title,
    owner: {
      connect: { id: userId },
    },
  }
  return prisma.project.create({ data });
};

export const getProjectById = (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: { tasks: true, owner: true },
  });
};

export const getAllProjects = (userId: string) => {
  return prisma.project.findMany({
    where: {
      OR: [
        { ownerId: userId },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: { tasks: true }
  });
};

export const searchProjectsFullText = async (userId: string, keyword: string) => {
  try {
    return await prisma.$queryRaw`
    SELECT *,
      ts_rank(
        to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '')),
        plainto_tsquery('english', ${keyword})
      ) AS rank
    FROM "Project"
    WHERE 
      to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '')) @@ plainto_tsquery('english', ${keyword})
      OR name ILIKE '%' || ${keyword} || '%'
      OR description ILIKE '%' || ${keyword} || '%'
    ORDER BY rank DESC NULLS LAST;
  `;
    // return prisma.project.findMany({
    //   where: {
    //     ownerId: userId,
    //     OR: [
    //       { name: { contains: keyword, mode: 'insensitive' } },
    //       { description: { contains: keyword, mode: 'insensitive' } },
    //     ],
    //   },
    //   orderBy: { createdAt: 'desc' },
    //   include: { tasks: true }
    // });
  } catch (error) {
    console.error('Error searching tasks:', error);
    throw new Error('Failed to search tasks.');
  }
};

export const updateProject = (id: string, data: Prisma.ProjectUpdateInput) => {
  return prisma.project.update({ where: { id }, data });
};

export const deleteProject = (id: string) => {
  return prisma.project.delete({ where: { id } });
};
