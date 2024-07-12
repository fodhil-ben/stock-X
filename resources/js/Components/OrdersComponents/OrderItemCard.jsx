export default function OrderItemCard ({products, order,data, setData}){
    const handleRemoveItem = () => {
        let total_price
        let newOrderItems = [];
        console.log(data.order_items[0])
        data.order_items.forEach(o => {
            if (o.product.id === order.product.id) {
                console.log(products)
                console.log(order)
                const product = products.find(p=> p.id === order.product.id)
                if (o.quantity > 1) {
                    o.quantity--;   
                    total_price = data.total_price - product.price;
                    newOrderItems.push({ ...o, price: o.price - product.price });
                } else {
                    total_price = data.total_price - product.price;
                }
                product.quantity ++
            } else {
                newOrderItems.push(o);
            }
        });
        setData({order_items: newOrderItems,total_price})
    }


    return (
        <div onClick={handleRemoveItem} className="p-3 select-none mb-5 cursor-pointer rounded-xl bg-gray-200">
            product : {order?.product_id}
            quantity: {order?.quantity}
            price: {order?.price}
            {/* price: {(order?.price).toFixed(2)} */}
        </div>
    )
}