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


export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "Server Components",
        "Radix UI",
    ],
    authors: [
        {
            name: "shadcn",
            url: "https://shadcn.com",
        },
    ],
    creator: "shadcn",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@shadcn",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: `${siteConfig.url}/site.webmanifest`,
}

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
                    <div className="supports-backdrop-blur:bg-background/80 bg-background backdrop-blur">
                            <div className="supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
                                <SiteHeader />
                                {children}
                                <HotToaster
                                    position="bottom-center"
                                    toastOptions={{
                                        // Define default options
                                        className: '',
                                        duration: 5000,
                                        style: {
                                            background: '#363636',
                                            color: '#fff',
                                        }
                                    }}
                                />
                                <TailwindIndicator />
                            </div>
                    </div>
                </ThemeProvider>
                <ThemeSwitcher />
                <Analytics />
                <Toaster />
            </Providers>
        </>
    )
}
