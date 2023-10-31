import "@/styles/dashboard.css";
import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { Analytics } from "@/components/dashboard/analytics";
import { ThemeProvider } from "@/components/dashboard/providers";
import { ThemeSwitcher } from "@/components/dashboard/theme-switcher";
import { Toaster } from "react-hot-toast";
import { Toaster as ShadCNToaster } from "@/components/dashboard/ui/toaster";
import "public/registry/themes.css";
import GlobalProviders from "@/app/providers";
import * as React from "react";
import { ThemeWrapper } from "@/components/dashboard/theme-wrapper";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <GlobalProviders>
      <ThemeWrapper>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <ThemeSwitcher />
        <Analytics />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "dark:bg-black dark:text-slate-200 ",
            duration: 5000,
          }}
        />
        <ShadCNToaster />
      </ThemeWrapper>
    </GlobalProviders>
  );
}
