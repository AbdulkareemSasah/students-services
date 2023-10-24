import GlobalForm from "./components/global-form";
import { Button } from "@/components/dashboard/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/ui/card";
import prismadb from "@/lib/prisma";
import { Input } from "@/components/dashboard/ui/input";
import { Label } from "@/components/dashboard/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/dashboard/ui/tabs";
import NavbarClient from "./components/nav-client";
import DropDownItemClient from "./components/dropdown-item-client";
import DropDownGroupClient from "./components/dropdown-group-client";
import GroupFooterClient from "./components/footer-group-client";
import GetLanguages from "@/actions/get-languages";
export default async function GlobalPage() {
  const languages = await GetLanguages();
  const navbarItems =
    (await prismadb.navbarItem.findMany({
      include: {
        translations: true,
        dropdownGroups: true,
        dropdownItems: true,
      },
    })) || [];
  const pages =
    (await prismadb.page.findMany({
      include: {
        translations: true,
      },
    })) || [];
  const dropdownGroups =
    (await prismadb.dropDownGroup.findMany({
      include: {
        translations: true,
        dropdownItems: {
          include: {
            translations: true,
          },
        },
      },
    })) || [];
  const articles =
    (await prismadb.article.findMany({
      include: {
        translations: true,
      },
    })) || [];
  const dropdownItems =
    (await prismadb.dropdownItem.findMany({
      include: {
        translations: true,
      },
    })) || [];
  const groupFooters =
    (await prismadb.groupFooter.findMany({
      include: {
        translations: true,
        articles: true,
        pages: true,
      },
    })) || [];
  // (await (await fetch('/api/language')).json())
  let global: any =
    (await prismadb.global.findFirst({
      include: {
        translations: true,
      },
    })) || {};
  if (!global) {
    global = await prismadb.global.create({
      data: {
        translations: {
          create: languages.map((lang: any) => {
            return {
              language: {
                connect: {
                  id: lang.id,
                },
              },
            };
          }),
        },
      },
    });
  }

  return (
    <div className="space-y-9 container-xl">
      <Tabs defaultValue="edit">
        <TabsList className="flex flex-row gap-3">
          <TabsTrigger value="global" className={"p-2"}>
            global
          </TabsTrigger>
          <TabsTrigger value="navbar" className={"p-2"}>
            navbar
          </TabsTrigger>
          <TabsTrigger value="dropdownGroup" className={"p-2"}>
            Dropdown Group
          </TabsTrigger>
          <TabsTrigger value="dropdownItem" className={"p-2"}>
            Dropdown Item
          </TabsTrigger>
          <TabsTrigger value="footer" className={"p-2"}>
            Footer
          </TabsTrigger>
        </TabsList>
        <TabsContent id={"global"} value="global">
          <GlobalForm initialData={global} />
        </TabsContent>
        <TabsContent id={"navbar"} value="navbar" className="space-y-10">
          <NavbarClient
            navbarItems={navbarItems}
            pages={pages}
            dropdownGroups={dropdownGroups}
            articles={articles}
            dropdownItems={dropdownItems}
          />
        </TabsContent>
        <TabsContent
          id={"dropdownGroup"}
          value="dropdownGroup"
          className="space-y-10"
        >
          <DropDownGroupClient
            dropdownGroups={dropdownGroups}
            dropdownItems={dropdownItems}
            navbarItems={navbarItems}
          />
        </TabsContent>
        <TabsContent
          id={"dropdownItem"}
          value="dropdownItem"
          className="space-y-10"
        >
          <DropDownItemClient
            navbarItems={navbarItems}
            pages={pages}
            dropdownGroups={dropdownGroups}
            articles={articles}
            dropdownItems={dropdownItems}
          />
        </TabsContent>
        <TabsContent id={"footer"} value="footer" className="space-y-10">
          <GroupFooterClient
            articles={articles}
            pages={pages}
            groupFooters={groupFooters}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
