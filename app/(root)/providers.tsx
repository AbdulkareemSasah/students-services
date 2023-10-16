"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Analytics } from '@vercel/analytics/react';
import GlobalProviders from "../providers";
export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
        <GlobalProviders>
            <NextUIProvider>
                <NextThemesProvider {...themeProps}>
                    {children}
                    <Analytics />
                </NextThemesProvider>
            </NextUIProvider>
        </GlobalProviders>
	);
}

