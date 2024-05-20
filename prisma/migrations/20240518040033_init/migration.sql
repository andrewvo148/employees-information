-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "laborNatureId" INTEGER,
ADD COLUMN     "laborNatureName" TEXT,
ADD COLUMN     "maritalStatus" "MaritalStatus";

-- CreateTable
CREATE TABLE "Ethnicity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ethnicity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_laborNatureId_fkey" FOREIGN KEY ("laborNatureId") REFERENCES "LaborNature"("id") ON DELETE SET NULL ON UPDATE CASCADE;
