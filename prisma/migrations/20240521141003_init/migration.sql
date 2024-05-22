/*
  Warnings:

  - You are about to drop the column `currentCountryID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentCountryName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentDistrictID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentDistrictName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentProvinceID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentProvinceName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentStreetHouseNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentWardID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `currentWardName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeCountryID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeCountryName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeDistrictID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeDistrictName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeProvinceID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeProvinceName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeStreetHouseNumber` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeWardID` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `nativeWardName` on the `Employee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_currentCountryID_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_currentDistrictID_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_currentProvinceID_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_currentWardID_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_nativeCountryID_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_nativeDistrictID_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_nativeProvinceID_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_nativeWardID_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "currentCountryID",
DROP COLUMN "currentCountryName",
DROP COLUMN "currentDistrictID",
DROP COLUMN "currentDistrictName",
DROP COLUMN "currentProvinceID",
DROP COLUMN "currentProvinceName",
DROP COLUMN "currentStreetHouseNumber",
DROP COLUMN "currentWardID",
DROP COLUMN "currentWardName",
DROP COLUMN "nativeCountryID",
DROP COLUMN "nativeCountryName",
DROP COLUMN "nativeDistrictID",
DROP COLUMN "nativeDistrictName",
DROP COLUMN "nativeProvinceID",
DROP COLUMN "nativeProvinceName",
DROP COLUMN "nativeStreetHouseNumber",
DROP COLUMN "nativeWardID",
DROP COLUMN "nativeWardName";
