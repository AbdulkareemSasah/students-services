"use client"

import {TableHeader} from "@/components/Table/table-header";
import {useTranslation} from "react-i18next";

export function HeaderPage ({data}: {data:any}) {
    const {t} = useTranslation()
    return <TableHeader
        data={data}
        title={t("dashboard.tag.title")}
        description={t("dashboard.tag.description")}
        link={"/dashboard/tag/create"}
    />
}