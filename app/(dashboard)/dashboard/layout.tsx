import {LanguageProvider} from "@/components/providers/language-provider";
import { SiteHeader } from "@/components/dashboard/navbar";
export default function DashboardLayout({children} : {children: React.ReactNode}) {
    return  (
        <LanguageProvider>
            <SiteHeader/>
            <div className="container min-h-[100vh] supports-backdrop-blur:bg-background/50 bg-background/75 backdrop-blur">
                {children}
            </div>
        </LanguageProvider>
    )
}