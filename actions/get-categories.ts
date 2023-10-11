import prisma from "@/lib/prisma";

export type ItemType = {
    [lang : string] : {
        name:string,
        id:string,
        lang:string
    }
}
export async function getCategories() {
    try {
        const data = await prisma.category.findMany({
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
        const formatData = data.map(item => {
            const formattedItem: ItemType = {};

            item.translations.forEach(translation => {
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