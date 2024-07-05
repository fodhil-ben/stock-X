import Orders from '@/Components/OrdersComponents/Orders';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Edit({ auth, products, categories, order, message }) {
    console.log(order)
    const [flashMsg, setFlashMsg] = useState(message);
    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);
    const {data, setData, put, errors, processing} = useForm(
        {
            "total_price": order.data.total_price,
            "order_items": order.data.order_items
        })
    const [searchedProducts, setSearchedProducts] = useState(products)
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
        let newSearchedProducts = products.filter(p=>{
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
        put(route('orders.update', order.data))
        // setData(        {
        //     "total_price": 0,
        //     "order_items": []
        // })

    }
    return (
        <AuthenticatedLayout
        auth={auth}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">orders</h2>}
        >


            <Head title="Add order" />
{/* {JSON.stringify(order.data)} */}
        <div>
            <div>update order</div>
            {flashMsg && (
            <div className="bg-gray-500 py-2 px-4 rounded mb-4">
              {flashMsg}
            </div>
          )}
          {message}
            <form name='update order form' className='flex w-1/2 mx-auto gap-10'>
                <Input defaultValue={search['name']} name="search" onChange={e=>handleFilter('name', e.target.value)} className="inline w-1/3" placeholder="search for a product"/>
                <select name='select' className='rounded-md w-1/4' onChange={e=>handleFilter('category_id', e.target.value)} defaultValue={search['category_id']}> 
                    {
                        categories.map(category=>(
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <Button onClick={handleSubmit} className='w-1/4' disabled={processing}>update order</Button>
                <Button onClick={handleReset} className='w-1/4' disabled={processing}>Reset Form</Button>
            </form>
            <Orders data={data} setData={setData} searchedProducts={searchedProducts} products={products}/>
            {errors.order_items && <p>error happned {errors.order_items}</p>}
            {errors.total_price && <p>error happned {errors.total_price}</p>}
        </div>
        </AuthenticatedLayout>
    );
}


