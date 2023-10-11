import prisma from "@/lib/prisma";

export type ItemType = {
    [lang : string] : {
        name:string,
        id:string,
        lang:string
    }
}
export async function getCategoriesService() {
    try {
        const data = await prisma.categoryService.findMany({
            select: {
                id: true,
                translations: {
                    select: {
                        lang: true,
                        name: true,
                    }
                },
            }
        })
        const formatData = data.map((item:any) => {
            const formattedItem: ItemType = {};

            item.translations.forEach((translation:any) => {
                formattedItem[translation.lang] = {
                    name: translation.name,
                    id: item.id,
                    lang: translation.lang
                };
            });

            return formattedItem;
        });
        return formatData
    } catch (e) {
        console.error(e)
        return []
    }
}