import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const global = await prismadb.global.findFirst({
        include :{
            translations: true
        }
    })
    if(global) return NextResponse.json(global)
    return NextResponse.json({error: "Server Error"}, {status : 501})
}


export async function PATCH(req:NextRequest) {
    const body  = await req.json()
    const firstGlobal = await prismadb.global.findFirst()
    const {translations} = body
    
    if (firstGlobal) {
        const newTranslations = translations.map((t :any)=> {
            let l = t.lang
            delete t.lang
            return {
                where : {
                    id: t.id
                },
                data :{
                    ...t
                }
            }
        })
        const global = await prismadb.global.update({
            where: {
                id: firstGlobal.id
            },
            data :{
                translations:{
                    updateMany : newTranslations
                }
            },
            include: {
                translations:true
            }
        })

        if (global) return NextResponse.json(global)
        return NextResponse.json({error: "Server Error"}, {status : 501})
    } else {
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
        const global = await prismadb.global.create({
            data: {
                translations:{
                    createMany:newTranslations
                }
            }
        })
        if (global) return NextResponse.json(global)
        return NextResponse.json({error: "Server Error"}, {status : 501})
    }
}

