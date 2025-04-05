import { Prisma } from '@prisma/client';
import { prisma } from './prisma';

export const addComment = (data: Prisma.CommentCreateInput) => {
  return prisma.comment.create({ data });
};

export const getCommentsByTaskId = (taskId: string) => {
  return prisma.comment.findMany({
    where: { taskId },
    include: { author: true },
    orderBy: { createdAt: 'asc' },
  });
};
