import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export  async function POST(req:NextRequest){
    const body = await req.json()
    const {label , language} = body
    if (label && language) {
        const langExist = await prisma.language.findUnique({
            where:{
                language:language
            }
        })
        if (langExist){
            return NextResponse.json({
                error : {
                    "LANGUAGE_CREATE" : "language is already !"
                }
            } , {status: 301})
        }
        const lang = await prisma.language.create({
            data:{
                label,
                language,
                common: body.common || {}
            }
        })
        if (lang) {
            return NextResponse.json(lang)
        }
        return NextResponse.json({error : "LANGUAGE_CREATE"} , {status: 301})

    }
    return NextResponse.json({error : "LANGUAGE_CREATE"} , {status: 301})
}

export async function GET(req:NextRequest) {
    const languages = await prisma.language.findMany({
        select : {
            id:true,
            label: true,
            language: true,
            common: false
        }

    })
    return NextResponse.json(languages)
}


