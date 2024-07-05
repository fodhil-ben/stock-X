import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ auth }) {

    const {data, setData, post, errors, processing} = useForm({
        "name":"",
        "description":""
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(data)
        post(route('categories.store'))
    }

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
        >
            <Head title="Add Category" />

        <div>
            <div>Create a new Category</div>
            <form className='grid gap-10 w-1/2 mx-auto' onSubmit={handleSubmit}>
                <Input value={data.name} onChange={(e)=>setData('name', e.target.value)}  placeholder="enter category name"/>
                <Input value={data.description} onChange={(e)=>setData('description', e.target.value)} placeholder="enter category description"/>
                <Button disabled={processing}>Create category</Button>
                {errors.name && <p>error happned {errors.name}</p>}
                {errors.description && <p>error happned {errors.description}</p>}
            </form>
        </div>
        </AuthenticatedLayout>
    );
}


