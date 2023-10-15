import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/providers"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Toaster  } from "@/components/ui/toaster"
import {Toaster as HotToaster} from "react-hot-toast";
import "public/registry/themes.css"
import Providers from "@/app/providers";
import * as React from "react";



interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <Providers>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                                {children}
                </ThemeProvider>
                <ThemeSwitcher />
                <Analytics />
                <Toaster />
            </Providers>
        </>
    )
}
