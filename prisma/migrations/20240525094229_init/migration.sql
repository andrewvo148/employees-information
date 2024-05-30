/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `JobPosition` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JobPosition_name_key" ON "JobPosition"("name");
