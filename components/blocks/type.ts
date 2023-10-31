type Block = {
    type: ""
} & {
    type : "swiper"
    content: {
        numperslide: number,
        className:string,
        slides : {
            title: string, 
            description?:string,
            img? : string
        }[]
    }
} & {
    type: "section",
    content: {
        title: string,
        description?: string,
        img? : string,
    }
}