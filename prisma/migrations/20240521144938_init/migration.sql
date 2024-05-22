/*
  Warnings:

  - You are about to drop the column `salaryBasic` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "salaryBasic",
ADD COLUMN     "healthInsuranceOfficialDate" TIMESTAMP(3),
ADD COLUMN     "internalOfficialDate" TIMESTAMP(3),
ADD COLUMN     "probationDate" TIMESTAMP(3),
ADD COLUMN     "salaryProductivity" INTEGER,
ADD COLUMN     "salaryTotal" INTEGER,
ADD COLUMN     "socialInsuranceOfficialDate" TIMESTAMP(3);
