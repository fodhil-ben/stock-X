import Orders from '@/Components/OrdersComponents/Orders';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Create({ auth, products, categories, error, message }) {
    const {data, setData, post, errors, processing} = useForm(
        {
            "total_price": 0,
            "order_items": []
        })
        console.log(error)
        console.log(message)
    
    const [searchedProducts, setSearchedProducts] = useState(products.data)
    const [search, setSearch] = useState({
        name: null,
        category_id: null
    })

    const handleFilter = (name, value)=>{
        setSearch(prev => ({...prev, [name]: value}))
    }
    const handleReset = (e)=>{
        e.preventDefault()
        setSearch({
            name: null,
            category_id: null
        })
    }


    useEffect(()=>{
        let newSearchedProducts = products.data.filter(p=>{
            return search['category_id'] === null 
            ?search['name'] === null 
                ? p
                : p.name.includes(search['name'])
            :search['name'] === null
                ? p.category_id == search['category_id']
                : p.category_id == search['category_id'] && p.name.includes(search['name'])
    })
        setSearchedProducts(newSearchedProducts)
    }, [search])

    const handleSubmit = (e)=>{
        e.preventDefault()
        post(route('orders.store'))
        setData(        {
            "total_price": 0,
            "order_items": []
        })

    }
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">orders</h2>}
        >


            <Head title="Add order" />
        
        <div>
            <div>Create a new order</div>
            {error && error}
            <form name='create order form' className='flex w-1/2 mx-auto gap-10'>
                <Input defaultValue={search['name']} name="search" onChange={e=>handleFilter('name', e.target.value)} className="inline w-1/3" placeholder="search for a product"/>
                <select name='select' className='rounded-md w-1/4' onChange={e=>handleFilter('category_id', e.target.value)} defaultValue={search['category_id']}> 
                    {
                        categories.map(category=>(
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <Button onClick={handleSubmit} className='w-1/4' disabled={processing}>Create order</Button>
                <Button onClick={handleReset} className='w-1/4' disabled={processing}>Reset Form</Button>
            </form>
            <Orders data={data} setData={setData} searchedProducts={searchedProducts} products={products}/>
            {errors.order_items && <p>error happned {errors.order_items}</p>}
            {errors.total_price && <p>error happned {errors.total_price}</p>}
        </div>
        </AuthenticatedLayout>
    );
}


