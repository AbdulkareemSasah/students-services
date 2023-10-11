import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";


export  async  function  GET(req:NextRequest) {
    let query = req.nextUrl.searchParams
    if(query.get("take") === "all") {
        const items = await prisma.groupFooter.findMany({
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (!query.get("take")) {
        const items = await prisma.groupFooter.findMany({
            take:20,
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (query.get("skip") && query.get("take")) {
        const items = await prisma.groupFooter.findMany({
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
        pages,
        articles,
    } = body
    console.log(body)
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
        const groupFooter = await prisma.groupFooter.create({
            data: {
                translations : {
                    create: newTranslations
                },
                pages:{
                    connect: pages.map((d:string) => {return {id : d}})
                } ,
                articles:{
                    connect: articles.map((d:string) => {return {id : d}})
                },
            }
        })
        if(groupFooter) return NextResponse.json(groupFooter)
        return  NextResponse.json({error: "error"})
    }
    return  NextResponse.json({error: "error"})
}