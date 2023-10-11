"use client"
import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {LanguageContext} from "@/components/providers/language-provider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import {Check, ChevronsUpDown, Trash2Icon} from "lucide-react";
import {Heading} from "@/components/ui/heading";
import {AlertModal} from "@/components/modals/alert-modal";
import {toast} from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { DropdownItem, DropdownItemTranslation } from '@prisma/client';
import { DropdownItemFormProps } from './type';




interface formatedTranslation  {
    [language: string]: DropdownItemTranslation
}
export function formatTranslation(translations: DropdownItemTranslation[]): formatedTranslation {
    const result: formatedTranslation = {};

    translations.forEach((item) => {
        const { 
            id,
            name,
            lang,
            dropdownItemId,
            createdAt,
            updatedAt
        } = item;

        if (!result[lang]) {
            result[lang] = {
                id,
                name,
                lang,
                dropdownItemId,
                createdAt,
                updatedAt
            };
        }
    });

    return result

}

function convertToTranslationArray(translationObject: formatedTranslation): DropdownItemTranslation[] {
    const result: DropdownItemTranslation[] = [];

    for (const lang in translationObject) {
        if (translationObject.hasOwnProperty(lang)) {
            const { 
                id,
                name,
                dropdownItemId,
                createdAt,
                updatedAt
            } = translationObject[lang];

            result.push({
                id,
                name,
                lang,
                dropdownItemId,
                createdAt,
                updatedAt
            });
        }
    }

    return result;
}

type FormValues = {
    translations:formatedTranslation,
} & DropdownItem;


const DropdownItemForm = ({initialData , pages, dropdownGroups, navbarItems,articles}:DropdownItemFormProps) => {
    const { selectedLang } = useContext(LanguageContext);
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "dropdownItem"
    const head = {
        title: initialData ? initialData.translations.find(t => t.lang === selectedLang)?.name :t(`${name}.create.title`),
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
    const [type, setType] = useState(
            initialData?.forGroup ?"group" :
            initialData?.forPage ? "page" : "article"
        );
    

    const [isFormEmpty, setIsFormEmpty] = useState(false);
    const [languages , setLanguages] = useState<(any)[]>([])

    const form = useForm<FormValues>( initialData && {
        defaultValues: {
            translations : formatTranslation(initialData.translations),
            forArticle:initialData.forArticle,
            forPage:initialData.forPage,
            forGroup:initialData.forGroup,
            articleId:initialData.articleId,
            navItemId: initialData.navItemId,
            groupId: initialData.groupId,
            pageId: initialData.pageId,
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
    const AddsField = React.useMemo(() => {
        
        if (type === "page") {
                return <FormField
                    control={form.control}
                    name="pageId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>for Navbar</FormLabel>
                        <Select disabled={loading} onValueChange={field.onChange} value={field.value || ""} defaultValue={field.value || ""}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue defaultValue={field.value || ""} placeholder="Select a billboard" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {pages.map((d) => (
                                <SelectItem key={d.id} value={d.id}>{d.translations.find((t:any) => t.lang === selectedLang)?.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            
        }
        if (type === "article") { 
               return <FormField
                    control={form.control}
                    name="articleId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>for Navbar</FormLabel>
                        <Select disabled={loading} onValueChange={field.onChange} value={field.value || ""} defaultValue={field.value || ""}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue defaultValue={field.value  || ""} placeholder="Select a billboard" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {articles.map(({id , translations}) => (
                                <SelectItem key={id} value={id}>{translations.find((t:any) => t.lang === selectedLang)?.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            
                                }
        if (type === "group") {  
                return <>
                <FormField
                        control={form.control}
                        name={`groupId`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>for Navbar</FormLabel>
                            <Select disabled={loading} onValueChange={field.onChange} value={field.value || ""} defaultValue={field.value || ""}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue defaultValue={field.value || ""} placeholder="Select a billboard" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {dropdownGroups.map(({id , translations}) => (
                                    <SelectItem key={id} value={id}>{translations.find((t:any) => t.lang === selectedLang)?.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </>
            
                                                            }
    },[type, selectedLang, articles, form.control, loading, pages, dropdownGroups])

    const onSubmit = async () => {
        setLoading(true)
        let formData: any = {
            translations : convertToTranslationArray(form.getValues().translations),
        };
        if (type === "article") {
            formData["forGroup"] = false
            formData["forPage"] = false
            formData["forArticle"] = true
            formData["articleId"] = form.getValues().articleId
        }
        if (type === "page") {
            formData["forGroup"] = false
            formData["forPage"] = true
            formData["forArticle"] = false
            formData["pageId"] = form.getValues().pageId
        }
        if (type === "group") {
            formData["forGroup"] = true
            formData["forPage"] = false
            formData["forArticle"] = false
            formData["groupId"] = form.getValues().groupId
        }

        const isTranslationsEmpty = formData.translations.every((t:any) => {
            return (
                !t.name.trim()
            );
        });
        if (isTranslationsEmpty) {
            setIsFormEmpty(true);
            return;
        }
        setIsFormEmpty(false);
        if (initialData) {
            try {
                const response = await fetch(`/api/${name}/${initialData.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    let data = await response.json()
                    
                    initialData = formData
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
                                    </div>
                                );
                            })}
                            
                            
                            <FormItem>
                                <FormLabel>for Navbar</FormLabel>
                                <Select disabled={loading} onValueChange={(value) => setType(value)} value={type} defaultValue={type}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue defaultValue={type} placeholder="Select a billboard" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem key={"page"} value={"page"}>{t("page")}</SelectItem>
                                        <SelectItem key={"group"} value={"group"}>{t("group")}</SelectItem>
                                        <SelectItem key={"article"} value={"article"}>{t("article")}</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            
                            {AddsField}

                            <FormField
                    control={form.control}
                    name="navItemId"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>for Navbar</FormLabel>
                        <Select disabled={loading} onValueChange={field.onChange} value={field.value || ""} defaultValue={field.value || ""}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue defaultValue={field.value || ""} placeholder="Select a billboard" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {navbarItems.map(({id , translations}) => (
                                <SelectItem key={id} value={id}>{translations.find((t:any) => t.lang === selectedLang)?.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
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

export default DropdownItemForm;
