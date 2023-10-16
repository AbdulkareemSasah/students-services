"use client"
import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Input} from "@/components/dashboard/ui/input";
import {Button} from "@/components/dashboard/ui/button";
import axios from "axios";
import {LanguageContext} from "@/components/dashboard/providers/language-provider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/dashboard/ui/card";
import {Form, FormControl, FormItem, FormLabel} from "@/components/dashboard/ui/form";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import {Trash2Icon} from "lucide-react";
import {Heading} from "@/components/dashboard/ui/heading";
import {AlertModal} from "@/components/dashboard/modals/alert-modal";
import {toast} from "react-hot-toast";


type Translation = {
    lang: string;
    name: string;
    author: {
        email: string | null;
    };
    description: string  | null;

};

interface formatedTranslation  {
    [language: string]: {
        name: string
        description: string
        lang:string
        author: {
            email: string | null;
        }
    }
}
export function formatTranslation(translations: Translation[]): formatedTranslation {
    const result: formatedTranslation = {};

    translations.forEach((item) => {
        const { name, description, lang,author } = item;

        if (!result[lang]) {
            result[lang] = {
                name,
                lang,
                description: description || '',
                author,
            };
        }
    });

    return result

}

function convertToTranslationArray(translationObject: formatedTranslation): Translation[] {
    const result: Translation[] = [];

    for (const lang in translationObject) {
        if (translationObject.hasOwnProperty(lang)) {
            const { name, description,author } = translationObject[lang];

            result.push({
                name,
                description: description || null,
                lang,
                author,
            });
        }
    }

    return result;
}

type FormValues = {
    translations: formatedTranslation
};


interface CategoryFormProps {
    initialData?: Translation[],
}
const ItemForm = ({initialData }:CategoryFormProps, params : {id: string}) => {
    const { selectedLang } = useContext(LanguageContext);
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "category"
    const head = {
        title: initialData ? initialData.find(t => t.lang === selectedLang)?.name :t(`category.create.title`),
        description : initialData ? initialData.find(t => t.lang === selectedLang)?.description :t(`category.create.description`),
    };
    const title = initialData ? t(`category.edit.title`) :t(`category.create.title`);
    const description = initialData ? t(`category.edit.description`) :t(`category.create.description`);
    const toastMessage = {
        success : initialData ? t(`category.toast.update.success`) : t(`category.toast.create.success`),
        error : initialData ? t(`category.toast.update.error`) : t(`category.toast.create.error`),
    };
    const action = initialData ? t('Save changes') : t('Create')
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const [isFormEmpty, setIsFormEmpty] = useState(false);
    const [languages , setLanguages] = useState<(any)[]>([])

    const form = useForm<FormValues>( initialData && {
        defaultValues: {
            translations : formatTranslation(initialData)
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
                const response = await fetch(`/api/category/${params.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    router.push(`/dashboard/category/${params.id}#view`)
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
                const response = await fetch('/api/category', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    form.reset()
                    router.push(`/dashboard/category`)
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
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/category/${params.id}`);
            router.refresh();
            router.push(`/dashboard/category`);
            toast.success(t(`category.toast.delete.success`));
        } catch (error: any) {
            toast.error(t(`category.toast.delete.error`));
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"} className={"space-y-8 w-full"}>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title={head.title}
                    description={head.description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash2Icon
                            className="h-4 w-4" />
                    </Button>
                )}
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
                                            <FormLabel>{t(`category.form.name`)}</FormLabel>
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
                                            <FormLabel>{t(`category.form.description`)}</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.description`)} />
                                            </FormControl>
                                            {errors.translations?.[index]?.description && <p>{errors.translations?.[l.language]?.description?.message}</p>}
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

export default ItemForm;
