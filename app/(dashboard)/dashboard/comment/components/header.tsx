"use client"

import {TableHeader} from "@/components/dashboard/Table/table-header";
import {useTranslation} from "react-i18next";

export function HeaderPage ({data}: {data:any}) {
    const {t} = useTranslation()
    return <TableHeader
        data={data}
        title={t("dashboard.comment.title")}
        description={t("dashboard.comment.description")}
        link={"/dashboard/comment/category/create"}
        showAddButton={false}
    />
}