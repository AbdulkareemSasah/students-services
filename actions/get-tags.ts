import prisma from "@/lib/prisma";

type ItemType = {
    [lang : string] : {
        name:string,
        id:string,
        lang:string
    }
}
export async function getTags()  {
    try {
        const data = await prisma.tag.findMany({
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