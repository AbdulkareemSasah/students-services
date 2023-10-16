import GlobalForm from "./components/global-form";
import { Button } from "@/components/dashboard/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/dashboard/ui/card"
import prismadb from "@/lib/prisma";
import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/dashboard/ui/tabs"
import NavbarClient from "./components/nav-client";
import DropDownItemClient from "./components/dropdown-item-client";
import DropDownGroupClient from "./components/dropdown-group-client";
import GroupFooterClient from "./components/footer-group-client";
import GetLanguages from "@/actions/get-languages";
export default async function GlobalPage()  {
    const languages  = await GetLanguages()
    const navbarItems = await prismadb.navbarItem.findMany({
        include: {
            translations:true,
            dropdownGroups:true,
            dropdownItems:true,
        }
    }) || []
    const pages= await prismadb.page.findMany({
        include:{
            translations:true
        }
    }) || []
    const dropdownGroups= await prismadb.dropDownGroup.findMany({
        include:{
            translations:true,
            dropdownItems: {
                include : {
                    translations: true
                }
            }
        }
    }) || []
    const articles= await prismadb.article.findMany({
        include:{
            translations:true
        }
    }) || []
    const dropdownItems= await prismadb.dropdownItem.findMany({
        include:{
            translations:true,
        }
    }) || []
    const groupFooters = await prismadb.groupFooter.findMany({
        include: {
            translations:true,
            articles:true,
            pages:true
        }
    }) || []
    // (await (await fetch('/api/language')).json())
    let global :any= await prismadb.global.findFirst({
        include :{    
            translations: true
        }
    }) || {};
    if (!global) {
        global  = await prismadb.global.create({
            data: {
                translations:{
                    create: languages.map((lang:any) => {
                        return {
                            language: {
                                connect: {
                                    id: lang.id
                                }
                            }
                        }
                    })
                }
            }
        })
    }


    return (
        <div className="space-y-9 container-xl">

            <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full  mx-auto grid-cols-2">
                <TabsTrigger value="view" className={"px-5"}>View</TabsTrigger>
                <TabsTrigger value="edit" className={"px-5"}>Edit</TabsTrigger>
            </TabsList>
            <TabsContent id={"view"} value="view">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when you&apos;re done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="@peduarte" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save changes</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent id={"edit"}  value="edit">
                <GlobalForm initialData={global}/>
            </TabsContent>
            </Tabs>

            <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full  mx-auto grid-cols-2">
                <TabsTrigger value="view" className={"px-5"}>View</TabsTrigger>
                <TabsTrigger value="edit" className={"px-5"}>Edit</TabsTrigger>
            </TabsList>
            <TabsContent id={"edit"} value="edit" className="space-y-10">
                <NavbarClient
                    navbarItems={navbarItems}
                    pages={pages}
                    dropdownGroups={dropdownGroups}
                    articles={articles}
                    dropdownItems={dropdownItems} 

                />
                <DropDownGroupClient
                    dropdownGroups={dropdownGroups}
                    dropdownItems={dropdownItems}
                    navbarItems={navbarItems} 
                />
                <DropDownItemClient 
                    navbarItems={navbarItems}
                    pages={pages}
                    dropdownGroups={dropdownGroups}
                    articles={articles}
                    dropdownItems={dropdownItems}
                /> 
                <GroupFooterClient
                    articles={articles}
                    pages={pages}
                    groupFooters={groupFooters}
                />
            </TabsContent>
        </Tabs>
        </div>
    )
}