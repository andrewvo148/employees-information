/*
  Warnings:

  - You are about to drop the column `contractType` on the `Employee` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('NON', 'ISLAMIC', 'BUDDHISM', 'HOAHAO_BUDDHISM', 'CHRISTIAN', 'PROTESTANTISM');

-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('CCCD', 'CMND');

-- CreateEnum
CREATE TYPE "EmployeeStatusName" AS ENUM ('WORKING', 'RESIGNED');

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "contractType",
ADD COLUMN     "contractTypeId" INTEGER,
ADD COLUMN     "contractTypeName" TEXT,
ADD COLUMN     "employeeStatusName" "EmployeeStatusName",
ADD COLUMN     "identificationType" "IdentificationType",
ADD COLUMN     "religion" "Religion";

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_contractTypeId_fkey" FOREIGN KEY ("contractTypeId") REFERENCES "ContractType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
