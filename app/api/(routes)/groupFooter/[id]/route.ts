import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(req:NextRequest, {params} : {params : {
    id : string
    }}) {
    const groupFooter = prismadb.groupFooter.findUnique({
        where :{
            id:params.id
        }
    })
    if (groupFooter) return NextResponse.json(groupFooter)
    return NextResponse.json({error : "CATEGORY_GET not found"}, {status : 301})
}


export async function PATCH(req:NextRequest, {params} : {params : {
        id : string
    }}) {
    const body = await req.json()
    const {
        translations,
        pages,
        articles,
    } = body
    const newTranslations = translations.map((t :any)=> {
        let l = t.lang
        delete t.lang
        return {
            where : {
                id: t.id
            },
            data: {
                title:t.title
            }
        }
    })
    const groupFooter =await prismadb.groupFooter.update({
        where : {
            id :params.id
        },
        data : {
            translations : {
                updateMany: newTranslations
            },
            pages:{
                connect: pages.map((d:string) => {return {id : d}})
            } ,
            articles:{
                connect: articles.map((d:string) => {return {id : d}})
            } ,
        }
    })
    if (groupFooter) return NextResponse.json(groupFooter)
    return NextResponse.json({error : "CATEGORY_PATCH error"}, {status : 500})
}

export async function DELETE(req:NextRequest,{params} : {params : {
        id : string
    }}) {

    const groupFooter = await prismadb.groupFooter.delete({
        where :{
            id: params.id
        }
    })

    if(groupFooter) return NextResponse.json(groupFooter)
    return NextResponse.json({error: "AI sre s "}, {status : 500})

}