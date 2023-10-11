import prisma from "@/lib/prisma";
import {Category} from "@/app/(dashboard)/dashboard/category/components/columns";

export async function getData() {
        const data = await prisma.global.findFirst({
            select: {
                id: true,
                translations:{
                    select: {
                        lang: true,
                        name:true,
                        description: true,
                        logo:true,
                        favicon:true,
                        images:true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                createdAt: true,
                updatedAt: true
            }
        })

        return data
}



