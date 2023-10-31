import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/lib/prisma";


export  async  function  GET(req:NextRequest) {
    let query = req.nextUrl.searchParams
    if(query.get("take") === "all") {
        if(query.get("for") === "short") {
            const items = await prismadb.tag.findMany({
                orderBy:{ 
                    articles:{
                        _count:"asc"
                    }
                },
                select:{
                    translations:{
                        select:{
                            name:true,
                            lang:true
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
        const items = await prismadb.tag.findMany({
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
        const items = await prismadb.tag.findMany({
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
        const items = await prismadb.tag.findMany({
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
            language: {
                connect : {
                    language: l
                }
            }
        }
    })
    if (translations) {
        const tag = await prismadb.tag.create({
            data: {
                translations : {
                    create: newTranslations
                }
            }
        })
        if(tag) return NextResponse.json(tag)
        return  NextResponse.json({error: "error"})
    }
    return  NextResponse.json({error: "error"})
}