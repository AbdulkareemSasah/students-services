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
import {RefreshCcwIcon, Trash2Icon} from "lucide-react";
import {Heading} from "@/components/dashboard/ui/heading";
import {AlertModal} from "@/components/dashboard/modals/alert-modal";
import {toast} from "react-hot-toast";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    label: z.string().min(1),
    language: z.string().min(2),
  });
type FormValues = {
    id?: string,
    label: string,
    language: string
};

interface LanguageFormProps {
    initialData?: FormValues
}

const LanguageForm = ({initialData }:LanguageFormProps) => {
    const { selectedLang } = useContext(LanguageContext);
    const {i18n,t} = useTranslation()
    const router = useRouter()
    const name = "language"
    const head = {
        title: initialData ? initialData.label :t(`${name}.create.title`),
    };
    const title = initialData ? t(`${name}.edit.title`) :t(`${name}.create.title`);
    const toastMessage = {
        success : initialData ? t(`${name}.toast.update.success`) : t(`${name}.toast.create.success`),
        error : initialData ? t(`${name}.toast.update.error`) : t(`${name}.toast.create.error`),
    };
    const action = initialData ? t('Save changes') : t('Create')
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const defaultData = initialData || {
        label : "",
        language: ""
    }
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultData
    });
    const { handleSubmit, register, formState: { errors } } = form

    const onSubmit = async () => {
        setLoading(true)
        const formData = form.getValues()
        
        if (initialData) {
            try {
                const response = await fetch(`/api/language`, {
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
                const response = await fetch(`/api/language`, {
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
        <div className="flex mt-52 flex-row justify-center items-center align-middle">
            <div className="h-[100px] bg-slate-400"></div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader className='flex flex-row justify-between w-80'>
                            <CardTitle className={"text-2xl"}>{title}</CardTitle>
                            <Button size={"sm"} variant={'outline'} onClick={() => window.location.reload()}><RefreshCcwIcon/></Button>
                        </CardHeader>
                        <CardContent className='w-80'>
                                <FormItem>
                                    <FormLabel>{t(`${name}.form.label`)}</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...register(`label`)} />
                                    </FormControl>
                                    {errors.label && <p>{errors.label?.message}</p>}
                                </FormItem>
                                <FormItem>
                                    <FormLabel>{t(`${name}.form.language`)}</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} {...register(`language`)} />
                                    </FormControl>
                                    {errors.language && <p>{errors.language.message}</p>}
                                </FormItem>
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

export default LanguageForm;
