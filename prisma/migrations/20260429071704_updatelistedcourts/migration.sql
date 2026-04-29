-- AlterTable
ALTER TABLE "User" ADD COLUMN     "homeCourtId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homeCourtId_fkey" FOREIGN KEY ("homeCourtId") REFERENCES "Court"("id") ON DELETE SET NULL ON UPDATE CASCADE;
