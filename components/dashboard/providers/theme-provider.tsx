"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"

import { TooltipProvider } from "@/components/dashboard/ui/tooltip"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return (
        <NextThemesProvider {...props}>
            <TooltipProvider>{children}</TooltipProvider>
        </NextThemesProvider>
    )
}
