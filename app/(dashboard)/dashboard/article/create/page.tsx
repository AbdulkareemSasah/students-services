import ItemForm from "../components/item-form";
import {getTags} from "@/actions/get-tags";
import {getCategories} from "@/actions/get-categories";


export default async function CreateCategoryPage() {
    const ts = await getTags()
    const cs = await getCategories()
    return (
        <><ItemForm categories={cs} tags={ts} /></>
    )
}