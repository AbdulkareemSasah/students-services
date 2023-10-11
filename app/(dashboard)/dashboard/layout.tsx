import {LanguageProvider} from "@/components/providers/language-provider";
import '@react-page/plugins-background/lib/index.css';
import '@react-page/plugins-html5-video/lib/index.css';
import '@react-page/plugins-spacer/lib/index.css';
import '@react-page/plugins-video/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import 'katex/dist/katex.min.css';
import {SidebarDashboard} from "@/components/sidebar-dashboard";
export default function DashboardLayout({children} : {children: React.ReactNode}) {
    return  (
        <LanguageProvider>
            {/*<div className="border-b">*/}
            {/*    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">*/}
            {/*        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">*/}
            {/*            <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">*/}
            {/*                <DocsSidebarNav items={docsConfig.sidebarNav} />*/}
            {/*            </ScrollArea>*/}
            {/*        </aside>*/}
            {/*        {children}*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="container pt-3 md:grid md:grid-cols-[16rem_minmax(0,1fr)]">
                <div className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)]  shrink-0 md:sticky md:block">
                    <SidebarDashboard />
                </div>
                {children}
            </div>
        </LanguageProvider>
    )
}