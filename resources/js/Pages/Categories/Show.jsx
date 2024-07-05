import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, category }) {

    // const { delete: destroy } = useForm();
    const handleDelete = (e)=>{
        e.preventDefault()
        router.delete(route('categories.destroy', category.id))
    }

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Category {category.name}</h2>}
        >
            <Head title='Category' />
            <div className='flex justify-between px-10 pb-5'>
        {
            auth.permissions['update-category'] &&
            <Link
            href={route("categories.edit", category)}
            className="bg-gray-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-gray-600"
            >
            Edit Category
          </Link>
        }
        {
        auth.permissions['delete-category'] &&

        <form onSubmit={handleDelete}>
            <Button>
            Delete Category
            </Button>
            </form>
        }
              </div>


            <div className='bg-white shadow rounded-lg p-6'>
            <div className='mt-4 p-4 bg-gray-100 rounded-lg'>

                <h3 className='text-lg font-medium text-gray-900'>Category Details</h3>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Name:</p>
                    <p className='text-lg text-gray-900'>{category.name}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Description:</p>
                    <p className='text-lg text-gray-900'>{category.description}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Created At:</p>
                    <p className='text-lg text-gray-900'>{new Date(category.created_at).toLocaleString()}</p>
                </div>
                <div className='mt-4'>
                    <p className='text-sm font-medium text-gray-500'>Updated At:</p>
                    <p className='text-lg text-gray-900'>{new Date(category.updated_at).toLocaleString()}</p>
                </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


