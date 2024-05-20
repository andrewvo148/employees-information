-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ward" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("id")
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
    "contractType" TEXT,
    "employeeStatus" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "gender" TEXT,
    "hireDate" TEXT,
    "identifyNumber" TEXT,
    "identifyNumberIssuedDate" TIMESTAMP(3),
    "identifyNumberExpiredDate" TIMESTAMP(3),
    "identifyNumberIssuedPlace" TEXT,
    "salaryProbationary" INTEGER,
    "salaryBasic" INTEGER,
    "salarySocialInsurance" INTEGER,
    "receiveDate" TIMESTAMP(3),
    "mobilePhone" TEXT,
    "officePhone" TEXT,
    "homePhone" TEXT,
    "officeEmail" TEXT,
    "otherEmail" TEXT,
    "birthDay" TIMESTAMP(3),
    "birthPlace" TEXT,
    "bankAccountNo" TEXT,
    "bankName" TEXT,
    "departmentId" INTEGER,
    "departmentName" TEXT,
    "jobPositionId" INTEGER,
    "jobPositionName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laborNature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "laborNature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobPosition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "jobPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "contractType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_jobPositionId_fkey" FOREIGN KEY ("jobPositionId") REFERENCES "jobPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
