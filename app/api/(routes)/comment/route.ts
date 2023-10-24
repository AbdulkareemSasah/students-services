import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    const comment = await prismadb.comment.create({
        data: {
            article: {
                connect :{
                    id: body.articleId
                }
            },
            translations: {
                createMany: newTranslations,
            }
        }
    })

    if (comment) return NextResponse.json("success")
    return NextResponse.json({COMMENT_POST: "Server Error" }, {status : 501})

}