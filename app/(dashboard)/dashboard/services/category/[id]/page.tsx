import ItemForm from "../components/item-form";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { getTags } from "@/actions/get-tags";
import { getCategories } from "@/actions/get-categories";



const CategoryServicePage = async ({params}: {params: { id: string }}) => {
    const categoryService = await prisma.categoryService.findUnique({
        where: {
            id: params.id
        },
        select: {
            id: true,
            translations:{
                select: {
                    id:true,
                    lang: true,
                    name:true,
                    published:true,
                    blocks:{
                        select:{
                            id:true,
                            type:true,
                            content:true
                        }
                    },
                    descriprion: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    });

    let initialData = {
        translations: categoryService?.translations
    }

    return (

        <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-fit  mx-auto grid-cols-2">
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
                {/* @ts-ignore */}
                <ItemForm initialData={initialData} />
            </TabsContent>
        </Tabs>
    )
}

export default CategoryServicePage