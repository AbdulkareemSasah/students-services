/*
  Warnings:

  - You are about to drop the column `userId` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Page` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ArticleTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CategoryTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PageTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_userId_fkey";

-- AlterTable
ALTER TABLE "Article" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "ArticleTranslation" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CategoryTranslation" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "CommentTranslation" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "PageTranslation" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PageTranslation" ADD CONSTRAINT "PageTranslation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentTranslation" ADD CONSTRAINT "CommentTranslation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
