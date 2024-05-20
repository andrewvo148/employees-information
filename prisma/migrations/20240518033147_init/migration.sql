/*
  Warnings:

  - You are about to drop the `contractType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `laborNature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "contractType";

-- DropTable
DROP TABLE "laborNature";

-- CreateTable
CREATE TABLE "LaborNature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LaborNature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ContractType_pkey" PRIMARY KEY ("id")
);
