/*
  Warnings:

  - You are about to drop the column `mobile` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "mobile",
ADD COLUMN     "homePhone" TEXT,
ADD COLUMN     "identifyNumber" TEXT,
ADD COLUMN     "identifyNumberExpiredDate" TIMESTAMP(3),
ADD COLUMN     "identifyNumberIssuedDate" TIMESTAMP(3),
ADD COLUMN     "identifyNumberIssuedPlace" TEXT,
ADD COLUMN     "mobilePhone" TEXT,
ADD COLUMN     "officePhone" TEXT,
ADD COLUMN     "otherEmail" TEXT,
ADD COLUMN     "salaryProbationary" INTEGER;
