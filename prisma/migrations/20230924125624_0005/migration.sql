/*
  Warnings:

  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DropDownGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DropdownItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Global` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupFooter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NavbarItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_footerId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_groupfooterId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleTranslation" DROP CONSTRAINT "ArticleTranslation_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleTranslation" DROP CONSTRAINT "ArticleTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_categoryServiceId_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryServiceTranslation" DROP CONSTRAINT "CategoryServiceTranslation_categoryServiceId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryServiceTranslation" DROP CONSTRAINT "CategoryServiceTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommentTranslation" DROP CONSTRAINT "CommentTranslation_commentId_fkey";

-- DropForeignKey
ALTER TABLE "CommentTranslation" DROP CONSTRAINT "CommentTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "DropDownGroup" DROP CONSTRAINT "DropDownGroup_navItemId_fkey";

-- DropForeignKey
ALTER TABLE "DropDownGroupTranslation" DROP CONSTRAINT "DropDownGroupTranslation_dropdownGroupId_fkey";

-- DropForeignKey
ALTER TABLE "DropDownGroupTranslation" DROP CONSTRAINT "DropDownGroupTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "DropdownItem" DROP CONSTRAINT "DropdownItem_articleId_fkey";

-- DropForeignKey
ALTER TABLE "DropdownItem" DROP CONSTRAINT "DropdownItem_groupId_fkey";

-- DropForeignKey
ALTER TABLE "DropdownItem" DROP CONSTRAINT "DropdownItem_navItemId_fkey";

-- DropForeignKey
ALTER TABLE "DropdownItem" DROP CONSTRAINT "DropdownItem_pageId_fkey";

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
ALTER TABLE "GroupFooter" DROP CONSTRAINT "GroupFooter_footerId_fkey";

-- DropForeignKey
ALTER TABLE "GroupFooterTranslation" DROP CONSTRAINT "GroupFooterTranslation_groupfooterId_fkey";

-- DropForeignKey
ALTER TABLE "GroupFooterTranslation" DROP CONSTRAINT "GroupFooterTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "NavbarItem" DROP CONSTRAINT "NavbarItem_articleId_fkey";

-- DropForeignKey
ALTER TABLE "NavbarItem" DROP CONSTRAINT "NavbarItem_pageId_fkey";

-- DropForeignKey
ALTER TABLE "NavbarItemTranslation" DROP CONSTRAINT "NavbarItemTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "NavbarItemTranslation" DROP CONSTRAINT "NavbarItemTranslation_navbarItemId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_groupFooterId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_userId_fkey";

-- DropForeignKey
ALTER TABLE "PageTranslation" DROP CONSTRAINT "PageTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "PageTranslation" DROP CONSTRAINT "PageTranslation_pageId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ServiceTranslation" DROP CONSTRAINT "ServiceTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "ServiceTranslation" DROP CONSTRAINT "ServiceTranslation_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_globalId_fkey";

-- DropForeignKey
ALTER TABLE "TagTranslation" DROP CONSTRAINT "TagTranslation_lang_fkey";

-- DropForeignKey
ALTER TABLE "TagTranslation" DROP CONSTRAINT "TagTranslation_tagId_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_B_fkey";

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "Block";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CategoryService";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "DropDownGroup";

-- DropTable
DROP TABLE "DropdownItem";

-- DropTable
DROP TABLE "Global";

-- DropTable
DROP TABLE "GroupFooter";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "NavbarItem";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "SocialLink";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "common" JSONB NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "globals" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "globals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sociallinks" (
    "id" TEXT NOT NULL,
    "social" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "globalId" TEXT,

    CONSTRAINT "sociallinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navitems" (
    "id" TEXT NOT NULL,
    "isDropdown" BOOLEAN NOT NULL DEFAULT false,
    "forPage" BOOLEAN NOT NULL DEFAULT false,
    "pageId" TEXT,
    "forArticle" BOOLEAN NOT NULL DEFAULT false,
    "articleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dropdowns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "navItemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dropdowns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dropdownitems" (
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

    CONSTRAINT "dropdownitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "footergroups" (
    "id" TEXT NOT NULL,
    "footerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "footergroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupFooterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "footerId" TEXT,
    "groupfooterId" TEXT,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "articleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "id" TEXT NOT NULL,
    "type" TEXT,
    "content" JSONB,
    "pageId" TEXT,
    "articleId" TEXT,
    "categoryServiceId" TEXT,
    "serviceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicecategories" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "servicecategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "studentId" TEXT,
    "serviceId" TEXT,
    "DescriptionOtherService" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "languages_language_key" ON "languages"("language");

-- CreateIndex
CREATE INDEX "sociallinks_globalId_idx" ON "sociallinks"("globalId");

-- CreateIndex
CREATE UNIQUE INDEX "navitems_id_key" ON "navitems"("id");

-- CreateIndex
CREATE UNIQUE INDEX "navitems_pageId_key" ON "navitems"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "navitems_articleId_key" ON "navitems"("articleId");

-- CreateIndex
CREATE UNIQUE INDEX "navitems_pageId_articleId_key" ON "navitems"("pageId", "articleId");

-- CreateIndex
CREATE INDEX "dropdowns_navItemId_idx" ON "dropdowns"("navItemId");

-- CreateIndex
CREATE UNIQUE INDEX "dropdownitems_id_key" ON "dropdownitems"("id");

-- CreateIndex
CREATE UNIQUE INDEX "dropdownitems_pageId_key" ON "dropdownitems"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "dropdownitems_articleId_key" ON "dropdownitems"("articleId");

-- CreateIndex
CREATE INDEX "dropdownitems_groupId_idx" ON "dropdownitems"("groupId");

-- CreateIndex
CREATE INDEX "dropdownitems_navItemId_idx" ON "dropdownitems"("navItemId");

-- CreateIndex
CREATE INDEX "dropdownitems_pageId_idx" ON "dropdownitems"("pageId");

-- CreateIndex
CREATE INDEX "dropdownitems_articleId_idx" ON "dropdownitems"("articleId");

-- CreateIndex
CREATE INDEX "footergroups_footerId_idx" ON "footergroups"("footerId");

-- CreateIndex
CREATE UNIQUE INDEX "pages_id_key" ON "pages"("id");

-- CreateIndex
CREATE INDEX "pages_groupFooterId_idx" ON "pages"("groupFooterId");

-- CreateIndex
CREATE UNIQUE INDEX "articles_id_key" ON "articles"("id");

-- AddForeignKey
ALTER TABLE "GlobalTranslation" ADD CONSTRAINT "GlobalTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GlobalTranslation" ADD CONSTRAINT "GlobalTranslation_globalId_fkey" FOREIGN KEY ("globalId") REFERENCES "globals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sociallinks" ADD CONSTRAINT "sociallinks_globalId_fkey" FOREIGN KEY ("globalId") REFERENCES "globals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navitems" ADD CONSTRAINT "navitems_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "navitems" ADD CONSTRAINT "navitems_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItemTranslation" ADD CONSTRAINT "NavbarItemTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NavbarItemTranslation" ADD CONSTRAINT "NavbarItemTranslation_navbarItemId_fkey" FOREIGN KEY ("navbarItemId") REFERENCES "navitems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dropdowns" ADD CONSTRAINT "dropdowns_navItemId_fkey" FOREIGN KEY ("navItemId") REFERENCES "navitems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropDownGroupTranslation" ADD CONSTRAINT "DropDownGroupTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropDownGroupTranslation" ADD CONSTRAINT "DropDownGroupTranslation_dropdownGroupId_fkey" FOREIGN KEY ("dropdownGroupId") REFERENCES "dropdowns"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dropdownitems" ADD CONSTRAINT "dropdownitems_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "dropdowns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dropdownitems" ADD CONSTRAINT "dropdownitems_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dropdownitems" ADD CONSTRAINT "dropdownitems_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dropdownitems" ADD CONSTRAINT "dropdownitems_navItemId_fkey" FOREIGN KEY ("navItemId") REFERENCES "navitems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItemTranslation" ADD CONSTRAINT "DropdownItemTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropdownItemTranslation" ADD CONSTRAINT "DropdownItemTranslation_dropdownItemId_fkey" FOREIGN KEY ("dropdownItemId") REFERENCES "dropdownitems"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FooterTranslation" ADD CONSTRAINT "FooterTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "footergroups" ADD CONSTRAINT "footergroups_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupFooterTranslation" ADD CONSTRAINT "GroupFooterTranslation_groupfooterId_fkey" FOREIGN KEY ("groupfooterId") REFERENCES "footergroups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupFooterTranslation" ADD CONSTRAINT "GroupFooterTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_groupFooterId_fkey" FOREIGN KEY ("groupFooterId") REFERENCES "footergroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTranslation" ADD CONSTRAINT "PageTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTranslation" ADD CONSTRAINT "PageTranslation_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_groupfooterId_fkey" FOREIGN KEY ("groupfooterId") REFERENCES "footergroups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTranslation" ADD CONSTRAINT "ArticleTranslation_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTranslation" ADD CONSTRAINT "TagTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagTranslation" ADD CONSTRAINT "TagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentTranslation" ADD CONSTRAINT "CommentTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentTranslation" ADD CONSTRAINT "CommentTranslation_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "PageTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "ArticleTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_categoryServiceId_fkey" FOREIGN KEY ("categoryServiceId") REFERENCES "CategoryServiceTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ServiceTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryServiceTranslation" ADD CONSTRAINT "CategoryServiceTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryServiceTranslation" ADD CONSTRAINT "CategoryServiceTranslation_categoryServiceId_fkey" FOREIGN KEY ("categoryServiceId") REFERENCES "servicecategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "servicecategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTranslation" ADD CONSTRAINT "ServiceTranslation_lang_fkey" FOREIGN KEY ("lang") REFERENCES "languages"("language") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceTranslation" ADD CONSTRAINT "ServiceTranslation_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToTag" ADD CONSTRAINT "_ArticleToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
