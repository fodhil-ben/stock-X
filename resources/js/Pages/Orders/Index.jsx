import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { DataTable } from "@/Components/OrdersComponents/data-table"
import { columns } from "@/Components/OrdersComponents/columns"
import Pagination from '@/components/ui/pagination';
import { useState } from 'react';

export default function Index({auth, orders, message}) {
    const [flashMsg, setFlashMsg] = useState(message);
    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">orders</h2>}
        >
            <Head title="orders" />
            {flashMsg && (
            <div className="bg-gray-500 py-2 px-4 rounded mb-4">
              {flashMsg}
            </div>
          )}
        <Link
            href={route("orders.create")}
            className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
          >
            Add new
          </Link>

        <div>
            <div className='border-1 border-black '>
                <DataTable columns={columns} data={orders.data}/>
            </div>
        </div>
        {(orders.data.length > 0 && orders.meta.from !== orders.meta.last_page) && <Pagination links={orders.meta.links}/>}
        </AuthenticatedLayout>
    );
}


