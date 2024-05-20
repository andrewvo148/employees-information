-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "contractNo" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "jobPositionName" TEXT,
    "jobPositionID" INTEGER,
    "employeeName" TEXT,
    "signedDate" TIMESTAMP(3),
    "salaryBasic" INTEGER,
    "salaryForInsurance" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);
