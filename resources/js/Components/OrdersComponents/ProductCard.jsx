import { useState } from "react";

export default function ProductCard({product, data, setData, TotalPrice, setTotalPrice}){
    const [productEnded, setProductEnded] = useState(false)
    const handleAddItem = ()=>{
        let total_price
            if (product.quantity === 0) {
                setProductEnded(true); 
                return
            }

            let added = false;
            let newOrderItems = data.order_items.map(o=>{
                if (product.id === o.product.id){
                    added = true
                    o.quantity ++
                    product.quantity --
                    total_price = data.total_price + product.price
                    return {...o, 'price': o.price += product.price}
                }else{
                    return o
                }
            })
            if (!added) {
                product.quantity --
                total_price = data.total_price + product.price
                newOrderItems = [...newOrderItems, {'product': {'id': product.id}, 'price': product.price, 'quantity': 1}]
            }
            setData({order_items: newOrderItems,total_price})

    }
    setTimeout(()=>{
        setProductEnded(false)
    }, 2000)
    return (
    <>
        <div onClick={handleAddItem} className="p-5 cursor-pointer select-none rounded-xl bg-gray-200 w-[250px] h-[80px]">
            {product.name}
            ===
            {product.category_id}
            ===
            {product.quantity}
            ===
            {product.price}
        </div>
        {productEnded && <span className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-500 rounded-md py-3 px-10">the product ended from stock </span>}
    </>
    )
}