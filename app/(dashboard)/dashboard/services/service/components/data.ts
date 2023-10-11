import prismadb from "@/lib/prisma";

export async function getData() {
        const data = await prismadb.service.findMany({
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


