import {LanguageProvider} from "@/components/dashboard/providers/language-provider";
import { SiteHeader } from "@/components/dashboard/navbar";
import prismadb from "@/lib/prisma";
import LanguageForm from "./components/language-form";
export default async function DashboardLayout({children} : {children: React.ReactNode}) {
    const languages = await prismadb.language.findMany()
    if (languages.length === 0) {
        return (
                <LanguageForm />
        )
    }
    return  (
        <LanguageProvider>
            <SiteHeader/>
            <div className="container min-h-[100vh] supports-backdrop-blur:bg-background/50 bg-background/75 backdrop-blur">
                {children}
            </div>
        </LanguageProvider>
    )
}