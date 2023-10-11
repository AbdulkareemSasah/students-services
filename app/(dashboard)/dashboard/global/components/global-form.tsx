"use client"
import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {LanguageContext} from "@/components/providers/language-provider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormItem, FormLabel} from "@/components/ui/form";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import {Trash2Icon} from "lucide-react";
import {Heading} from "@/components/ui/heading";
import {AlertModal} from "@/components/modals/alert-modal";
import {toast} from "react-hot-toast";


type Translation = {
    lang: string;
    name: string;
    logo:string,
    favicon:string,
    images:string[],
    description: string  | null;

};

interface formatedTranslation  {
    [language: string]: {
        name: string
        description: string
        lang:string
        logo:string
        favicon:string
        images:string[]
    }
}
export function formatTranslation(translations: Translation[]): formatedTranslation {
    const result: formatedTranslation = {};

    translations.forEach((item) => {
        const { 
            name,
            description,
            lang,
            logo,
            favicon,
            images ,
        } = item;

        if (!result[lang]) {
            result[lang] = {
                name,
                description:description || "",
                lang,
                logo,
                favicon,
                images
                
            };
        }
    });

    return result

}

function convertToTranslationArray(translationObject: formatedTranslation): Translation[] {
    const result: Translation[] = [];

    for (const lang in translationObject) {
        if (translationObject.hasOwnProperty(lang)) {
            const { 
                name,
                description,
                logo,
                favicon,
                images
            } = translationObject[lang];

            result.push({
                name,
                lang,
                logo,
                favicon,
                images,
                description: description || "",
            });
        }
    }

    return result;
}

type FormValues = {
    translations: formatedTranslation
};


interface CategoryFormProps {
    initialData?: {
        translations:Translation[],
    }
}
const GlobalForm = ({initialData }:CategoryFormProps) => {
    const { selectedLang } = useContext(LanguageContext);
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "global"
    const head = {
        title: initialData ? initialData.translations.find(t => t.lang === selectedLang)?.name :t(`${name}.create.title`),
        description : initialData ? initialData.translations.find(t => t.lang === selectedLang)?.description :t(`${name}.create.description`),
    };
    const title = initialData ? t(`${name}.edit.title`) :t(`${name}.create.title`);
    const description = initialData ? t(`${name}.edit.description`) :t(`${name}.create.description`);
    const toastMessage = {
        success : initialData ? t(`${name}.toast.update.success`) : t(`${name}.toast.create.success`),
        error : initialData ? t(`${name}.toast.update.error`) : t(`${name}.toast.create.error`),
    };
    const action = initialData ? t('Save changes') : t('Create')
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const [isFormEmpty, setIsFormEmpty] = useState(false);
    const [languages , setLanguages] = useState<(any)[]>([])

    const form = useForm<FormValues>( initialData && {
        defaultValues: {
            translations : formatTranslation(initialData.translations)
        }
    });
    const { handleSubmit, register, formState: { errors } } = form
    useEffect( ()=> {
        axios.get("/api/language")
            .then(data => data.data)
            .then(lang => {
                setLanguages(lang)
            })

    },[])

    const onSubmit = async () => {
        setLoading(true)
        const formData = {
            translations : convertToTranslationArray(form.getValues().translations)
            };

        const isTranslationsEmpty = formData.translations.every((t) => {
            return (
                !t.name.trim()
            );
        });
        if (isTranslationsEmpty) {
            setIsFormEmpty(true);
            return;
        }
        console.log(formData)
        console.log(isTranslationsEmpty)
        setIsFormEmpty(false);
        if (initialData) {
            try {
                const response = await fetch(`/api/${name}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    toast.success(toastMessage.success);
                } else {
                    console.error('Failed to submit data');
                    toast.error(toastMessage.error);

                }
            } catch (error) {
                console.error('Error submitting data', error);
                toast.error(toastMessage.error);
            } finally {
                setLoading(false);
            }

        }else  {
            try {
                const response = await fetch(`/api/${name}`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    form.reset()
                    toast.success(toastMessage.success);
                } else {
                    console.error('Failed to submit data');
                    toast.error(toastMessage.error);
                }
            } catch (error) {
                console.error('Error submitting data', error);
                toast.error(toastMessage.error);
            } finally {
                setLoading(false);
            }
        }

    };

    return (
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"} className={"space-y-8 w-full"}>
        
            <div className="flex items-center justify-between">
                <Heading
                    title={head.title}
                    description={head.description} />
            </div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle className={"text-2xl"}>{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {languages.map((l, index) => {
                                return (
                                    <div key={l.language} className={selectedLang === l.language ? "gap-y-3" : "hidden"}>
                                        <FormItem>
                                            <FormLabel>{t(`${name}.form.name`)}</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.name`)} />
                                            </FormControl>
                                            {errors.translations?.[l.language]?.name && <p>{errors.translations?.[l.language]?.name?.message}</p>}
                                        </FormItem>
                                        <FormItem hidden={true}>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.lang`)} hidden={true} value={l.language}/>
                                            </FormControl>
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel>{t(`${name}.form.description`)}</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.description`)} />
                                            </FormControl>
                                            {errors.translations?.[index]?.description && <p>{errors.translations?.[l.language]?.description?.message}</p>}
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel>{t(`${name}.form.logo`)}</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.logo`)} />
                                            </FormControl>
                                            {errors.translations?.[index]?.logo && <p>{errors.translations?.[l.language]?.logo?.message}</p>}
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel>{t(`${name}.form.favicon`)}</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.favicon`)} />
                                            </FormControl>
                                            {errors.translations?.[index]?.favicon && <p>{errors.translations?.[l.language]?.favicon?.message}</p>}
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel>{t(`${name}.form.images`)}</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.images`)} />
                                            </FormControl>
                                            {errors.translations?.[index]?.images && <p>{errors.translations?.[l.language]?.images?.message}</p>}
                                        </FormItem>
                                    </div>
                                );
                            })}
                            {isFormEmpty && <p>يرجى ملء جميع الحقول اللغوية</p>}
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading}>{action}</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>

    );
};

export default GlobalForm;
