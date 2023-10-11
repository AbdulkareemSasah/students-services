
export default async function GetLanguages() {
    let languages: any = await prisma?.language.findMany()
    if (languages?.length === 0 ) {
         languages = await prisma?.language.createMany({
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