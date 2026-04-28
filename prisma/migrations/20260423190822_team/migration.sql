-- AlterTable
ALTER TABLE "User" ADD COLUMN     "teamId" INTEGER;

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_ownerId_key" ON "Team"("ownerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
