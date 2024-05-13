-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "EmployeeCode" TEXT NOT NULL,
    "contractType" TEXT,
    "EmployeeStatusID" TEXT,
    "FirstName" TEXT,
    "LastName" TEXT,
    "FullName" TEXT,
    "Gender" TEXT,
    "HireDate" TEXT,
    "SalaryBasic" INTEGER,
    "SalarySocialInsurance" INTEGER,
    "ReceiveDate" TIMESTAMP(3),
    "Mobile" TEXT,
    "OfficeEmail" TEXT,
    "BirthDay" TIMESTAMP(3),
    "departmentId" INTEGER NOT NULL,
    "departmentName" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_EmployeeCode_key" ON "Employee"("EmployeeCode");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
