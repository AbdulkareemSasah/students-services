"use client"
import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Input} from "@/components/dashboard/ui/input";
import {Button} from "@/components/dashboard/ui/button";
import axios from "axios";
import {LanguageContext} from "@/components/dashboard/providers/language-provider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/dashboard/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/dashboard/ui/form";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import {Check, ChevronsUpDown, Trash2Icon} from "lucide-react";
import {Heading} from "@/components/dashboard/ui/heading";
import {AlertModal} from "@/components/dashboard/modals/alert-modal";
import {toast} from "react-hot-toast";
import { DropDownGroup, DropDownGroupTranslation, DropdownItem } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/dashboard/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/dashboard/ui/popover';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/dashboard/ui/command';

interface formatedTranslation  {
    [language: string]: DropDownGroupTranslation
}
export function formatTranslation(translations: DropDownGroupTranslation[]): formatedTranslation {
    const result: formatedTranslation = {};

    translations.forEach((item) => {
        const { 
            id,
            name,
            lang,
            dropdownGroupId,
            createdAt,
            updatedAt
        } = item;

        if (!result[lang]) {
            result[lang] = {
                name,
                lang,
                dropdownGroupId,
                id,
                createdAt,
                updatedAt
            };
        }
    });

    return result

}

function convertToTranslationArray(translationObject: formatedTranslation): DropDownGroupTranslation[] {
    const result: DropDownGroupTranslation[] = [];

    for (const lang in translationObject) {
        if (translationObject.hasOwnProperty(lang)) {
            const { 
                name,
                dropdownGroupId,
                id,
                createdAt,
                updatedAt
            } = translationObject[lang];

            result.push({
                name,
                lang,
                dropdownGroupId,
                id,
                createdAt,
                updatedAt
            });
        }
    }

    return result;
}

type FormValues = {
    translations:formatedTranslation,
    dropdownItems : DropdownItem[],
} & DropDownGroup


interface DropdownGroupFormProps {
    initialData?: {
        translations:DropDownGroupTranslation[],
        dropdownItems : DropdownItem[],
    } & DropDownGroup,
    dropdownItems:any[],
    navbarItems:any[],
}
const DropdownGroupForm = ({initialData , dropdownItems, navbarItems}:DropdownGroupFormProps) => {
    const { selectedLang } = useContext(LanguageContext);
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "dropdownGroup"
    const head = {
        title: initialData ? initialData.translations.find((t:any) => t.lang === selectedLang)?.name :t(`${name}.create.title`),
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
            translations : formatTranslation(initialData.translations),
            dropdownItems : initialData.dropdownItems,
            id: initialData.id,
            navItemId:initialData.navItemId,   
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
        let formData:any = form.getValues()
        formData["translations"] =  convertToTranslationArray(form.getValues().translations)
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
                                            
                                        </FormItem>
                                        <FormItem hidden={true}>
                                            <FormControl>
                                                <Input disabled={loading} {...register(`translations.${l.language}.lang`)} hidden={true} value={l.language}/>
                                            </FormControl>
                                        </FormItem>
                                    </div>
                                );
                            })}
                            
                

                            <FormField
                                control={form.control}
                                name="navItemId"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Navbar Item</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value || ""} defaultValue={field.value || ""}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value || ""} placeholder="Select a billboard" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {navbarItems.map(({id , translations}) => (
                                            <SelectItem key={id} value={id}>{translations.find((t:any) => t.lang === selectedLang).name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                                 <FormField
                        control={form.control}
                        name={`dropdownItems`}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>{t(`navItem.form.tags.label`)}</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[200px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? field.value.length + " Selected"
                                                    : "Select language"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder={t(`navItem.form.tag.search.placeholder`)}
    
                                            />
                                            <CommandEmpty>{t("navItem.form.tag.empty")}</CommandEmpty>
                                            <CommandGroup>
                                                {dropdownItems.map((d) => (
                                                    <CommandItem
                                                        value={d.id}
                                                        key={d.id}
                                                        onSelect={() => {
                                                            const selectedIds = Array.isArray(field.value) ? field.value : [];
                                                            form.setValue(`dropdownItems`, [...selectedIds, d.id]);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                Array.isArray(field.value) && field.value.includes(d.id)
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    {d.translations.find((e:any) => e.lang === selectedLang).name}

                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    {t("navItem.form.tag.description")}
                                </FormDescription>
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

export default DropdownGroupForm;
