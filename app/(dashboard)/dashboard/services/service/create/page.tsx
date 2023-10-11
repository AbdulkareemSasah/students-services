import { getCategoriesService } from "@/actions/get-categories-service";
import ItemForm from "../components/item-form";


export default async function CreateServicePage() {
    const cs = await getCategoriesService()
    return (
        <><ItemForm categoriesService={cs} /></>
    )
}