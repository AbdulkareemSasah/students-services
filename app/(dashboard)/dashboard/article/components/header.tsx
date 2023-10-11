"use client"

import {TableHeader} from "@/components/Table/table-header";
import {useTranslation} from "react-i18next";

export function HeaderPage ({data}: {data:any}) {
    const {t} = useTranslation()
    return <TableHeader
        data={data}
        title={t("dashboard.article.title")}
        description={t("dashboard.article.description")}
        link={"/dashboard/article/create"}
    />
}