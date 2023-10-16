import prismadb from "@/lib/prisma"

const getSiteData =async () => {
  const global = await prismadb.global.findFirst({
    include: {
      socialLinks:true,
      translations:true,
    }
  })
  // const navitems = await prismadb.navbarItem.findMany({
  //   include :{
  //     dropdownGroups:{
  //       select: {
  //         translations: {
  //           include: {
  //             name:true
  //           }
  //         }
  //       }
  //     },
  //     dropdownItems:true,
  //     article:true,
  //     page:true,
  //     translations:true,
  //   }
  // })
}

export const siteConfig = {
  name: "shadcn/ui",
  url: "http://localhost:5777",
  ogImage: "http://localhost:5777/og.jpg",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Examples",
      href: "/examples",
    },
    {
      title: "Figma",
      href: "/docs/figma",
    },
    {
      title: "GitHub",
      href: "https://github.com/shadcn/ui",
      external: true,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/shadcn",
      external: true,
    },
  ],
}

export type SiteConfig = typeof siteConfig
