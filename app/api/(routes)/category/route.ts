import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prisma";


export  async  function  GET(req:NextRequest) {
    let query = req.nextUrl.searchParams
    if(query.get("take") === "all") {
        if(query.get("for") === "short") {
            const items = await prismadb.category.findMany({
                orderBy:{
                    articles:{
                        _count:"asc"
                    }
                },
                select:{
                    translations:{
                        select: {
                            lang:true,
                            name:true,
                        }
                    },
                    _count:{
                        select: {
                            articles:true
                        }
                    }
                }
            })
            if (items) return NextResponse.json(items)
        }
        if(query.get("for") === "full") {
            const items = await prismadb.category.findMany({
                where:{
                    active:true
                },
                orderBy:{
                    articles:{
                        _count:"asc"
                    }
                },
                select:{
                    translations:true,
                    
                    _count:{
                        select: {
                            articles:true
                        }
                    }
                }
            })
            if (items) return NextResponse.json(items)
        }
        const items = await prismadb.category.findMany({
            include:{
                translations:true,
                _count:{
                    select: {
                        articles:true
                    }
                }
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (!query.get("take")) {
        const items = await prismadb.category.findMany({
            take:20,
            include:{
                translations:true,
                _count:{
                    select: {
                        articles:true
                    }
                }
            }
        })
        if (items) return NextResponse.json(items)
    }
    if (query.get("skip") && query.get("take")) {
        const items = await prismadb.category.findMany({
            skip:Number(query.get("skip")),
            take:Number(query.get("take")),
            include:{
                translations:true,
                _count:{
                    select: {
                        articles:true
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
    const {translations} = body

    const newTranslations = translations.map((t :any)=> {
        let l = t.lang
        delete t.lang
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
            }
        }
    })
    if (translations) {
        const category = await prismadb.category.create({
            data: {
                translations : {
                    create: newTranslations
                }
            }
        })
        if(category) return NextResponse.json(category)
        return  NextResponse.json({error: "error"})
    }
    return  NextResponse.json({error: "error"})
}