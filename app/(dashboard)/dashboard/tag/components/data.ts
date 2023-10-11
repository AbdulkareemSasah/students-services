import prismadb from "@/lib/prisma";
import {Category} from "@/app/(dashboard)/dashboard/category/components/columns";

export async function getData() {
        const data = await prismadb.tag.findMany({
            select: {
                id: true,
                translations: {
                    select: {
                        id:true,
                        lang: true,
                        name:true,
                        createdAt: true,
                        updatedAt: true
                    }
                },
                createdAt: true,
                updatedAt: true,
                _count: {
                    select:{
                        articles:true,
                    }
                }
            }
        })
        
        return data
}


