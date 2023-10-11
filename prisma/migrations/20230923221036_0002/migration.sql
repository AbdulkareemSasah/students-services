/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,categoryServiceId]` on the table `CategoryServiceTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,commentId]` on the table `CommentTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,dropdownGroupId]` on the table `DropDownGroupTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `DropdownItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageId]` on the table `DropdownItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[articleId]` on the table `DropdownItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,dropdownItemId]` on the table `DropdownItemTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,footerId]` on the table `FooterTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,groupfooterId]` on the table `GroupFooterTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `NavbarItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageId]` on the table `NavbarItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[articleId]` on the table `NavbarItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pageId,articleId]` on the table `NavbarItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,navbarItemId]` on the table `NavbarItemTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lang,serviceId]` on the table `ServiceTranslation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `CategoryTranslation` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `articleId` to the `DropdownItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `DropdownItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `PageTranslation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `TagTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CategoryTranslation" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "DropdownItem" ADD COLUMN     "articleId" TEXT NOT NULL,
ADD COLUMN     "forArticle" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "forPage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "NavbarItem" ADD COLUMN     "articleId" TEXT,
ADD COLUMN     "forArticle" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "forPage" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pageId" TEXT;

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "groupFooterId" TEXT;

-- AlterTable
ALTER TABLE "PageTranslation" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "TagTranslation" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryServiceTranslation_lang_categoryServiceId_key" ON "CategoryServiceTranslation"("lang", "categoryServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentTranslation_lang_commentId_key" ON "CommentTranslation"("lang", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "DropDownGroupTranslation_lang_dropdownGroupId_key" ON "DropDownGroupTranslation"("lang", "dropdownGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "DropdownItem_id_key" ON "DropdownItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DropdownItem_pageId_key" ON "DropdownItem"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "DropdownItem_articleId_key" ON "DropdownItem"("articleId");

-- CreateIndex
CREATE INDEX "DropdownItem_pageId_idx" ON "DropdownItem"("pageId");

-- CreateIndex
CREATE INDEX "DropdownItem_articleId_idx" ON "DropdownItem"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "DropdownItemTranslation_lang_dropdownItemId_key" ON "DropdownItemTranslation"("lang", "dropdownItemId");

-- CreateIndex
CREATE UNIQUE INDEX "FooterTranslation_lang_footerId_key" ON "FooterTranslation"("lang", "footerId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupFooterTranslation_lang_groupfooterId_key" ON "GroupFooterTranslation"("lang", "groupfooterId");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_id_key" ON "NavbarItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_pageId_key" ON "NavbarItem"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_articleId_key" ON "NavbarItem"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_pageId_articleId_key" ON "NavbarItem"("pageId", "articleId");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItemTranslation_lang_navbarItemId_key" ON "NavbarItemTranslation"("lang", "navbarItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_id_key" ON "Page"("id");

-- CreateIndex
CREATE INDEX "Page_groupFooterId_idx" ON "Page"("groupFooterId");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTranslation_lang_serviceId_key" ON "ServiceTranslation"("lang", "serviceId");

-- AddForeignKey
ALTER TABLE "NavbarItem" ADD CONSTRAINT "NavbarItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItem" ADD CONSTRAINT "NavbarItem_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_groupFooterId_fkey" FOREIGN KEY ("groupFooterId") REFERENCES "GroupFooter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
