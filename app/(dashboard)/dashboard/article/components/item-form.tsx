"use client"
import React, {useContext, useEffect, useMemo, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Input} from "@/components/dashboard/ui/input";
import {Button} from "@/components/dashboard/ui/button";
import axios from "axios";
import {z} from "zod"
import {LanguageContext} from "@/components/dashboard/providers/language-provider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/dashboard/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/dashboard/ui/form";
import {useParams, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import {Check, ChevronsUpDown, Trash2Icon} from "lucide-react";
import {Heading} from "@/components/dashboard/ui/heading";
import {AlertModal} from "@/components/dashboard/modals/alert-modal";
import {toast} from "react-hot-toast";
import {Checkbox} from "@/components/dashboard/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/dashboard/ui/select";
import {getTags} from "@/actions/get-tags";
import { ItemType} from "@/actions/get-categories";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/dashboard/ui/popover";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/dashboard/ui/command";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import DynamicForm from "@/components/blocks/dynamic";
type Block = {
    id?:string,
    type: string,
    content: string
}

type Translation = {
    id?:string,
    slug:string,
    lang: string,
    title:string,
    author: {
        email: string
    },
    description: string,
    blocks:Block[],
    published:boolean,
};

interface formatedTranslation  {
    [language: string]: {
        id?:string,
        slug:string,
        title: string,
        published:boolean,
        description: string,
        lang:string
        author: {
            email: string;
        },
        blocks : Block[],
    },

}
const BlockSchema = z.object({
    type: z.string(),
    content: z.string(),
});
const formatedTranslationSchema = z.record(
    z.object({
        slug: z.string(),
        title: z.string(),
        published: z.boolean(),
        description: z.string(),
        lang: z.string(),
        author: z.object({
            email: z.string(),
        }),
        blocks: z.array(BlockSchema), // تحتاج إلى تحديد مخطط للكتلة (Block)
    })
);

export function formatTranslation(translations: Translation[]): formatedTranslation {
    const result: formatedTranslation = {};

    translations.forEach((item) => {
        const {
            id,
            slug,
            title,
            published,
            description,
            lang,
            author,
            blocks
        } = item;

        if (!result[lang]) {
            result[lang] = {
                id,
                published,
                slug,
                title,
                lang,
                description,
                author,
                blocks,
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
                id,
                published,
                slug,
                title,
                description,
                author,
                blocks
            } = translationObject[lang];

            result.push({
                id,
                title,
                description,
                lang,
                author,
                slug,
                published,
                blocks
            });
        }
    }

    return result;
}

type FormValues = {
    tags: string[],
    categoryId: string,
    translations: formatedTranslation
};

const FormValuesSchema = z.object({
    tags: z.array(z.string()),
    categoryId: z.string(),
    translations: formatedTranslationSchema,
});



interface CategoryFormProps {
    initialData?: {
        tags:string[],
        categoryId:string,
        translations: any[]
    },
    tags:ItemType[],
    categories:ItemType[]
}
const ItemForm : React.FC<CategoryFormProps> = ({initialData, tags, categories}) => {
    const { selectedLang } = useContext(LanguageContext);
    const params = useParams()
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "article"
    const head = {
        title: initialData ? initialData.translations.find(t => t.lang === selectedLang)?.title :t(`article.create.title`),
        description : initialData ? initialData.translations.find(t => t.lang === selectedLang)?.description :t(`article.create.description`),
    };
    const title = initialData ? t(`article.edit.title`) :t(`article.create.title`);
    const description = initialData ? t(`article.edit.description`) :t(`article.create.description`);
    const toastMessage = {
        success : initialData ? t(`article.toast.update.success`) : t(`article.toast.create.success`),
        error : initialData ? t(`article.toast.update.error`) : t(`article.toast.create.error`),
    };
    const action = initialData ? t('Save changes') : t('Create')
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState("");

    const [isFormEmpty, setIsFormEmpty] = useState(false);
    const [languages , setLanguages] = useState<(any)[]>([])
    const initialDataAfter = initialData && formatTranslation(initialData.translations)
    const defaultValues = initialData ? {
        tags:initialData.tags,
        categoryId:initialData.categoryId,
        translations: initialDataAfter,
    } : {
        tags: [],
        categoryId: "",
        translations: {
            ar: {
                published: false,
                slug: "",
                title: "",
                lang: "ar",
                description: "",
                author: {
                    email: ""
                },
                blocks: []
            },
            en: {
                published: false,
                slug: "",
                title: "",
                lang: "en",
                description: "",
                author: {
                    email: ""
                },
                blocks: []
            }
        }
    }
    const form = useForm<FormValues>(  {
        resolver: zodResolver(FormValuesSchema),
        defaultValues
    });
    const { handleSubmit, register, formState: { errors } } = form
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

    const onSubmit = async () => {
        setLoading(true)
        const formData = {
            translations : convertToTranslationArray(form.getValues().translations),
            tags:form.getValues().tags,
            categoryId:form.getValues().categoryId
            };

        const isTranslationsEmpty = formData.translations.every((t) => {
            return (
                !t.title.trim()
            );
        });
        if (isTranslationsEmpty) {
            setIsFormEmpty(true);
            setLoading(false)
            return;
        }
        
        setIsFormEmpty(false);
        if (initialData) {
            try {
                const response = await fetch(`/api/article/${params?.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    router.push(`/dashboard/article/${params?.id}#view`)
                    toast.success(toastMessage.success);
                } else {
                    setLoading(false)
                    console.error('Failed to submit data');
                    toast.error(toastMessage.error);

                }
            } catch (error) {
                console.error('Error submitting data', error);
                toast.error(toastMessage.error);
                setLoading(false)
            } finally {
                setLoading(false);
            }

        }else  {
            try {
                const response = await fetch(`/api/article`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    form.reset()
                    router.push(`/dashboard/article`)
                    toast.success(toastMessage.success);
                } else {
                    setLoading(false)
                    console.error('Failed to submit data');
                    toast.error(toastMessage.error);
                }
            } catch (error) {
                setLoading(false)
                console.error('Error submitting data', error);
                toast.error(toastMessage.error);
            } finally {
                setLoading(false);
            }
        }

    };
    async function generateNewTagId({name}: {name:string}) {
        console.log(name)
        try {
            setLoading(true)
            const response = await fetch('/api/tag', {
                method: 'POST',
                body: JSON.stringify({name:name}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                form.reset()
                setLoading(false)
                let res = await response.json()
                toast.success(t("tag.toast.create.success"));
                return res.id
            } else {
                setLoading(false)
                console.error('Failed to submit data');
                toast.error(t("tag.toast.create.error"));
                return undefined
            }
        } catch (err) {
            console.error(err)
            return undefined
        }

    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/article/${params?.id}`);
            router.refresh();
            router.push(`/dashboard/article`);
            toast.success(t(`article.toast.delete.success`));
        } catch (error: any) {
            toast.error(t(`article.toast.delete.error`));
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    // const Editor = useMemo(() => {
    //     setData(form.getValues(`translations.${selectedLang}.blocks`)[0].content)
    //     return
    // },[selectedLang])
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
                                        <FormField
                                            control={form.control}
                                            name={`translations.${l.language}.title`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t(`article.form.title.label`)}</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder={t("article.form.title.placeholder")} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`translations.${l.language}.lang`}
                                            render={({ field }) => (
                                                <FormItem hidden={true}>
                                                    <FormControl>
                                                        <Input disabled={loading} {...field} value={l.language}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`translations.${l.language}.description`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t(`article.form.description.label`)}</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder={t(`article.form.description.placeholder`)} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`translations.${l.language}.slug`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t(`article.form.slug.label`)}</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder={t(`article.form.slug.placeholder`)} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`translations.${l.language}.published`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            // @ts-ignore
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none px-3">
                                                        <FormLabel>
                                                        {t(`article.form.published.label`)}
                                                        </FormLabel>
                                                        <FormDescription>
                                                        {t(`article.form.published.description`)}
                                                        </FormDescription>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <FormField
                                            control={form.control}
                                            name={`translations.${l.language}.blocks`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("article.form.blocks.label")}</FormLabel>
                                                    <DynamicForm
                                                        field={field}
                                                        loading={loading}
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                );
                            })}
                            <FormField
                                            control={form.control}
                                            name={`tags`}
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col">
                                                    <FormLabel>{t(`article.form.tags.label`)}</FormLabel>
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
                                                                    placeholder={t(`article.form.tag.search.placeholder`)}
                                                                    onKeyDown={async (event) => {
                                                                        if (event.key === 'Enter') {
                                                                            // @ts-ignore
                                                                            const inputValue = event.target?.value;
                                                                            const matchingTag = tags.find(
                                                                                (t) => t[selectedLang].name.toLowerCase() === inputValue.toLowerCase()
                                                                            );

                                                                            if (matchingTag) {
                                                                                const selectedIds = Array.isArray(field.value) ? field.value : [];
                                                                                form.setValue(`tags`, [...selectedIds, matchingTag[selectedLang].id]);
                                                                            } else {
                                                                                const newTagId = await generateNewTagId({name : inputValue})
                                                                                if (newTagId) {
                                                                                    const selectedIds = Array.isArray(field.value) ? field.value : [];
                                                                                    form.setValue(`tags`, [...selectedIds, newTagId]);
                                                                                }
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                                <CommandEmpty>{t("article.form.tag.empty")}</CommandEmpty>
                                                                <CommandGroup>
                                                                    {tags.map((t) => (
                                                                        <CommandItem
                                                                            value={t[selectedLang].id}
                                                                            key={t[selectedLang].id}
                                                                            onSelect={() => {
                                                                                const selectedIds = Array.isArray(field.value) ? field.value : [];
                                                                                form.setValue(`tags`, [...selectedIds, t[selectedLang].id]);
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    Array.isArray(field.value) && field.value.includes(t[selectedLang].id)
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {t[selectedLang].name}
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormDescription>
                                                        {t("article.form.tag.description")}
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`categoryId`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t("article.form.category.label")}</FormLabel>
                                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className='w-fit min-w-[8em]'>
                                                                <SelectValue defaultValue={field.value} placeholder={t("article.form.category.placeholder")} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className='w-fit min-w-[8em]'>
                                                            {categories.map((color) => (
                                                                <SelectItem key={color[selectedLang]?.id} value={color[selectedLang]?.id}>{color[selectedLang]?.name}</SelectItem>
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

export default ItemForm;
