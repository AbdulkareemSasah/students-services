import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";


export  async  function  GET(req:NextRequest) {
    let query = req.nextUrl.searchParams
    if(query.get("take") === "all") {
        const items = await prisma.navbarItem.findMany({
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (!query.get("take")) {
        const items = await prisma.navbarItem.findMany({
            take:20,
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (query.get("skip") && query.get("take")) {
        const items = await prisma.navbarItem.findMany({
            skip:Number(query.get("skip")),
            take:Number(query.get("take")),
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }

    return NextResponse.json({error: "Error in Get data"}, {status : 400})
}


export async function POST(req:NextRequest) {
    const body = await req.json()
    const {
        translations,
        articleId,
        pageId,
        dropdownGroups,
        dropdownItems,
        isDropdown,
        forArticle,
        forPage,
    } = body

    const newTranslations = translations.map((t :any)=> {
        let l = t.lang
        delete t.lang
        return {
            ...t,
            language: {
                connect : {
                    language: l
                }
            }
        }
    })
    if (translations) {
        const navbarItem = await prisma.navbarItem.create({
            data: {
                translations : {
                    create: newTranslations
                },
                isDropdown,
                forPage,
                forArticle,
                article:forArticle ? {
                    connect:{
                        id:articleId
                    }
                } : undefined,
                page: forPage ? {
                    connect:{
                        id:pageId
                    }
                } : undefined,
                dropdownGroups:isDropdown ? {
                    connect: dropdownGroups.map((d:string) => {return {id : d}})
                } : undefined,
                dropdownItems: isDropdown ?  {
                    connect: dropdownItems.map((d:string) => {return {id : d}})
                } : undefined,
            }
        })
        if(navbarItem) return NextResponse.json(navbarItem)
        return  NextResponse.json({error: "error"})
    }
    return  NextResponse.json({error: "error"})
}