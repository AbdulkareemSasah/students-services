"use client"
import Link from "next/link";
import {CardDescription , CardTitle} from "@/components/dashboard/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/dashboard/ui/avatar";
import {SelectLanguage} from "@/components/selectLanguage";
import {ScrollArea} from "@/components/dashboard/ui/scroll-area";
import {useTranslation} from "react-i18next";
import {useSession} from "next-auth/react";
import {DashboardSidebarNav} from "@/components/sidebar-nav";
import {dashboardConfig} from "@/config/dashboard";
import {cn} from "@/lib/utils";
export function SidebarDashboard() {
    const {data:session} = useSession()
    const {t , i18n} = useTranslation()

    return <ScrollArea className={cn("h-full py-6 pl-8 pr-6 lg:py-8")}>
            <div dir={i18n.language === "ar" ? "rtl":"ltr"}>
            <div className={cn("py-2")}>
                <Link
                    href={"/dashboard"}
                    className={cn("text-2xl font-bold")}
                >
                    {t("Dashboard")}
                </Link>
            </div>
            <div className={cn("py-1")}>
                <div className={cn("p-2")}>
                    <div className={cn("flex flex-row gap-2")}>
                        <Avatar className={cn("m-0")}>
                            <AvatarImage src={session?.user?.image || "/vercel.svg"}/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div dir={i18n.language === "ar" ? "rtl":"ltr"}>
                            <CardTitle>{session?.user?.email}</CardTitle>
                            <CardDescription>{session?.user?.name}</CardDescription>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cn("p-1 my-2")}>
                <div dir={i18n.language === "ar" ? "rtl":"ltr"} className={"py-3"}>
                    <CardTitle>{t("Language")}</CardTitle>
                </div>
                <div className={cn("p-1")}>
                    <SelectLanguage/>
                </div>
            </div>
        </div>
        <DashboardSidebarNav items={dashboardConfig.sidebarNav} />
    </ScrollArea>

}