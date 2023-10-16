"use client"


import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import Link from "next/link";
import React, {useContext} from "react";
import {Badge} from "@/components/dashboard/ui/badge";
import {LanguageContext} from "@/components/dashboard/providers/language-provider";


interface CellViewProps<T> {
    translations:T,
    content:string,
    types:  "string"|"date"|"link"|"list" ,
    link?:string
}
export function CellView<T>({translations,content,types,link} : CellViewProps<T>) {
    const {t} = useTranslation()
    const { selectedLang } = useContext(LanguageContext);
    const [text , setText] = React.useState<string>("") ;
    const [list_items, setListItems] = React.useState<(any)[]>([]);
    React.useEffect(()=> {
            if(Array.isArray(translations)) {
                if (types === "list") {
                    try {
                        let m  = translations.map(ob => {
                            if( Array.isArray(ob.translations)) {
                                let href = `${link}/${ob.id}`
                                let tex =  content.split('.').reduce((acc, currKey) => acc[currKey], ob.translations.find((t:any) => t.lang === selectedLang))
                                return {href , tex}
                            }
                        })
                        setListItems(m)
                    } catch (e) {
                        let m  = translations.map(ob => {
                            if( Array.isArray(ob.translations)) {
                                return content.split('.').reduce((acc, currKey) => acc[currKey], ob.translations[0])
                            }
                        })
                        setListItems(m)
                    }

                }   else {
                    try {
                        let t = content.split('.').reduce((acc, currKey) => acc[currKey], translations.find(t => t.lang === selectedLang))
                        if (types === "date" && selectedLang === "ar") setText(format(t, "hh:mm:ss yyyy-MM-dd"))
                        else if (types === "date") setText(format(t, "yyyy-MM-dd hh:mm:ss"))
                        else setText(t)
                    } catch (err) {
                        let t = content.split('.').reduce((acc, currKey) => acc[currKey], translations[0])
                        if (types === "date" && selectedLang === "ar") setText(format(t, "hh:mm:ss yyyy-MM-dd"))
                        else if (types === "date") setText(format(t, "yyyy-MM-dd hh:mm:ss"))
                        else setText(t)
                    }
                }
            }

    },[selectedLang, content, link,translations,types])

    switch (types) {
        default:
            return <div className={"w-full text-center"}>{text}</div>

        case "date":
            return <div className={"w-full text-center"}>{text}</div>

        case "link":
            if (link) {
                return <Link href={link} className={"w-full text-center"}>
                    {text}
                </Link>
            } else {
                return <div className={"w-full flex flex-row text-center"}>{text}</div>
            }
        case "list":
            if (link) {
                return <div className={"w-full flex flex-row text-center gap-1"}>
                    {list_items.map(i =>  <Badge key={i.tex} variant="secondary" ><Link href={i.href}>{i.tex}</Link></Badge>)}
                </div>
            } else {
                return <div className={"w-full text-center flex flex-row gap-1"}>
                    {list_items.map(i =>  <Badge key={i.tex} variant="secondary" >{i.tex}</Badge>)}
                </div>
            }

    }
}
