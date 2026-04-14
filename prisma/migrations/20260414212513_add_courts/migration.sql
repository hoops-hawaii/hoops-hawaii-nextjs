/*
  Warnings:

  - The values [excellent,fair,poor] on the enum `Condition` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Stuff` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pfp` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('goated', 'pro', 'mid', 'beginner', 'trash', 'fat_chud');

-- AlterEnum
BEGIN;
CREATE TYPE "Condition_new" AS ENUM ('very_good', 'good', 'mid', 'bad', 'trash');
ALTER TABLE "public"."Stuff" ALTER COLUMN "condition" DROP DEFAULT;
ALTER TABLE "Court" ALTER COLUMN "condition" TYPE "Condition_new" USING ("condition"::text::"Condition_new");
ALTER TYPE "Condition" RENAME TO "Condition_old";
ALTER TYPE "Condition_new" RENAME TO "Condition";
DROP TYPE "public"."Condition_old";
COMMIT;

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "homeCourtId" INTEGER,
ADD COLUMN     "pfp" TEXT NOT NULL,
ADD COLUMN     "skill" "Skill" NOT NULL DEFAULT 'mid',
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "Stuff";

-- CreateTable
CREATE TABLE "Court" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "present" INTEGER NOT NULL,
    "condition" "Condition" NOT NULL DEFAULT 'mid',

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "courtId" INTEGER NOT NULL,
    "news" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_homeCourtId_fkey" FOREIGN KEY ("homeCourtId") REFERENCES "Court"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "News" ADD CONSTRAINT "News_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
