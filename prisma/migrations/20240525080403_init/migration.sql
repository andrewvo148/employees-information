/*
  Warnings:

  - You are about to drop the column `contractNo` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `signStatus` on the `Contract` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContractPeriod" AS ENUM ('ONE_MONTH', 'TWO_MONTH', 'THREE_MONTH', 'SIX_MONTH', 'ONE_YEAR', 'THREE_YEAR');

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "contractNo",
DROP COLUMN "signStatus",
ADD COLUMN     "contractCode" TEXT,
ADD COLUMN     "contractName" TEXT,
ADD COLUMN     "contractPeriod" "ContractPeriod",
ADD COLUMN     "contractPeriodName" TEXT,
ADD COLUMN     "contractTypeId" INTEGER,
ADD COLUMN     "contractTypeName" TEXT;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_contractTypeId_fkey" FOREIGN KEY ("contractTypeId") REFERENCES "ContractType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
