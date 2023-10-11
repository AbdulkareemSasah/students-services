import {Prisma} from "@prisma/client";

export function checkModel(name:string) {
    let outerModel = [
        "account",
        "session",
        "user",
        "verificationtoken",
        "language",
        "order"
    ]
    let includedModel = Object.values(Prisma.ModelName).map(i => i.toLowerCase()).filter(e => !outerModel.includes(e) && !e.endsWith("translation"))
    return includedModel.includes(name)
}

export function getModelName(name:string)  {
    let includedModel = Object.values(Prisma.ModelName).find(i => i.toLowerCase() === `${name}`)
    return includedModel
}

export function getModelNameTranslation(name:string)  {
    let list = Object.values(Prisma.ModelName).map(e => {
        let m = e.toString()
        m = m[0].toLowerCase()+ m.slice(1)
        return m
    })
    return list.find(i => i.toLowerCase() === `${name}translation`)
}

