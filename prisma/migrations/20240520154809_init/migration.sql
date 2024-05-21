-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "currentCountryID" INTEGER,
ADD COLUMN     "currentCountryName" TEXT,
ADD COLUMN     "nativeCountryID" INTEGER,
ADD COLUMN     "nativeCountryName" TEXT;

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_currentCountryID_fkey" FOREIGN KEY ("currentCountryID") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_nativeCountryID_fkey" FOREIGN KEY ("nativeCountryID") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
