-- DropForeignKey
ALTER TABLE "Month" DROP CONSTRAINT "Month_userId_fkey";

-- AddForeignKey
ALTER TABLE "Month" ADD CONSTRAINT "Month_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
