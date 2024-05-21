-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "currentAddress" TEXT,
ADD COLUMN     "currentDistrictID" TEXT,
ADD COLUMN     "currentDistrictName" TEXT,
ADD COLUMN     "currentProvinceID" TEXT,
ADD COLUMN     "currentProvinceName" TEXT,
ADD COLUMN     "currentStreetHouseNumber" TEXT,
ADD COLUMN     "currentWardID" TEXT,
ADD COLUMN     "currentWardName" TEXT,
ADD COLUMN     "nativeAddress" TEXT,
ADD COLUMN     "nativeDistrictID" TEXT,
ADD COLUMN     "nativeDistrictName" TEXT,
ADD COLUMN     "nativeProvinceID" TEXT,
ADD COLUMN     "nativeProvinceName" TEXT,
ADD COLUMN     "nativeStreetHouseNumber" TEXT,
ADD COLUMN     "nativeWardID" TEXT,
ADD COLUMN     "nativeWardName" TEXT;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentProvinceID_fkey" FOREIGN KEY ("currentProvinceID") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentDistrictID_fkey" FOREIGN KEY ("currentDistrictID") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentWardID_fkey" FOREIGN KEY ("currentWardID") REFERENCES "Ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_nativeProvinceID_fkey" FOREIGN KEY ("nativeProvinceID") REFERENCES "Province"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_nativeDistrictID_fkey" FOREIGN KEY ("nativeDistrictID") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_nativeWardID_fkey" FOREIGN KEY ("nativeWardID") REFERENCES "Ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;
