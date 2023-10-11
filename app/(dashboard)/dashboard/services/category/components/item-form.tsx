"use client"
import React, {useContext, useEffect, useMemo, useState} from 'react';
import { useForm } from 'react-hook-form';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {z} from "zod"
import {LanguageContext} from "@/components/providers/language-provider";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useParams, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {format} from "date-fns";
import {Check, ChevronsUpDown, Trash2Icon} from "lucide-react";
import {Heading} from "@/components/ui/heading";
import {AlertModal} from "@/components/modals/alert-modal";
import {toast} from "react-hot-toast";
import {Checkbox} from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {getTags} from "@/actions/get-tags";
import { ItemType} from "@/actions/get-categories";
import {zodResolver} from "@hookform/resolvers/zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
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
    lang: string,
    name:string,
    author: {
        email: string
    },
    descriprion: string,
    blocks:Block[],
    published:boolean,
};

interface formatedTranslation  {
    [language: string]: {
        id?:string,
        name: string,
        published:boolean,
        descriprion: string,
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
        name: z.string(),
        published: z.boolean(),
        descriprion: z.string(),
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
            name,
            published,
            descriprion,
            lang,
            author,
            blocks
        } = item;

        if (!result[lang]) {
            result[lang] = {
                id,
                published,
                name,
                lang,
                descriprion,
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
                name,
                descriprion,
                author,
                blocks
            } = translationObject[lang];

            result.push({
                id,
                name,
                descriprion,
                lang,
                author,
                published,
                blocks
            });
        }
    }

    return result;
}

type FormValues = {
    translations: formatedTranslation
};

const FormValuesSchema = z.object({
    translations: formatedTranslationSchema,
});



interface CategoryFormProps {
    initialData?: {
        translations: any[]
    }
}
const ItemForm : React.FC<CategoryFormProps> = ({initialData}) => {
    const { selectedLang } = useContext(LanguageContext);
    const params = useParams()
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "categoryService"
    const head = {
        title: initialData ? initialData.translations.find(t => t.lang === selectedLang)?.name :t(`categoryService.create.title`),
        description : initialData ? initialData.translations.find(t => t.lang === selectedLang)?.description :t(`categoryService.create.description`),
    };
    const title = initialData ? t(`categoryService.edit.title`) :t(`categoryService.create.title`);
    const description = initialData ? t(`categoryService.edit.description`) :t(`categoryService.create.description`);
    const toastMessage = {
        success : initialData ? t(`categoryService.toast.update.success`) : t(`categoryService.toast.create.success`),
        error : initialData ? t(`categoryService.toast.update.error`) : t(`categoryService.toast.create.error`),
    };
    const action = initialData ? t('Save changes') : t('Create')
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState("");

    const [isFormEmpty, setIsFormEmpty] = useState(false);
    const [languages , setLanguages] = useState<(any)[]>([])
    const initialDataAfter = initialData && formatTranslation(initialData.translations)
    const defaultValues = initialData ? {
        translations: initialDataAfter,
    } : {
        translations: {
            ar: {
                published: false,
                name: "",
                lang: "ar",
                descriprion: "",
                author: {
                    email: ""
                },
                blocks: []
            },
            en: {
                published: false,
                name: "",
                lang: "en",
                descriprion: "",
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
    const { handleSubmit, formState: { errors } } = form
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
            };

        const isTranslationsEmpty = formData.translations.every((t) => {
            return (
                !t.name.trim()
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
                const response = await fetch(`/api/categoryService/${params?.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    router.push(`/dashboard/services/category/${params?.id}#view`)
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
                const response = await fetch(`/api/categoryService`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    form.reset()
                    router.push(`/dashboard/services/category`)
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
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/categoryService/${params?.id}`);
            router.refresh();
            router.push(`/dashboard/services/category`);
            toast.success(t(`categoryService.toast.delete.success`));
        } catch (error: any) {
            toast.error(t(`categoryService.toast.delete.error`));
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
                                            name={`translations.${l.language}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t(`categoryService.form.name.label`)}</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder={t("categoryService.form.name.placeholder")} {...field} />
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
                                            name={`translations.${l.language}.descriprion`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t(`categoryService.form.description.label`)}</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder={t(`categoryService.form.description.placeholder`)} {...field} />
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
                                                        {t(`categoryService.form.published.label`)}
                                                        </FormLabel>
                                                        <FormDescription>
                                                        {t(`categoryService.form.published.description`)}
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
                                                    <FormLabel>{t("categoryService.form.blocks.label")}</FormLabel>
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
