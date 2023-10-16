"use client"

import { Checkbox } from "@/components/dashboard/ui/checkbox"
import {ColumnDef, VisibilityState} from "@tanstack/react-table"
import {DataTableColumnHeader} from "@/components/dashboard/Table/column-header";
import {CellAction} from "./cell-action";
import {CellView} from "@/components/dashboard/Table/cell-view";

export let initial_columns_view:VisibilityState = {
    id:false,
    lang:true,
    title: true,
    tags:true,
    category:true,
    description:true,
    author:false,
    updatedAt:true,
    createdAt:false,
}
export type ItemType = {
    id: string,
    translations:{
        id:string,
        lang: string,
        title:string,
        author: {
            email: string
        },
        description: string,
        createdAt: Date,
        updatedAt: Date
    }[],
    createdAt: Date,
    updatedAt: Date,
    tags: (any)[],
    category:any
}


export const columns: ColumnDef<ItemType>[] = [
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
        accessorKey: "title",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"title"} />,
        cell: ({ row }) =>  <CellView translations={row.original.translations} content={"title"} types={"string"}/>
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
        accessorKey: "tags",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"tags"} />,
        cell: ({ row }) => <CellView translations={row.original.tags} content={"name"} types={"list"} link={"tag"} />
    },
    {
        accessorKey: "category",
        header: ({ column }) => <DataTableColumnHeader column={column} title={"Category"} />,
        cell: ({ row }) => <CellView translations={row.original.category.translations} content={"name"} types={"string"}/>
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
