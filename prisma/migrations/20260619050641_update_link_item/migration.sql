-- DropForeignKey
ALTER TABLE "LinkItem" DROP CONSTRAINT "LinkItem_creatorId_fkey";

-- AlterTable
ALTER TABLE "Session" ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken");

-- AddForeignKey
ALTER TABLE "LinkItem" ADD CONSTRAINT "LinkItem_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
