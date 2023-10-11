/*
  Warnings:

  - You are about to drop the column `name` on the `DropDownGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DropdownItem" DROP CONSTRAINT "DropdownItem_articleId_fkey";

-- DropForeignKey
ALTER TABLE "DropdownItem" DROP CONSTRAINT "DropdownItem_pageId_fkey";

-- AlterTable
ALTER TABLE "DropDownGroup" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "DropdownItem" ALTER COLUMN "pageId" DROP NOT NULL,
ALTER COLUMN "articleId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
