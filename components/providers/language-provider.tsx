"use client"
import React, { createContext, useState } from 'react';

import {useTranslation} from "react-i18next";

export interface LanguageContextProps {
    selectedLang: string;
    handleLanguageSelect: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
    selectedLang: '',
    handleLanguageSelect: () => {},
});

const LanguageProvider = ({ children }:{children:React.ReactNode}) => {
    const {i18n} = useTranslation()
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const handleLanguageSelect = (lang: string) => {
        setSelectedLang(lang);
    };

    const contextValue: LanguageContextProps = {
        selectedLang,
        handleLanguageSelect,
    };


    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

export { LanguageContext, LanguageProvider };