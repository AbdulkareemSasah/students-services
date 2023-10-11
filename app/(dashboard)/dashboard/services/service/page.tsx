import { DataTable } from "@/components/data-table"
import { getData } from "./components/data"
import { HeaderPage } from "./components/header"
import { columns, initial_columns_view } from "./components/columns"

export default async function ServicePage() {

    const data = await getData()
    return (
        <div className="container mx-auto py-10">
           
            <HeaderPage data={data}/>
            <DataTable
                columns={columns}
                data={data}
                defaultColumnSearch={"title"}
                initial_columns_view={initial_columns_view}
            />
        
        </div>
    )
}
