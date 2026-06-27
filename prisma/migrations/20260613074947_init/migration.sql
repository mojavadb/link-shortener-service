/*
  Warnings:

  - You are about to drop the `LinkItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LinkItem";

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "finalCode" TEXT NOT NULL,
    "mainUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_finalCode_key" ON "Link"("finalCode");
