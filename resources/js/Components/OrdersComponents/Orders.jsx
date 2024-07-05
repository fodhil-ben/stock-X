import OrderItemCard from '@/Components/OrdersComponents/OrderItemCard';
import ProductCard from '@/Components/OrdersComponents/ProductCard';
import { useOrderItemsContext } from '@/Providers/OrderItemsProvider';
import { useState } from 'react';

export default function Orders({products, searchedProducts, data, setData}){
    return (

        <div className='flex gap-10 mt-10'>
        <div className='w-2/3 shadow-xl p-5 '>
            Choose Products
        <div className='mt-5 flex flex-wrap justify-start h-fit gap-10 overflow-y-scroll max-h-[450px]'>
            {
                searchedProducts.map(p=>(
                    <ProductCard  data={data} setData={setData} key={p.id} product={p}/>
                ))
            }
        </div>
            </div>
        <div className='w-1/3 shadow-xl p-5 flex flex-col'>
            <div>    
                Order Items
            </div>
            <div className='mt-5 overflow-y-scroll h-[400px]'>

            {
                data?.order_items?.map((o, i)=>(
                    <OrderItemCard products={products} data={data} setData={setData} key={i} order={o}/>
                ))
            }
            </div>
            <div className='pt-5'>

            Total Price
            <div>
                {data.total_price}
            </div>
            </div>
        </div>
    </div>
    )
} 