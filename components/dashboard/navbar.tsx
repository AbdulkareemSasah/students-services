import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/dashboard/main-nav"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { buttonVariants } from "@/components/dashboard/ui/button"
import {ThemeCustomizer} from "@/components/theme-customizer";
import LanguageSwitcher from "@/components/lang-toggle";
import {Button} from "@/components/dashboard/ui/button";
import {Paintbrush} from "lucide-react";

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex  h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 lg:justify-end">
          <div className="w-9/12 flex-1 lg:w-auto lg:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex w-3/12 md:w-auto mx-1 gap-2 justify-center items-center">
                <ModeToggle />
                <Button size={"sm"} className={"rounded-full min-w-[40px]"}>
                    <ThemeCustomizer />
                </Button>
                <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  )
}
