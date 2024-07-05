
import {
  flexRender,
  getCoreRowModel,
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
import { Link, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"



export function DataTable({
  data,
}) {
    const {auth} = usePage().props
  
  const HandleDelete = (id)=>{
    router.delete(route('products.destroy', id))
  }
  
  let columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "category.name",
      header: "Category",
    },
  ]

  auth.permissions['delete-product'] && columns.push({
    accessorKey: "id",
    header: "Delete",
    cell: (row)=>(
      <Button className="z-50" onClick={()=>HandleDelete(row.getValue("id"))}>Delete</Button>
    )
  })  
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="" key={header.id}>
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
              className="hover:bg-gray-300"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    { cell.column.id !== 'id'  
                    ?<Link
                    className="w-full block"
                      href={route('products.show', row.original)}
                    >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Link>
                    : <> {flexRender(cell.column.columnDef.cell, cell.getContext())}</>
                    }
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
  )
}
