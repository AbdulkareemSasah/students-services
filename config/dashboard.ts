import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Users",
      items: [
        {
          title: "Users",
          href: "/dashboard/users",
          items: [],
        },
      ],
    },
    {
      title: "Site",
      items: [
        {
          title: "Global",
          href: "/dashboard/global",
          items: [],
        },
        
      ],
    },
    {
      title: "Blog",
      items: [
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
        }
      ],
    },
    {
      title: "Services",
      href: "/dashboard/services",
      items: [
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
    },
  ],
}
