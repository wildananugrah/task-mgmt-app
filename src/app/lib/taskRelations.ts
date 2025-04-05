import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const createTaskRelation = (data: Prisma.TaskRelationCreateInput) => {
  return prisma.taskRelation.create({ data });
};

export const getTaskRelations = (taskId: string) => {
  return prisma.taskRelation.findMany({
    where: {
      OR: [{ fromTaskId: taskId }, { toTaskId: taskId }],
    },
    include: {
      fromTask: true,
      toTask: true,
    },
  });
};

export const deleteTaskRelation = (id: string) => {
  return prisma.taskRelation.delete({ where: { id } });
};
