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
            <div className="supports-backdrop-blur:bg-background/80 bg-background backdrop-blur">
                    <div className="supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
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
                    </div>
            </div>      
        </>
    )
}
