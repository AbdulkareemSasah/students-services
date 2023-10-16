"use client"
import { Button } from "@/components/dashboard/ui/button";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
    const {i18n} = useTranslation()
    const changeLanguage = () => {
        i18n.language === "ar"
            ? i18n.changeLanguage("en")
            : i18n.changeLanguage("ar")
    }
    return (
        <>
            <Button size="sm" variant={"outline"} className={"rounded-full"} onClick={changeLanguage}>
                {i18n.language === "ar" ? "en" : "ع"}
            </Button>
        </>
    );
}