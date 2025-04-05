import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const createLabel = (data: Prisma.LabelCreateInput) => {
  return prisma.label.create({ data });
};

export const getAllLabels = () => {
  return prisma.label.findMany({ include: { tasks: true } });
};
