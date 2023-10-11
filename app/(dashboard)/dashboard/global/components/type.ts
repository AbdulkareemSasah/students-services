import { Article, ArticleTranslation, DropDownGroup, DropDownGroupTranslation, DropdownItem, DropdownItemTranslation, GroupFooter, GroupFooterTranslation, NavbarItem, NavbarItemTranslation, Page, PageTranslation } from "@prisma/client"


///////////////////////////*Models*///////////////////////////////////////////

export type DropDownGroupProps = {
    translations: DropDownGroupTranslation[],
    dropdownItems: DropdownItem[]
} & DropDownGroup

export type NavbarItemProps =  {
    translations:NavbarItemTranslation[],
    dropdownGroups: DropDownGroup[],
    dropdownItems:DropdownItem[],
} & NavbarItem

export type DropDownItemProps  = {
    translations:DropdownItemTranslation[],
} & DropdownItem

export type PageProps  = {
    translations:PageTranslation[],
} & Page
export type ArticleProps  = {
    translations:ArticleTranslation[],
} & Article

export type GroupFooterProps = {
    translations: GroupFooterTranslation[],
    pages: Page[]
    articles: Article[]
} & GroupFooter

///////////////////////////*Forms*///////////////////////////////////////////


export interface NavbarItemFormProps {
    initialData?: NavbarItemProps,
    pages: PageProps[],
    dropdownGroups:DropDownGroupProps[],
    dropdownItems:DropDownItemProps[],
    articles:ArticleProps[]
}

export type DropdownItemFormProps =  {
    initialData?: DropDownItemProps,
    pages: PageProps[],
    articles:ArticleProps[]
    dropdownGroups:DropDownGroupProps[],
    navbarItems:NavbarItemProps[],
}

export interface GroupFooterFormProps {
    initialData?: GroupFooterProps,
    pages:PageProps[],
    articles:ArticleProps[],
}

///////////////////////////*Clients*///////////////////////////////////////////

export interface DropDownGroupClientProps {
    navbarItems : NavbarItemProps[]
    dropdownGroups:DropDownGroupProps[],
    dropdownItems:DropDownItemProps[]
}

export type DropDownClientProps =  {
    navbarItems : NavbarItemProps[]
    pages: PageProps[],
    articles:ArticleProps[],
    dropdownGroups:DropDownGroupProps[],
    dropdownItems:DropDownItemProps[]
}

export interface NavbarClientProps {
    navbarItems : NavbarItemProps[]
    pages: PageProps[],
    articles:ArticleProps[],
    dropdownGroups:DropDownGroupProps[],
    dropdownItems:DropDownItemProps[]
}



export interface GroupFooterClientProps {
    groupFooters:GroupFooterProps[], 
    pages:PageProps[],
    articles:ArticleProps[]
}