"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {ColumnDef, VisibilityState} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/Table/column-header";
import {CellAction} from "./cell-action";
import {CellView} from "@/components/Table/cell-view";

export let initial_columns_view:VisibilityState = {
    lang:true,
    name: true,
    description:true,
    updatedAt:true,
    createdAt:false,
    id:false,
    author:false
}
export type Category = {
    id: string,
    translations:{
        id:string,
        lang: string,
        name:string,
        author: {
            email: string
        },
        description: string,
        createdAt: Date,
        updatedAt: Date
    }[],
    createdAt: Date,
    updatedAt: Date
}


export const columns: ColumnDef<Category>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className={"m-auto"}
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className={"flex justify-center rtl:mr-1 "}>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Id"} />,
    },
    {
        accessorKey: "lang",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Language"} />,
        cell: ({ row }) =>  <CellView translations={row.original.translations} content={"lang"} types={"string"}/>
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"name"} />,
        cell: ({ row }) =>  <CellView translations={row.original.translations} content={"name"} types={"string"}/>
    },
    {
        accessorKey: "author",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Author"} />,
        cell: ({ row }) =>  <CellView translations={row.original.translations} content={"author.email"} types={"string"}/>
    },
    {
        accessorKey: "description",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"description"} />,
        cell: ({ row }) => <CellView translations={row.original.translations} content={"description"} types={"string"}/>
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Created At"} />,
        cell: ({ row }) => <CellView translations={row.original.translations} content={"createdAt"} types={"date"}/>

    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Updated At"} />,
        cell: ({ row }) => <div className={"w-full text-center"}> <CellView translations={row.original.translations} content={"updatedAt"} types={"date"}/></div>
    },
    {
        id: "actions",
        header: ({ column }) => <div className={"w-full text-start"}><DataTableColumnHeader column={column} title={"actions"} /></div>,
        cell: ({ row }) => {
            const category = row.original
            return (
                <CellAction data={category}/>
            )
        },
    },

]
