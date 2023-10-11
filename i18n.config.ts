import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ar from '@/public/locales/ar/translation.json'
import en from '@/public/locales/en/translation.json'

const resources = {
    ar : {
        translation: ar
    },
    en : {
        translation: en
    },
}
i18next.use(initReactI18next);
i18next.init({
    resources,
    lng:"ar",
    saveMissing: true
})


export default i18next;