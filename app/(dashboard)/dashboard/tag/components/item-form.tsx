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
import { useParams } from 'next/navigation';


type Translation = {
    lang: string;
    name: string;
};

interface formatedTranslation  {
    [language: string]: {
        name: string
        lang:string
    }
}
export function formatTranslation(translations: Translation[]): formatedTranslation {
    const result: formatedTranslation = {};

    translations.forEach((item) => {
        const { name, lang } = item;

        if (!result[lang]) {
            result[lang] = {
                name,
                lang
            };
        }
    });

    return result

}

function convertToTranslationArray(translationObject: formatedTranslation): Translation[] {
    const result: Translation[] = [];

    for (const lang in translationObject) {
        if (translationObject.hasOwnProperty(lang)) {
            const { name } = translationObject[lang];

            result.push({
                name,
                lang
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
const ItemForm = ({initialData }:CategoryFormProps) => {
    const params = useParams()
    const { selectedLang } = useContext(LanguageContext);
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "tag"
    const head = {
        title: initialData ? initialData.find(t => t.lang === selectedLang)?.name :t(`${name}.create.title`),
        description : t(`${name}.create.description`),
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
                const response = await fetch(`/api/${name}/${params?.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    router.push(`/dashboard/${name}`)
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
                    router.push(`/dashboard/${name}`)
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
            await axios.delete(`/api/${name}/${params?.id}`);
            router.refresh();
            router.push(`/dashboard/${name}`);
            toast.success(t(`${name}.toast.delete.success`));
        } catch (error: any) {
            toast.error(t(`${name}.toast.delete.error`));
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
