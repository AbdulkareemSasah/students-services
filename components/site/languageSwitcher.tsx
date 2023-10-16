"use client"
import { Button } from "@nextui-org/react";
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
        <Button isIconOnly  variant="bordered" size="sm" onClick={changeLanguage}>
          {i18n.language === "ar" ? "en" : "ع"}
        </Button>
      </>
    );
  }