<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::latest()->paginate(5);
        return inertia('Categories/Index', ['categories' => $categories, 'message'=> session('message')]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Gate::authorize('create', Category::class)){
            return inertia('Categories/Create');
         };
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        if ($request->user()->cannot('create', Category::class)){
            abort(403);
         };
        $data = $request->validated();
        Category::create($data);
        return Redirect::route('categories.index')->with('message', 'Category was created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return inertia('Categories/Show', ['category'=> $category]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        if (Gate::authorize('update', Category::class)){
            return inertia('Categories/Edit', ['category'=>$category]);
        };
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        if ($request->user()->cannot('update', Category::class)){
            abort(403);
         };
        $data = $request->validated();
        $category->update($data);
        return Redirect::route('categories.index')->with("message", "Category was updated");
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (Gate::authorize('delete', Category::class)){
            $category_id = $category->id;
            $category->delete();
            return Redirect::route('categories.index')->with('message', "Category \"$category_id\"was deleted");
        };
    }
}
