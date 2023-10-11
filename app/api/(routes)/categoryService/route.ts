import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";


export  async  function  GET(req:NextRequest) {
    let query = req.nextUrl.searchParams
    if(query.get("take") === "all") {
        const items = await prisma.categoryService.findMany({
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (!query.get("take")) {
        const items = await prisma.categoryService.findMany({
            take:20,
            include:{
                translations:true,
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (query.get("skip") && query.get("take")) {
        const items = await prisma.categoryService.findMany({
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
    const {translations} = body
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

    if (translations) {
        const categoryService = await prisma.categoryService.create({
            data: {
                translations : {
                    create: newTranslations
                }
            }
        })
        if(categoryService) return NextResponse.json(categoryService)
        return  NextResponse.json({error: "error"})
    }
    return  NextResponse.json({error: "error"})
}