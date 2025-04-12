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

export const updateProject = (id: string, data: Prisma.ProjectUpdateInput) => {
  return prisma.project.update({ where: { id }, data });
};

export const deleteProject = (id: string) => {
  return prisma.project.delete({ where: { id } });
};
