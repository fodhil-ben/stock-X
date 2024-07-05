<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\Category;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->paginate(5);
        return inertia('Products/Index', [
            'products' => ProductResource::collection($products), 
            'message'=>session('message'),
            'error'=>session('error')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Gate::authorize('create', Product::class)){
            $categories = Category::get();
            return inertia('Products/Create', ['categories'=> $categories]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        if ($request->user()->cannot('create', Product::class)){
            abort(403);
        }
        $data = $request->validated();
        Product::create($data);
        return Redirect::route('products.index')->with('message', 'Product was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return inertia('Products/Show', [
            'product'=> new ProductResource($product)
        ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        
        if (Gate::authorize('update', Product::class)){
            $categories = Category::get();
            return inertia('Products/Edit', ['product'=>$product, 'categories'=>$categories]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        if ($request->user()->cannot('update', Product::class)){
            abort(403);
        }
        $data = $request->validated();
        $product->update($data);
        return Redirect::route('products.index')->with("message", "product was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if (Gate::authorize('delete', Product::class)){
            if ($product->orderItem()->exists()){
                return redirect()->back()->with('error', 'product is related to some order items');
            };
            $product->delete();
            return Redirect::route('products.index')->with('message', "Product Deleted");
        }
    }
}
