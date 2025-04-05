import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const createProject = (data: Prisma.ProjectCreateInput) => {
  return prisma.project.create({ data });
};

export const getProjectById = (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: { tasks: true, owner: true },
  });
};

export const getAllProjects = () => {
  return prisma.project.findMany({ include: { tasks: true } });
};

export const updateProject = (id: string, data: Prisma.ProjectUpdateInput) => {
  return prisma.project.update({ where: { id }, data });
};

export const deleteProject = (id: string) => {
  return prisma.project.delete({ where: { id } });
};
