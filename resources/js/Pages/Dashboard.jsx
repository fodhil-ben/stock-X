import Card from '@/Components/DashboardComponents/Card';
import { columns } from '@/Components/DashboardComponents/columns';
import { DataTable } from '@/Components/DashboardComponents/data-table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, orders, today_orders, total_products, today_income }) {
    const cardValues = [
        {title: "today orders", value: today_orders},
        {title: "today income", value: today_income},
        {title: "products in stock", value: total_products},
        , 
    ]

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className='grid gap-10 rounded-2xl'>
                <div className="py-10 bg-gray-200 rounded-3xl flex justify-evenly">
                    
                    {
                        cardValues.map((card, i)=>(
                            <Card key={i} card={card}/>
                        ))
                    }
                </div>
                <div>
                    <h1 className='text-xl pb-5 font-bold'>
                    Recent Orders:
                    </h1>
                    <DataTable columns={columns} data={orders.data}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
