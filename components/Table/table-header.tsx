"use client"
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {useParams, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";

export function TableHeader({data,link,title,description} :
                                {
                                    data : (any)[],
                                    link:string,
                                    title:string,
                                    description?:string,
                                }) {
    const router = useRouter()
    const params = useParams()
    const {t} = useTranslation()
    return (
        <div className="flex items-center justify-between">
            <Heading title={title} description={description} />
            <Button onClick={() => router.push(`${link}`)}>
                <Plus className="mr-2 h-4 w-4" /> {t("Add New")}
            </Button>
        </div>
    )
}