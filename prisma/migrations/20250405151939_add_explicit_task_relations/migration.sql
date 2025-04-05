/*
  Warnings:

  - You are about to drop the `_RelatedTasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TaskRelationType" AS ENUM ('DEPENDS_ON', 'DUPLICATE_OF', 'RELATED', 'BLOCKED_BY');

-- DropForeignKey
ALTER TABLE "_RelatedTasks" DROP CONSTRAINT "_RelatedTasks_A_fkey";

-- DropForeignKey
ALTER TABLE "_RelatedTasks" DROP CONSTRAINT "_RelatedTasks_B_fkey";

-- DropTable
DROP TABLE "_RelatedTasks";

-- CreateTable
CREATE TABLE "TaskRelation" (
    "id" TEXT NOT NULL,
    "fromTaskId" TEXT NOT NULL,
    "toTaskId" TEXT NOT NULL,
    "type" "TaskRelationType" NOT NULL DEFAULT 'RELATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskRelation_fromTaskId_toTaskId_key" ON "TaskRelation"("fromTaskId", "toTaskId");

-- AddForeignKey
ALTER TABLE "TaskRelation" ADD CONSTRAINT "TaskRelation_fromTaskId_fkey" FOREIGN KEY ("fromTaskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskRelation" ADD CONSTRAINT "TaskRelation_toTaskId_fkey" FOREIGN KEY ("toTaskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
