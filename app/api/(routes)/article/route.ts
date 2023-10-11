import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";


export  async  function  GET(req:NextRequest) {
    let query = req.nextUrl.searchParams
    if(query.get("take") === "all") {
        const items = await prisma.article.findMany({
            include:{
                translations:true,
                _count:{
                    select: {
                        tags:true,
                        comments:true,
                    }
                }
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (!query.get("take")) {
        const items = await prisma.article.findMany({
            take:20,
            include:{
                translations:true,
                _count:{
                    select: {
                        tags:true,
                        comments:true,
                    }
                }
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (query.get("skip") && query.get("take")) {
        const items = await prisma.article.findMany({
            skip:Number(query.get("skip")),
            take:Number(query.get("take")),
            include:{
                translations:true,
                _count:{
                    select: {
                        tags:true,
                        comments:true,
                    }
                }
            }
        })
        if (items) return NextResponse.json(items)
    }

    return NextResponse.json({error: "Error in Get data"}, {status : 400})
}


export async function POST(req:NextRequest) {
    const body = await req.json()
    const {translations,tags,categoryId} = body
    console.log(translations)
    const newTranslations = translations.map((t :any)=> {
        let l = t.lang
        let blocks = t.blocks
        delete t.lang
        delete t.blocks
        return {
            ...t,
            author: {
                connect: {
                    id : "cln4r15dh00003mv80cx4c24h"
                }
            },
            language: {
                connect : {
                    language: l
                }
            },
            blocks: {
                create :[
                    ...blocks
                ]
            },
        }
    })
    console.log({tags,categoryId,translations})

    if (translations) {
        const article = await prisma.article.create({
            data: {
                translations : {
                    create: newTranslations
                },
                tags: {
                    connect: tags.map((t:string) => {return {id:t}})
                },
                category: {
                    connect:{id:categoryId}
                }
            }
        })
        if(article) return NextResponse.json(article)
        return  NextResponse.json({error: "error"})
    }
    return  NextResponse.json({error: "error"})
}