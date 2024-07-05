import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, category }) {

    const {data, setData, put, errors, processing} = useForm({
        "name":category.name,
        "description":category.description
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        put(route('categories.update', category))
    }

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Edit Category" />

        <div>
            <div>Edit The Category</div>
            <form className='grid gap-10 w-1/2 mx-auto' onSubmit={handleSubmit}>
                <Input value={data.name} onChange={(e)=>setData('name', e.target.value)}  placeholder="enter category name"/>
                <Input value={data.description} onChange={(e)=>setData('description', e.target.value)} placeholder="enter category description"/>
                <Button disabled={processing}>Edit Category</Button>
                {errors.name && <p>error happned {errors.name}</p>}
                {errors.description && <p>error happned {errors.description}</p>}
            </form>
        </div>
        </AuthenticatedLayout>
    );
}


