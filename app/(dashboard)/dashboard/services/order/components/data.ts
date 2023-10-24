import prismadb from "@/lib/prisma";
import {Category} from "@/app/(dashboard)/dashboard/category/components/columns";

export async function getData() {
        const data = await prismadb.order.findMany({
            include: {
                service :{
                    select: {
                        translations :{
                            select: {
                                lang:true,
                                name:true
                            }
                        }
                    }
                },
                student : {
                    select : {
                        email : true,
                        name:true
                    }
                }
            }
        })
        return data
}


