import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req:NextRequest, {params} : {
    params : {
        lang:string
    }
}) {
    const lang = await prisma.language.findUnique({
        where: {
            language: params.lang
        }
    })
    if (lang) return NextResponse.json(lang)
    return NextResponse.json({err : "languagn in not found"}, {status: 401})
}



export async function PATCH(req:NextRequest, {params} : {
    params : {
        lang:string
    }
}) {
    const body = await req.json()
    if (body.common) {
        const lang = await prisma.language.findUnique({
            where: {
                language: params.lang
            }
        })
        if (lang){
            // @ts-ignore
            body.common = {...lang.common, ...body.common}
        }
    }
    const lang = await prisma.language.update({
        where: {
            language: params.lang
        },
        data : {
            ...body
        }
    })
    if (lang) return NextResponse.json(lang)
    return NextResponse.json({err : "languagn in not found"}, {status: 401})
}
export async function DELETE(req:NextRequest, {params} : {
    params : {
        lang:string
    }
}) {
    const lang = await prisma.language.delete({
        where: {
            language: params.lang
        }
    })
    if (lang) return NextResponse.json(lang)
    return NextResponse.json({err : "languagn in not found"}, {status: 401})
}


