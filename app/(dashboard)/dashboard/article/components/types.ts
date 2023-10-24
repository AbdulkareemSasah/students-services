import { Article, ArticleTranslation, Block, Category,CategoryTranslation, Tag } from "@prisma/client";

export type ArticleTranslationProps = {
    blocks : Block[]
} & ArticleTranslation

export type ArticleProps = {
    translations: ArticleTranslationProps[],
} & Article