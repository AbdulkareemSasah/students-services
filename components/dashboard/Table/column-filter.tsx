import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/dashboard/ui/select"
import {Table} from "@tanstack/react-table";

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>,
    onValueChange: (value:string) => void
}
export function DataTableColumnOptions<TData>({
                                      table,
                                      onValueChange
                                  }: DataTableViewOptionsProps<TData>) {
    return (
        <Select  onValueChange={(value) => onValueChange(value)} defaultValue={"name"}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <SelectItem key={column.id} value={column.id}>{column.id}</SelectItem>
                        )
                        })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
