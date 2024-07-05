import { createContext, useContext, useState } from 'react';

const OrderItemsContext = createContext()


export const OrderItemsProvider = ({children})=>{
    const [orderItems, setOrderItems] = useState([])
    const [TotalPrice, setTotalPrice] = useState(0)
    return (

        <OrderItemsContext.Provider value={{orderItems, setOrderItems, TotalPrice, setTotalPrice}}>{children}</OrderItemsContext.Provider>
    )
}

export const useOrderItemsContext = ()=>{
    const context = useContext(OrderItemsContext)
    if (context === undefined) {
        throw new Error('hook must be used within the Provider');
    }
    return context
}