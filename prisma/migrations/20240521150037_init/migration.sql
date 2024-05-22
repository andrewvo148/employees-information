-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "ethnic" TEXT,
ADD COLUMN     "nationality" TEXT,
ADD COLUMN     "pitCode" TEXT;

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);
