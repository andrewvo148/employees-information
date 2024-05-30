-- CreateEnum
CREATE TYPE "SignStatus" AS ENUM ('NON', 'SIGNED');

-- AlterTable
ALTER TABLE "Contract" ADD COLUMN     "signStatus" "SignStatus";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "contractTypeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_contractTypeId_fkey" FOREIGN KEY ("contractTypeId") REFERENCES "ContractType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
