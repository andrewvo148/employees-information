/*
  Warnings:

  - You are about to drop the column `BankAccountNo` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `BankName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `BirthDay` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `BirthPlace` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `EmployeeCode` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `EmployeeStatusID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `FullName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Gender` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `HireDate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Mobile` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `OfficeEmail` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `ReceiveDate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `SalaryBasic` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `SalarySocialInsurance` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeCode]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Employee_EmployeeCode_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "BankAccountNo",
DROP COLUMN "BankName",
DROP COLUMN "BirthDay",
DROP COLUMN "BirthPlace",
DROP COLUMN "EmployeeCode",
DROP COLUMN "EmployeeStatusID",
DROP COLUMN "FirstName",
DROP COLUMN "FullName",
DROP COLUMN "Gender",
DROP COLUMN "HireDate",
DROP COLUMN "LastName",
DROP COLUMN "Mobile",
DROP COLUMN "OfficeEmail",
DROP COLUMN "ReceiveDate",
DROP COLUMN "SalaryBasic",
DROP COLUMN "SalarySocialInsurance",
ADD COLUMN     "bankAccountNo" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "birthDay" TIMESTAMP(3),
ADD COLUMN     "birthPlace" TEXT,
ADD COLUMN     "employeeCode" TEXT,
ADD COLUMN     "employeeStatus" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "hireDate" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "officeEmail" TEXT,
ADD COLUMN     "receiveDate" TIMESTAMP(3),
ADD COLUMN     "salaryBasic" INTEGER,
ADD COLUMN     "salarySocialInsurance" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeCode_key" ON "Employee"("employeeCode");
