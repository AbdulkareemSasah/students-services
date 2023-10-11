import prisma from "@/lib/prisma";
import {Category} from "@/app/(dashboard)/dashboard/category/components/columns";

export async function getData() {
        const data = await prisma.service.findMany({
            select: {
                id: true,
                translations:{
                    select: {
                        id:true,
                        lang: true,
                        name:true,
                        description: true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                createdAt: true,
                updatedAt: true,
                CategoryService:{
                    select: {
                        id:true,
                        translations: {
                            select: {
                                name: true,
                                lang:true
                            }
                        }
                    }
                }
            }
        })
        return data
}


