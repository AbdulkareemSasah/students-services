"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="ltr:mr-4 rtl:ml-4 hidden lg:flex">
      <Link href="/" className="ltr:mr-6 rtl:ml-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6 ltr:mr-3 rtl:ml-3" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-5 text-sm font-medium">
        {siteConfig.mainNav.map(item => (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "transition-colors w-full  hover:text-foreground/80",
                    pathname === item.href? "text-foreground" : "text-foreground/60"
                )}
            >
              {item.title}
            </Link>
        ))}
      </nav>
    </div>
  )
}
