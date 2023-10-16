import { columns ,initial_columns_view } from "./components/columns"
import { DataTable } from "@/components/data-table"
import {TableHeader} from "@/components/dashboard/Table/table-header";
import {getData} from "./components/data";
import {HeaderPage} from "./components/header";



export default async  function CategoryServiceDemoPage() {
    const data = await getData()
    return (
        <div className="container mx-auto py-10">
            <HeaderPage data={data}/>
            <DataTable
                columns={columns}
                data={data}
                defaultColumnSearch={"name"}
                initial_columns_view={initial_columns_view}
            />
        </div>
    )
}
