<?php

namespace App\Http\Controllers;

use App\Events\ProductEndedInStock;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\OrderItemResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Gate::allows('viewAny', Order::class)){
        // if (Auth::user()->is_admin){
            $orders = Order::latest()->paginate(5); 
            return inertia('Orders/Index', [
                'orders'=>OrderResource::collection($orders),
                'message'=>session('message'),
                'error'=>session('error')
            ]);
        }else{
            $orders = Order::where('worker_id', Auth::id())->latest()->paginate(5); 
            return inertia('Orders/Index', [
                'orders'=>OrderResource::collection($orders),
                'message'=>session('message'),
                'error'=>session('error')
            ]);
        }
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::get();
        $products = Product::get();
        return inertia('Orders/Create', [
            'products'=>ProductResource::collection($products),
            'categories'=>($categories),
            'error'=>session('error')
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $data = $request->validated();
        $data['worker_id'] = Auth::id();
        $order = Order::create(['worker_id'=>$data['worker_id'], 'total_price'=>$data['total_price']]);
        $changedProducts = [];
        foreach($data['order_items'] as $orderItem){
            $product = Product::find($orderItem['product']['id']);
            if ($product){
                if ($product->quantity < $orderItem['quantity']){
                    return redirect()->route('orders.create')->with('error', 'not enough stock for product: ');
                }
                $product->quantity -= $orderItem['quantity'];
                $product->save();
                $changedProducts[] = $product;
                OrderItem::create([
                    'price'=>$orderItem['price'], 
                    'quantity'=>$orderItem['quantity'], 
                    'product_id'=>$orderItem['product']['id'], 
                    'order_id'=>$order->id
                ]);
                ProductEndedInStock::dispatch($product);
            }
        };
        foreach($changedProducts as $product){
            ProductEndedInStock::dispatch($product);
        }
        return redirect()->route('orders.index')->with('message', 'Order Created');
    }
    
    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    { 
        if (Gate::authorize('view', $order)){
            return inertia('Orders/Show', ['order'=> new OrderResource($order)]) ;
        }
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        if (Gate::authorize('update', $order)){
            $categories = Category::get();
            $products = Product::get();
            return inertia('Orders/Edit', [
                'order'=> new OrderResource($order),
                'products'=>($products),
                'categories'=>($categories),
                'message'=>session('message'),
                ]) ;
            }
        }
        
        /**
         * Update the specified resource in storage.
         */
        public function update(UpdateOrderRequest $request, Order $order)
        {
            if ($request->user()->cannot('update', $order)){
                abort(403);
            }
            $data = $request->validated();
            DB::beginTransaction();
            try{

                $order->update(['total_price'=>$data['total_price']]);
                
                $existingOrderItemsIds = $order->orderItems()->pluck('id')->toArray();
                $newOrderItemsIds = [];
                $changedProducts = [];
                foreach($data['order_items'] as $newOrderItemData){
                    if (isset($newOrderItemData['id']) && in_array($newOrderItemData['id'], $existingOrderItemsIds)){
                        $orderItem = OrderItem::find($newOrderItemData['id']);
                        $product = Product::find($orderItem['product']['id']);
                        if ($product){
                            $product->quantity += $orderItem['quantity'];
                            if ($product->quantity < $newOrderItemData['quantity']){
                                throw new \Exception('not enough stock for product: ');
                            }
                            $product->quantity -= $newOrderItemData['quantity'];
                            $product->save();
                            $orderItem->update([
                                'price'=>$newOrderItemData['price'],
                                'quantity'=>$newOrderItemData['quantity'], 
                                'product_id'=>$newOrderItemData['product']['id'],
                            ]);
                            $changedProducts[] = $product; 
                            $newOrderItemsIds[] = $newOrderItemData['id'];
                        }else{
                            // return redirect()->route('orders.edit', $order)->with('message', 'Product Not found');
                            throw new \Exception('Product Not found');
                        }
                    }else{
                        $product = Product::find($newOrderItemData['product']['id']);
                        if ($product){
                            if ($product->quantity < $newOrderItemData['quantity']){
                                // return redirect()->route('orders.edit', $order)->with('message', 'not enough stock for product: ');
                                throw new \Exception('not enough stock for product: ');
                                
                            }
                            $product->quantity -= $newOrderItemData['quantity'];
                            $product->save();
                            $newOrderItem = OrderItem::create([
                                'price'=>$newOrderItemData['price'], 
                                'quantity'=>$newOrderItemData['quantity'], 
                                'product_id'=>$newOrderItemData['product']['id'], 
                                'order_id'=>$order->id
                            ]);
                            // dd($newOrderItem);
                            $newOrderItemsIds[] = $newOrderItem['id'];
                        }else{
                            throw new \Exception('Product Not found');
                            
                        }
                    }
                }

        $ordersToDelete = $order->orderItems()->whereNotIn('id', $newOrderItemsIds);
        foreach($ordersToDelete->get() as $orderToDelete){
            $product = Product::find($orderToDelete['product']['id']);
            if ($product){
                $product->quantity += $orderToDelete['quantity'];
                $product->save();
            }else{
                throw new \Exception('Product Not found');
            }
        }
        $ordersToDelete->delete();
        DB::commit();
        foreach($changedProducts as $product){
            ProductEndedInStock::dispatch($product);
        }
        return redirect()->route('orders.index')->with('message', 'Order edited');
    } catch (\Exception $e){
        DB::rollBack();
        return redirect()->route('orders.edit', $order)->with('message', 'failed to update order' . $e->getMessage());
    }
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        if (Gate::authorize('delete', $order)){
            $order->delete();
            return redirect()->back();
        }
    }
}
