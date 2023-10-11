import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prisma";


export  async  function  GET(req:NextRequest) {
    let query = req.nextUrl.searchParams
    if(query.get("take") === "all") {
        const items = await prismadb.dropdownItem.findMany({
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (!query.get("take")) {
        const items = await prismadb.dropdownItem.findMany({
            take:20,
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (query.get("skip") && query.get("take")) {
        const items = await prismadb.dropdownItem.findMany({
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
        navbarItemId,
        pageId,
        groupId,
        forGroup,
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
        const dropdownItem = await prismadb.dropdownItem.create({
            data: {
                translations : {
                    create: newTranslations
                },
                forGroup,
                forPage,
                forArticle,
                article:forArticle ? {
                    connect:{
                        id: articleId,
                    }
                } : undefined,
                page: forPage ? {
                    connect:{
                        id:pageId
                    }
                } : undefined,
                group:forGroup ? {
                    connect: {
                        id:groupId
                    }
                } : undefined,
                navItem: navbarItemId ? {
                    connect: {
                        id:navbarItemId
                    }
                } : undefined
                
            }
        })
        if(dropdownItem) return NextResponse.json(dropdownItem)
        return  NextResponse.json({error: "error"})
    }
    return  NextResponse.json({error: "error"})
}