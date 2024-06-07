-- CreateEnum
CREATE TYPE "IdentificationType" AS ENUM ('CCCD', 'CMND');

-- CreateEnum
CREATE TYPE "EmployeeStatusName" AS ENUM ('WORKING', 'RESIGNED');

-- CreateEnum
CREATE TYPE "SignStatus" AS ENUM ('NON', 'SIGNED');

-- CreateEnum
CREATE TYPE "ContractPeriod" AS ENUM ('ONE_MONTH', 'TWO_MONTH', 'THREE_MONTH', 'SIX_MONTH', 'ONE_YEAR', 'THREE_YEAR');

-- CreateTable
CREATE TABLE "Province" (
    "locationID" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("locationID")
);

-- CreateTable
CREATE TABLE "District" (
    "locationID" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("locationID")
);

-- CreateTable
CREATE TABLE "Ward" (
    "locationID" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("locationID")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "employeeCode" TEXT,
    "employeeStatus" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "hireDate" TEXT,
    "identifyNumber" TEXT,
    "identifyNumberIssuedDate" TIMESTAMP(3),
    "identifyNumberExpiredDate" TIMESTAMP(3),
    "identifyNumberIssuedPlace" TEXT,
    "salaryProbationary" INTEGER,
    "salaryProductivity" INTEGER,
    "salarySocialInsurance" INTEGER,
    "salaryTotal" INTEGER,
    "receiveDate" TIMESTAMP(3),
    "mobilePhone" TEXT,
    "officePhone" TEXT,
    "homePhone" TEXT,
    "officeEmail" TEXT,
    "otherEmail" TEXT,
    "birthDay" TIMESTAMP(3),
    "pitCode" TEXT,
    "ethnic" TEXT,
    "nationality" TEXT,
    "probationDate" TIMESTAMP(3),
    "internalOfficialDate" TIMESTAMP(3),
    "socialInsuranceOfficialDate" TIMESTAMP(3),
    "healthInsuranceOfficialDate" TIMESTAMP(3),
    "bankAccountNo" TEXT,
    "bankName" TEXT,
    "departmentId" INTEGER,
    "departmentName" TEXT,
    "jobPositionId" INTEGER,
    "jobPositionName" TEXT,
    "genderId" INTEGER,
    "genderName" TEXT,
    "laborNatureId" INTEGER,
    "laborNatureName" TEXT,
    "contractTypeName" TEXT,
    "currentAddress" TEXT,
    "nativeAddress" TEXT,
    "maritalStatusId" INTEGER,
    "identificationType" "IdentificationType",
    "religionId" INTEGER,
    "employeeStatusName" "EmployeeStatusName",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "contractTypeId" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "contractCode" TEXT,
    "contractName" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "jobPositionName" TEXT,
    "jobPositionID" INTEGER,
    "employeeName" TEXT,
    "signedDate" TIMESTAMP(3),
    "salaryBasic" INTEGER,
    "salaryForInsurance" INTEGER,
    "contractPeriod" "ContractPeriod",
    "contractPeriodName" TEXT,
    "contractTypeId" INTEGER,
    "contractTypeName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaborNature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LaborNature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "ContractType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ethnicity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,

    CONSTRAINT "Ethnicity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaritalStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MaritalStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Religion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Religion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "JobPosition_name_key" ON "JobPosition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gender_name_key" ON "Gender"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MaritalStatus_name_key" ON "MaritalStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Religion_name_key" ON "Religion"("name");

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("locationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("locationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "JobPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_laborNatureId_fkey" FOREIGN KEY ("laborNatureId") REFERENCES "LaborNature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_maritalStatusId_fkey" FOREIGN KEY ("maritalStatusId") REFERENCES "MaritalStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_religionId_fkey" FOREIGN KEY ("religionId") REFERENCES "Religion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_contractTypeId_fkey" FOREIGN KEY ("contractTypeId") REFERENCES "ContractType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_contractTypeId_fkey" FOREIGN KEY ("contractTypeId") REFERENCES "ContractType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
