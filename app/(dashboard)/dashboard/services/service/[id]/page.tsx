import ItemForm from "../components/item-form";
import prisma from "@/lib/prisma";
import { Button } from "@/components/dashboard/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/dashboard/ui/card"
import { Input } from "@/components/dashboard/ui/input"
import { Label } from "@/components/dashboard/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/dashboard/ui/tabs"
import { getCategoriesService } from "@/actions/get-categories-service";



const ServicePage = async ({params}: {params: { id: string }}) => {
    const cs = await getCategoriesService()
    const article = await prisma.service.findUnique({
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
                    blocks:{
                        select:{
                            id:true,
                            type:true,
                            content:true
                        }
                    },
                    description: true,
                    createdAt: true,
                    updatedAt: true
                }
            },
            createdAt: true,
            updatedAt: true,
            categoryId:true
        }
    });

    let initialData = {
        categoryServiceId : article?.categoryId,
        translations: article?.translations
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
                <ItemForm categoriesService={cs} initialData={initialData} />
            </TabsContent>
        </Tabs>
    )
}

export default ServicePage