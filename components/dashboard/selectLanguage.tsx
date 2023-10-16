"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectTrigger, SelectValue,
} from "@/components/dashboard/ui/select"
import axios from "axios";
import {useTranslation} from "react-i18next";
import { useContext, useEffect, useState} from "react";
import {LanguageContext, LanguageContextProps} from "@/components/dashboard/providers/language-provider";

export  function SelectLanguage() {

    const [languages , setLanguages] = useState<(any)[]>([])
    const { selectedLang, handleLanguageSelect } = useContext<LanguageContextProps>(LanguageContext);

    const handleChange = (lang:string) => {
        handleLanguageSelect(lang);
    };

    useEffect( ()=> {
        axios.get("/api/language")
            .then(data => data.data)
            .then(lang => {
                setLanguages(lang)
            }).catch(err => {
            console.error(err)
            setLanguages([
                {
                    label : "English",
                    language: "en"
                },
                {
                    label : "العربية",
                    language: "ar"
                },
            ])
        })
    },[])


    return (
        <div>
            <Select defaultValue={selectedLang} onValueChange={(e) => handleChange(e)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {languages.map(l => <SelectItem key={l.language} value={l.language}>{l.label}</SelectItem> )}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
