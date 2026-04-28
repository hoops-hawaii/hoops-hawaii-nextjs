-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "imageURL" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "presentAtId" INTEGER;

-- CreateTable
CREATE TABLE "_SavedCourts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SavedCourts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SavedCourts_B_index" ON "_SavedCourts"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_presentAtId_fkey" FOREIGN KEY ("presentAtId") REFERENCES "Court"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedCourts" ADD CONSTRAINT "_SavedCourts_A_fkey" FOREIGN KEY ("A") REFERENCES "Court"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedCourts" ADD CONSTRAINT "_SavedCourts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
