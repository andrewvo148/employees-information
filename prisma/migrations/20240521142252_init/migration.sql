/*
  Warnings:

  - You are about to drop the column `contractTypeId` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_contractTypeId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "contractTypeId";
