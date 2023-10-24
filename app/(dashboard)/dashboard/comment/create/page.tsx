import prismadb from "@/lib/prisma";
import ItemForm from "../components/item-form";


export default async function CreateCommentPage() {
    const articles = await prismadb.article.findMany({
        select: {
            translations: {
                select: {
                    lang:true,
                    title: true
                }
            }
        }
    })
    return (
        <><ItemForm articles={articles} /></>
    )
}