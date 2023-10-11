import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(req:NextRequest, {params} : {params : {
    id : string
    }}) {
    const navbarItem = prismadb.navbarItem.findUnique({
        where :{
            id:params.id
        }
    })
    if (navbarItem) return NextResponse.json(navbarItem)
    return NextResponse.json({error : "CATEGORY_GET not found"}, {status : 301})
}


export async function PATCH(req:NextRequest, {params} : {params : {
        id : string
    }}) {
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
            where : {
                id: t.id
            },
            data: {
                name:t.name
            }
        }
    })
    const navbarItem =await prismadb.navbarItem.update({
        where : {
            id :params.id
        },
        data : {
            translations : {
                updateMany: newTranslations
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
    if (navbarItem) return NextResponse.json(navbarItem)
    return NextResponse.json({error : "CATEGORY_PATCH error"}, {status : 500})
}

export async function DELETE(req:NextRequest,{params} : {params : {
        id : string
    }}) {

    const navbarItem = await prismadb.navbarItem.delete({
        where :{
            id: params.id
        }
    })

    if(navbarItem) return NextResponse.json(navbarItem)
    return NextResponse.json({error: "AI sre s "}, {status : 500})

}