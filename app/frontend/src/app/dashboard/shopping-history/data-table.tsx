"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  //for column sorting
  const [sorting, setSorting] = React.useState<SortingState>([]);
  //set the visibilty of the column
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  //search by the item name
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  //select function
  const [rowSelection, setRowSelection] = React.useState({});
  const [cart, setCart] = React.useState<TData[]>([]); // State for cart items

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
      rowSelection,
    },
  });

  // Function to add selected items to the cart
  const addSelectedItemsToCart = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedItems = selectedRows.map((row) => row.original);
    setCart(selectedItems);
    
    console.log("Cart Items:", [...cart, ...selectedItems]);
  };

  return (
    <div className="px-4">
      <div className="flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Purchase history
        </h1>
      </div>
      <div className="flex items-center py-4 space-x-3 justify-end">
        <Input
          placeholder="Filter Item Name..."
          value={
            (table.getColumn("itemName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("itemName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              show/hide
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* add selected item to shop list */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Add {table.getFilteredSelectedRowModel().rows.length} to Cart{" "}
              <ShoppingCart />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Item in cart</h4>
                <p className="text-sm text-muted-foreground">
                  All the items you selected.
                </p>
                {table.getFilteredSelectedRowModel().rows.length > 0 ? (
             
             table.getFilteredSelectedRowModel().rows.map((row) => (
                <ul
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="max-h-64 overflow-y-auto"
                >
                  {row.getVisibleCells().map((cell) => (
                    <li key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}

                    </li>
                  ))}
                </ul>
              ))
              
            ) : (
              <p>No items selected.</p>
            )}
            <Button disabled={table.getFilteredSelectedRowModel().rows.length ===0} onClick={addSelectedItemsToCart}>Add to shopping list</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#A1EEBD]/50">
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white/50">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
