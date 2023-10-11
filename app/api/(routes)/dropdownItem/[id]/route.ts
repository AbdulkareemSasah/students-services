import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(req:NextRequest, {params} : {params : {
    id : string
    }}) {
    const dropdownItem = prismadb.dropdownItem.findUnique({
        where :{
            id:params.id
        }
    })
    if (dropdownItem) return NextResponse.json(dropdownItem)
    return NextResponse.json({error : "CATEGORY_GET not found"}, {status : 301})
}


export async function PATCH(req:NextRequest, {params} : {params : {
        id : string
    }}) {
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
            where : {
                id: t.id
            },
            data: {
                name:t.name
            }
        }
    })
    const dropdownItem =await prismadb.dropdownItem.update({
        where : {
            id :params.id
        },
        data : {
            translations : {
                updateMany: newTranslations
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
    if (dropdownItem) return NextResponse.json(dropdownItem)
    return NextResponse.json({error : "CATEGORY_PATCH error"}, {status : 500})
}

export async function DELETE(req:NextRequest,{params} : {params : {
        id : string
    }}) {

    const dropdownItem = await prismadb.dropdownItem.delete({
        where :{
            id: params.id
        }
    })

    if(dropdownItem) return NextResponse.json(dropdownItem)
    return NextResponse.json({error: "AI sre s "}, {status : 500})

}