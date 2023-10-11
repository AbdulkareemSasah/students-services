import prisma from "@/lib/prisma";
import {Category} from "@/app/(dashboard)/dashboard/category/components/columns";

export async function getData() {
        const data = await prisma.category.findMany({
            select: {
                id: true,
                translations:{
                    select: {
                        id:true,
                        lang: true,
                        name:true,
                        author: {
                            select:{
                                email: true
                            }
                        },
                        description: true,
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


