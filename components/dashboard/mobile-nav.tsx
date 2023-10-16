"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { ViewVerticalIcon } from "@radix-ui/react-icons"


import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/dashboard/ui/button"
import { ScrollArea } from "@/components/dashboard/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/dashboard/ui/sheet"
import {useSession} from "next-auth/react";
import {dashboardConfig} from "@/config/dashboard";
import {useTranslation} from "react-i18next";

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const {data:session , status} = useSession()
  const {i18n} = useTranslation()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="rtl:ml-2 ltr:mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <ViewVerticalIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={i18n.language === "ar"? "right" : "left"} className={i18n.language === "ar"? "pl-0" : "pr-0"}>
        <MobileLink
          href="/"
          className="flex items-center justify-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="rtl:ml-2 ltr:mr-2 h-4 w-4" />
          <span className="font-bold">{dashboardConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 rtl:pr-6 ltr:pl-6">
          {/* {status === "authenticated" ? */}
          {true?
              <div className="flex flex-col space-y-2">
                {dashboardConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className={"rtl:text-end"}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
              </div>
              : ""}

        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
