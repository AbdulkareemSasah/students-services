import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req:NextRequest, {params} : {params : {
    id : string
    }}) {
    const dropDownGroup = prisma.dropDownGroup.findUnique({
        where :{
            id:params.id
        }
    })
    if (dropDownGroup) return NextResponse.json(dropDownGroup)
    return NextResponse.json({error : "CATEGORY_GET not found"}, {status : 301})
}


export async function PATCH(req:NextRequest, {params} : {params : {
        id : string
    }}) {
    const body = await req.json()
    const {
        translations,
        navItemId,
        dropdownItems,
    } = body
    const newTranslations = translations.map((t :any)=> {
        let l = t.lang
        delete t.lang
        return {
            where : {
                id: t.id
            },
            data: {
                name:t.name
            }
        }
    })
    const dropDownGroup =await prisma.dropDownGroup.update({
        where : {
            id :params.id
        },
        data : {
            translations : {
                updateMany: newTranslations
            },
            navItem: navItemId ? {
                connect :{
                    id: navItemId
                }
            } : undefined,
            dropdownItems: {
                connect: dropdownItems.map((d:string) => {return {id : d}})
            }
        }
    })
    if (dropDownGroup) return NextResponse.json(dropDownGroup)
    return NextResponse.json({error : "CATEGORY_PATCH error"}, {status : 500})
}

export async function DELETE(req:NextRequest,{params} : {params : {
        id : string
    }}) {

    const navbarItem = await prisma.dropDownGroup.delete({
        where :{
            id: params.id
        }
    })

    if(navbarItem) return NextResponse.json(navbarItem)
    return NextResponse.json({error: "AI sre s "}, {status : 500})

}