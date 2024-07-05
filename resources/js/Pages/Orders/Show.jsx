import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, order }) {

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">order details</h2>}
        >
            <Head title='order' />
            <div className='flex justify-between px-10 pb-5'>

        <Link
            href={route("orders.edit", order.data)}
            className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
            >
            Edit order
          </Link>
              </div>

              <div className='bg-white shadow rounded-lg p-6'>
                <h3 className='text-lg font-medium text-gray-900'>Order Summary</h3>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>ID:</p>
                    <p className='text-lg text-gray-900'>{order.data.id}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Total Price:</p>
                    <p className='text-lg text-gray-900'>${order.data.total_price}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Worker ID:</p>
                    <p className='text-lg text-gray-900'>{order.data.worker_id}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Created At:</p>
                    <p className='text-lg text-gray-900'>{order.data.created_at}</p>
                </div>
                <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
                    <h4 className='text-lg font-medium text-gray-900 border-b border-gray-300 pb-2'>Order Items</h4>
                    {order.data.order_items.length > 0 ? (
                        order.data.order_items.map((o, i) => (
                            <div key={i} className='mt-4'>
                                <div className='mt-2'>
                                    <p className='text-sm font-medium text-gray-500'>Item ID:</p>
                                    <p className='text-lg text-gray-900'>{o.id}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm font-medium text-gray-500'>Price:</p>
                                    <p className='text-lg text-gray-900'>${o.price}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm font-medium text-gray-500'>Quantity:</p>
                                    <p className='text-lg text-gray-900'>{o.quantity}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm font-medium text-gray-500'>Product ID:</p>
                                    <p className='text-lg text-gray-900'>{o.product.id}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm font-medium text-gray-500'>Product Name:</p>
                                    <p className='text-lg text-gray-900'>{o.product.name}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm font-medium text-gray-500'>Product Price:</p>
                                    <p className='text-lg text-gray-900'>${o.product.price}</p>
                                </div>
                                <div className='mt-2'>
                                    <p className='text-sm font-medium text-gray-500'>Product Quantity:</p>
                                    <p className='text-lg text-gray-900'>{o.product.quantity}</p>
                                </div>
                                <div className='mt-2 mb-4'>
                                    <p className='text-sm font-medium text-gray-500'>Product Category:</p>
                                    <p className='text-lg text-gray-900'>{o.product.category.name}</p>
                                </div>
                                {i < order.data.order_items.length - 1 && <hr className='border-t border-gray-300' />}
                            </div>
                        ))
                    ) : (
                        <p className='text-sm text-gray-500 mt-4'>No order items found.</p>
                    )}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}


