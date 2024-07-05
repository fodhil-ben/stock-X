import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, product }) {
    const handleDelete = (e)=>{
        e.preventDefault()
        router.delete(route('products.destroy', product.data))
    }

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">product {product.name}</h2>}
        >
            <Head title='product' />
            <div className='flex justify-between px-10 pb-5'>
        {
            auth.permissions['update-product'] &&
        <Link
        href={route("products.edit", product.data.id)}
        className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
        >
            Edit product
          </Link>
        }
        {
            auth.permissions['delete-product'] &&
        <form onSubmit={handleDelete}>
            <Button>
            Delete product
            </Button>
            </form>
        }
        </div>

        <div className='bg-white shadow rounded-lg p-6'>
                <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
                <h3 className='text-lg font-medium text-gray-900'>Product Details</h3>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Name:</p>
                    <p className='text-lg text-gray-900'>{product.data.name}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Price:</p>
                    <p className='text-lg text-gray-900'>${product.data.price}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Quantity:</p>
                    <p className='text-lg text-gray-900'>{product.data.quantity}</p>
                </div>
                </div>
                <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
                    <h4 className='text-lg font-medium text-gray-900 border-b border-gray-300 pb-2'>Category</h4>
                    <div className='mt-2'>
                        <p className='text-sm font-medium text-gray-500'>Name:</p>
                        <p className='text-lg text-gray-900'>{product.data.category.name}</p>
                    </div>
                    <div className='mt-2'>
                        <p className='text-sm font-medium text-gray-500'>Description:</p>
                        <p className='text-lg text-gray-900'>{product.data.category.description}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


