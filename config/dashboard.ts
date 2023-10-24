import { MainNavItem, SidebarNavItem } from "@/types/nav"



export const dashboardConfig = {
  name: "Student Service",
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
      title: "Users",
      href: "/dashboard/users",
      items: [],
    },
    {
      title: "Global",
      href: "/dashboard/global",
      items: []
    },

    {
      title: "Page",
      href: "/dashboard/page",
      items: [],
    },
    {
      title: "Category",
      href: "/dashboard/category",
      items: [],
    },
    {
      title: "Tag",
      href: "/dashboard/tag",
      items: [],
    },
    {
      title: "Article",
      href: "/dashboard/article",
      items: [],
    },
    {
      title: "Comment",
      href: "/dashboard/comment",
      items: [],
    },
    {
      title: "Category",
      href: "/dashboard/services/category",
      items: [],
    },
    {
      title: "Service",
      href: "/dashboard/services/service",
      items: [],
    },

  ],
}


export type dashboardConfig = typeof dashboardConfig