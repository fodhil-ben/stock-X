import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';


export default function Create({ auth, categories }) {
    const {data, setData, post, errors, processing} = useForm({
        "name":"",
        "price":"",
        "quantity":"",
        "category_id": ""
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        post(route('products.store'))
    }

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
        >
            <Head title="Add Product" />

        <div>
            <div>Create a new Product</div>
            <form className='grid gap-10 w-1/2 mx-auto' onSubmit={handleSubmit}>
                <Input value={data.name} onChange={(e)=>setData('name', e.target.value)}  placeholder="enter product name"/>
                <Input value={data.price} onChange={(e)=>setData('price', e.target.value)} placeholder="enter product price"/>
                <Input value={data.quantity} onChange={(e)=>setData('quantity', e.target.value)} placeholder="enter product quantity"/>
                <select defaultValue={""} onChange={(e)=>setData('category_id', e.target.value)}> 
                    {
                        categories.map(c=>(
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))
                    }
                </select>

                <Button disabled={processing}>Edit product</Button>
                {errors.name && <p>error happned {errors.name}</p>}
                {errors.price && <p>error happned {errors.price}</p>}
                {errors.quantity && <p>error happned {errors.quantity}</p>}
                {errors.category_id && <p>error happned {errors.category_id}</p>}
            </form>
        </div>
        </AuthenticatedLayout>
    );
}


