import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { DataTable } from "@/Components/CategoriesComponents/data-table"
import Pagination from '@/components/ui/pagination';
import { useState } from 'react';

export default function Index({auth, categories, message}) {
    const [flashMsg, setFlashMsg] = useState(message);

    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);
    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Categories" />
            {flashMsg && (
            <div className="bg-gray-500 py-2 px-4 rounded mb-4">
              {flashMsg}
            </div>
          )}
          {
          auth.permissions['create-category'] && 
        <Link
        href={route("categories.create")}
        className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
        >
            Add new
        </Link>
          }

        <div>
            <div className='border-1 border-black '>
                <DataTable data={categories.data}/>
            </div>
        </div>
        {(categories.data.length > 0 &&  categories.from !== categories.last_page) && <Pagination links={categories.links}/>}
        </AuthenticatedLayout>
    );
}


