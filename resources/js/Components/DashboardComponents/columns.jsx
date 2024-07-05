import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"

const HandleDelete = (id)=>{
  router.delete(route('orders.destroy', id))
}

export const columns = [
  {
    accessorKey: "worker_id",
    header: "Worker",
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    accessorKey: "id",
    header: "Delete",
    cell: (row)=>(
      <Button className="z-50" onClick={()=>HandleDelete(row.getValue("id"))}>Delete</Button>
    )
  }
]




