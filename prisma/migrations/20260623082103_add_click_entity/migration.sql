/*
  Warnings:

  - You are about to drop the column `clicks` on the `LinkItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LinkItem" DROP COLUMN "clicks";

-- CreateTable
CREATE TABLE "Click" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "LinkItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
