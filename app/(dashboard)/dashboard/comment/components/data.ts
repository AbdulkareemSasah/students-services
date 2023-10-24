import prismadb from "@/lib/prisma";
import {Category} from "@/app/(dashboard)/dashboard/category/components/columns";

export async function getData() {
        const data = await prismadb.comment.findMany({
            select: {
                id: true,
                translations:{
                    select: {
                        id:true,
                        lang: true,
                        author:{
                            select: {
                                name:true
                            }
                        },
                        name:true,
                        body: true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                createdAt: true,
                updatedAt: true,
                article: {
                    select: {
                        translations :{
                            select: {
                                lang:true,
                                title:true
                            }
                        }
                    }
                }
            }
        })
        return data
}


