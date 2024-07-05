
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
import { Link, usePage } from "@inertiajs/react"


import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"

const HandleDelete = (id)=>{
  router.delete(route('categories.destroy', id))
}

export function DataTable({
  data,
}) {
  const { auth } = usePage().props
  
  let columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ]
 
  auth.permissions['delete-category'] && columns.push({
    accessorKey: "id",
    header: "Delete",
    cell: (row)=>(
      <Button className="z-50" onClick={()=>HandleDelete(row.getValue("id"))}>Delete
      </Button>
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
                      href={route('categories.show', row.original)}
                    >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Link>
                    : <> {auth.permissions['delete-category'] && flexRender(cell.column.columnDef.cell, cell.getContext())}</>
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
