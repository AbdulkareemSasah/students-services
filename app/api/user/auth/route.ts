import {NextRequest, NextResponse} from "next/server";
import {signIn} from "next-auth/react";

export async function POST(req:NextRequest) {
    const body = await req.json()

    if (body.email && body.password) {
        const res = await signIn("credentials" , {
            ...body
        })
        if (res?.ok){
            return NextResponse.json("Ok")
        }
        return NextResponse.json("error 1", {status : 401})
    }
    return NextResponse.json("error 2", {status : 401})

}