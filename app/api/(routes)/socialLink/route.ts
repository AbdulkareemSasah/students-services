import prismadb from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const socialLinks = await prismadb.socialLink.findMany()

    return NextResponse.json(socialLinks)
}

export async function POST(req:NextRequest) {
    const body = await req.json()
    const {social , url} = body

    if(!social || !url) return NextResponse.json({error: "social or url is required"}, {status : 401})
    const socialLink = await prismadb.socialLink.create({
            data : {
                social,
                url
            }
        })
    if (socialLink) return NextResponse.json(socialLink)
    return NextResponse.json({error: "Server Error"}, {status : 501})
}