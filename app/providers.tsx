"use client";

import * as React from "react";
import { fontSans } from "@/lib/fonts"
import { SessionProvider  } from 'next-auth/react';
import type {Session} from "next-auth";
import {I18nextProvider, useTranslation} from 'react-i18next'
import i18next from "@/i18n.config";
import {ThemeWrapper} from "@/components/theme-wrapper";
import {useConfig} from "@/hooks/use-config";


export default function Providers({children,session} : {
    children: React.ReactNode,
    session?:Session | null
}) {
    const [config, setConfig] = useConfig()
    const {i18n } = useTranslation()
    return (
            <html lang={i18n.language as string} dir={i18n.language === "ar" ? 'rtl' : "ltr"} suppressHydrationWarning>
                <body>
                <I18nextProvider i18n={i18next}>
                    <SessionProvider session={session}>
                        <ThemeWrapper defaultTheme={config.theme}>
                            {children}
                        </ThemeWrapper>
                    </SessionProvider>
                </I18nextProvider>
                </body>
            </html>
    )
}