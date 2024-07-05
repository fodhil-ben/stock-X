import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { DataTable } from "@/Components/ProductsComponents/data-table"
import Pagination from '@/components/ui/pagination';
import { useState } from 'react';

export default function Index({auth, products, message, error}) {
    const [flashMsg, setFlashMsg] = useState(message);
    const [flashErr, setFlashErr] = useState(error);

    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);
    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">products</h2>}
        >
            <Head title="products" />
            {flashMsg && (
            <div className="bg-gray-500 py-2 px-4 rounded mb-4">
              {flashMsg}
            </div>
          )}
          {flashErr && (
            <div className="bg-gray-500 py-2 px-4 rounded mb-4">
              {flashErr}
            </div>
          )}
          {
            auth.permissions['create-product'] &&
        <Link
        href={route("products.create")}
        className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
        >
            Add new
          </Link>
          }

        <div>
            <div className='border-1 border-black '>
                <DataTable data={products.data}/>
            </div>
        </div>
        {(products.data.length > 0 && products.meta.from !== products.meta.last_page) && <Pagination links={products.meta.links}/>}
        </AuthenticatedLayout>
    );
}


