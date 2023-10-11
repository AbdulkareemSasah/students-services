import prisma from "@/lib/prisma";
import {Category} from "@/app/(dashboard)/dashboard/category/components/columns";

export async function getData() {
        const data = await prisma.article.findMany({
            select: {
                id: true,
                translations:{
                    select: {
                        id:true,
                        lang: true,
                        title:true,
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
                updatedAt: true,
                tags: {
                    select: {
                        id:true,
                        translations: {
                            select : {
                                name:true,
                                lang:true,
                            }
                        }
                    }
                },
                category:{
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


