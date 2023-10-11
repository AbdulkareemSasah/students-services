"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {DataTableViewOptions} from "@/components/Table/column-toggle";
import {DataTablePagination} from "@/components/Table/pagination";
import {DataTableColumnOptions} from "@/components/Table/column-filter";
import {useContext} from "react";
import {LanguageContext} from "@/components/providers/language-provider";
import {useTranslation} from "react-i18next";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[] | any,
    defaultColumnSearch:string,
    initial_columns_view? : VisibilityState
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             defaultColumnSearch,
                                            initial_columns_view
                                         }: DataTableProps<TData, TValue>) {
    const {t} =useTranslation()
    const { selectedLang } = useContext(LanguageContext);
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnSearch, setColumnSearch] = React.useState(defaultColumnSearch)
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>(initial_columns_view || {})
    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
    })

    const searchInput = React.useMemo(() => {
        return <Input
            placeholder={t(`Search with`)+` ${t(columnSearch)}...`}
            value={(table.getColumn(columnSearch)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn(columnSearch)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
    },[columnSearch, table, t])
    const columnOption = React.useMemo(() => (
        <DataTableColumnOptions table={table} onValueChange={setColumnSearch} />
    ),[table])
    const viewOptions = React.useMemo(()=>(
        <DataTableViewOptions table={table} />
    ), [ table])

    return (
        <>
            <div className="flex w-full justify-between py-4 gap-3">
                <div className="flex gap-2">
                    {searchInput}
                    {columnOption}
                </div>
                <div className="flex">
                    {viewOptions}
                </div>
            </div>
            <div className="rounded-md border">
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (

                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>

                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </>
    )
}
