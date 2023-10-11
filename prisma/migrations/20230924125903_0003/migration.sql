/*
  Warnings:

  - You are about to drop the `articles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dropdownitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dropdowns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `footergroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `globals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `navitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `servicecategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sociallinks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArticleTranslation" DROP CONSTRAINT "ArticleTranslation_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleTranslation" DROP CONSTRAINT "ArticleTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "CategoryServiceTranslation" DROP CONSTRAINT "CategoryServiceTranslation_categoryServiceId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryServiceTranslation" DROP CONSTRAINT "CategoryServiceTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "CommentTranslation" DROP CONSTRAINT "CommentTranslation_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentTranslation" DROP CONSTRAINT "CommentTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "DropDownGroupTranslation" DROP CONSTRAINT "DropDownGroupTranslation_dropdownGroupId_fkey";

-- DropForeignKey
ALTER TABLE "DropDownGroupTranslation" DROP CONSTRAINT "DropDownGroupTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "DropdownItemTranslation" DROP CONSTRAINT "DropdownItemTranslation_dropdownItemId_fkey";

-- DropForeignKey
ALTER TABLE "DropdownItemTranslation" DROP CONSTRAINT "DropdownItemTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "FooterTranslation" DROP CONSTRAINT "FooterTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "GlobalTranslation" DROP CONSTRAINT "GlobalTranslation_globalId_fkey";

-- DropForeignKey
ALTER TABLE "GlobalTranslation" DROP CONSTRAINT "GlobalTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "GroupFooterTranslation" DROP CONSTRAINT "GroupFooterTranslation_groupfooterId_fkey";

-- DropForeignKey
ALTER TABLE "GroupFooterTranslation" DROP CONSTRAINT "GroupFooterTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "NavbarItemTranslation" DROP CONSTRAINT "NavbarItemTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "NavbarItemTranslation" DROP CONSTRAINT "NavbarItemTranslation_navbarItemId_fkey";

-- DropForeignKey
ALTER TABLE "PageTranslation" DROP CONSTRAINT "PageTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "PageTranslation" DROP CONSTRAINT "PageTranslation_pageId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceTranslation" DROP CONSTRAINT "ServiceTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "ServiceTranslation" DROP CONSTRAINT "ServiceTranslation_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "TagTranslation" DROP CONSTRAINT "TagTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "TagTranslation" DROP CONSTRAINT "TagTranslation_tagId_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_footerId_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_groupfooterId_fkey";

-- DropForeignKey
ALTER TABLE "articles" DROP CONSTRAINT "articles_userId_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_articleId_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_categoryServiceId_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_pageId_fkey";

-- DropForeignKey
ALTER TABLE "blocks" DROP CONSTRAINT "blocks_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_articleId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "dropdownitems" DROP CONSTRAINT "dropdownitems_articleId_fkey";

-- DropForeignKey
ALTER TABLE "dropdownitems" DROP CONSTRAINT "dropdownitems_groupId_fkey";

-- DropForeignKey
ALTER TABLE "dropdownitems" DROP CONSTRAINT "dropdownitems_navItemId_fkey";

-- DropForeignKey
ALTER TABLE "dropdownitems" DROP CONSTRAINT "dropdownitems_pageId_fkey";

-- DropForeignKey
ALTER TABLE "dropdowns" DROP CONSTRAINT "dropdowns_navItemId_fkey";

-- DropForeignKey
ALTER TABLE "footergroups" DROP CONSTRAINT "footergroups_footerId_fkey";

-- DropForeignKey
ALTER TABLE "navitems" DROP CONSTRAINT "navitems_articleId_fkey";

-- DropForeignKey
ALTER TABLE "navitems" DROP CONSTRAINT "navitems_pageId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_studentId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_groupFooterId_fkey";

-- DropForeignKey
ALTER TABLE "pages" DROP CONSTRAINT "pages_userId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "sociallinks" DROP CONSTRAINT "sociallinks_globalId_fkey";

-- DropTable
DROP TABLE "articles";

-- DropTable
DROP TABLE "blocks";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "dropdownitems";

-- DropTable
DROP TABLE "dropdowns";

-- DropTable
DROP TABLE "footergroups";

-- DropTable
DROP TABLE "globals";

-- DropTable
DROP TABLE "languages";

-- DropTable
DROP TABLE "navitems";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "pages";

-- DropTable
DROP TABLE "servicecategories";

-- DropTable
DROP TABLE "services";

-- DropTable
DROP TABLE "sociallinks";

-- DropTable
DROP TABLE "tags";

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "common" JSONB NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Global" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Global_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "social" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "globalId" TEXT,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavbarItem" (
    "id" TEXT NOT NULL,
    "isDropdown" BOOLEAN NOT NULL DEFAULT false,
    "forPage" BOOLEAN NOT NULL DEFAULT false,
    "pageId" TEXT,
    "forArticle" BOOLEAN NOT NULL DEFAULT false,
    "articleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NavbarItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DropDownGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "navItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DropDownGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DropdownItem" (
    "id" TEXT NOT NULL,
    "forGroup" BOOLEAN NOT NULL DEFAULT false,
    "groupId" TEXT,
    "forPage" BOOLEAN NOT NULL DEFAULT false,
    "pageId" TEXT NOT NULL,
    "forArticle" BOOLEAN NOT NULL DEFAULT false,
    "articleId" TEXT NOT NULL,
    "navItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DropdownItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupFooter" (
    "id" TEXT NOT NULL,
    "footerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupFooter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupFooterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "footerId" TEXT,
    "groupfooterId" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Block" (
    "id" TEXT NOT NULL,
    "type" TEXT,
    "content" JSONB,
    "pageId" TEXT,
    "articleId" TEXT,
    "categoryServiceId" TEXT,
    "serviceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryService" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "studentId" TEXT,
    "serviceId" TEXT,
    "DescriptionOtherService" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_language_key" ON "Language"("language");

-- CreateIndex
CREATE INDEX "SocialLink_globalId_idx" ON "SocialLink"("globalId");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_id_key" ON "NavbarItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_pageId_key" ON "NavbarItem"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_articleId_key" ON "NavbarItem"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_pageId_articleId_key" ON "NavbarItem"("pageId", "articleId");

-- CreateIndex
CREATE INDEX "DropDownGroup_navItemId_idx" ON "DropDownGroup"("navItemId");

-- CreateIndex
CREATE UNIQUE INDEX "DropdownItem_id_key" ON "DropdownItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DropdownItem_pageId_key" ON "DropdownItem"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "DropdownItem_articleId_key" ON "DropdownItem"("articleId");

-- CreateIndex
CREATE INDEX "DropdownItem_groupId_idx" ON "DropdownItem"("groupId");

-- CreateIndex
CREATE INDEX "DropdownItem_navItemId_idx" ON "DropdownItem"("navItemId");

-- CreateIndex
CREATE INDEX "DropdownItem_pageId_idx" ON "DropdownItem"("pageId");

-- CreateIndex
CREATE INDEX "DropdownItem_articleId_idx" ON "DropdownItem"("articleId");

-- CreateIndex
CREATE INDEX "GroupFooter_footerId_idx" ON "GroupFooter"("footerId");

-- CreateIndex
CREATE UNIQUE INDEX "Page_id_key" ON "Page"("id");

-- CreateIndex
CREATE INDEX "Page_groupFooterId_idx" ON "Page"("groupFooterId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- AddForeignKey
ALTER TABLE "GlobalTranslation" ADD CONSTRAINT "GlobalTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalTranslation" ADD CONSTRAINT "GlobalTranslation_globalId_fkey" FOREIGN KEY ("globalId") REFERENCES "Global"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_globalId_fkey" FOREIGN KEY ("globalId") REFERENCES "Global"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItem" ADD CONSTRAINT "NavbarItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItem" ADD CONSTRAINT "NavbarItem_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItemTranslation" ADD CONSTRAINT "NavbarItemTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItemTranslation" ADD CONSTRAINT "NavbarItemTranslation_navbarItemId_fkey" FOREIGN KEY ("navbarItemId") REFERENCES "NavbarItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropDownGroup" ADD CONSTRAINT "DropDownGroup_navItemId_fkey" FOREIGN KEY ("navItemId") REFERENCES "NavbarItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropDownGroupTranslation" ADD CONSTRAINT "DropDownGroupTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropDownGroupTranslation" ADD CONSTRAINT "DropDownGroupTranslation_dropdownGroupId_fkey" FOREIGN KEY ("dropdownGroupId") REFERENCES "DropDownGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "DropDownGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItem" ADD CONSTRAINT "DropdownItem_navItemId_fkey" FOREIGN KEY ("navItemId") REFERENCES "NavbarItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItemTranslation" ADD CONSTRAINT "DropdownItemTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItemTranslation" ADD CONSTRAINT "DropdownItemTranslation_dropdownItemId_fkey" FOREIGN KEY ("dropdownItemId") REFERENCES "DropdownItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FooterTranslation" ADD CONSTRAINT "FooterTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupFooter" ADD CONSTRAINT "GroupFooter_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupFooterTranslation" ADD CONSTRAINT "GroupFooterTranslation_groupfooterId_fkey" FOREIGN KEY ("groupfooterId") REFERENCES "GroupFooter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupFooterTranslation" ADD CONSTRAINT "GroupFooterTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_groupFooterId_fkey" FOREIGN KEY ("groupFooterId") REFERENCES "GroupFooter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTranslation" ADD CONSTRAINT "PageTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTranslation" ADD CONSTRAINT "PageTranslation_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_groupfooterId_fkey" FOREIGN KEY ("groupfooterId") REFERENCES "GroupFooter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTranslation" ADD CONSTRAINT "TagTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTranslation" ADD CONSTRAINT "TagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentTranslation" ADD CONSTRAINT "CommentTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentTranslation" ADD CONSTRAINT "CommentTranslation_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "PageTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "ArticleTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_categoryServiceId_fkey" FOREIGN KEY ("categoryServiceId") REFERENCES "CategoryServiceTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ServiceTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryServiceTranslation" ADD CONSTRAINT "CategoryServiceTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryServiceTranslation" ADD CONSTRAINT "CategoryServiceTranslation_categoryServiceId_fkey" FOREIGN KEY ("categoryServiceId") REFERENCES "CategoryService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTranslation" ADD CONSTRAINT "ServiceTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "Language"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTranslation" ADD CONSTRAINT "ServiceTranslation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
