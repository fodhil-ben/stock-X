import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ auth, product,categories }) {

    const {data, setData, put, errors, processing} = useForm({
        "name":product.name,
        "price":product.price,
        "quantity":product.quantity,
        "category_id": product.category_id
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(data)
        put(route('products.update', product))
    }

    return (
        <AuthenticatedLayout
        auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">products</h2>}
        >
            <Head title="Edit product" />

        <div>
            <div>Edit The product</div>
            <form className='grid gap-10 w-1/2 mx-auto' onSubmit={handleSubmit}>
                <Input value={data.name} onChange={(e)=>setData('name', e.target.value)}  placeholder="enter product name"/>
                <Input value={data.price} onChange={(e)=>setData('price', e.target.value)} placeholder="enter product price"/>
                <Input value={data.quantity} onChange={(e)=>setData('quantity', e.target.value)} placeholder="enter product quantity"/>
                <select defaultValue={data.category_id} onChange={(e)=>setData('category_id', e.target.value)}> 
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


