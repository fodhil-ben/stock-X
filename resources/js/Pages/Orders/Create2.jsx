import Orders from '@/Components/OrdersComponents/Orders';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ auth, products, categories, queryParams=null }) {
    queryParams = queryParams || {}
    const {data, setData, post, errors, processing} = useForm([{
        "product_id":"",
        "price":"",
        "quantity":"",
    }])

    const searchFieldChanged = (name, value)=>{
        console.log(value)
        if (value) queryParams[name] = value
        else delete queryParams[name]
    }
    
    const onKeyPress = (name, e)=>{
        console.log(e)
        searchFieldChanged(name, e.target.value)
        if (e.key === "Enter" || name === 'category_id'){
            console.log(queryParams)
            router.get(route('orders.create', queryParams))
        } 
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(data)
        console.log(orderItems)
        // console.log(data)
        // post(route('orders.store'))
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">orders</h2>}
        >


            <Head title="Add order" />

        <div>
            <div>Create a new order</div>
            <form name='create order form' className='flex w-1/2 mx-auto gap-10'>
                <Input defaultValue={queryParams['name']} name="search" onKeyPress={e=>onKeyPress('name', e)} className="inline w-1/3" placeholder="search for a product"/>
                <select name='select' className='rounded-md w-1/3' onChange={e=>onKeyPress('category_id', e)} defaultValue={queryParams['category_id']}> 
                    {
                        categories.map(category=>(
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <Button onClick={handleSubmit} className='w-1/3' disabled={processing}>Create order</Button>
            </form>
            <Orders products={products}/>
        </div>
        </AuthenticatedLayout>
    );
}


