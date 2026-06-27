-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "mainUrl" TEXT NOT NULL,
    "finalCode" TEXT NOT NULL,
    "createAt" INTEGER NOT NULL,
    "expiresAt" INTEGER,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
