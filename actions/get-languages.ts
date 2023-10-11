import prismadb from "@/lib/prisma";

export default async function GetLanguages() {
    let languages: any = await prismadb.language.findMany()
    if (languages?.length === 0 ) {
         languages = await prismadb.language.createMany({
            data: [
                {
                    label: "العربية",
                    language: "ar",
                    common: []
                },
                {
                    label:"Englis",
                    language: "en",
                    common: []
                }
            ]

         })
    }

    return languages
}