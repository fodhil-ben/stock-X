<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'permissions' => $user 
                ? [
                    'view-dashboard' => Gate::allows('view-dashboard'),
                    'create-category' => $user->can('create', Category::class),
                    'delete-category' => $user->can('delete', Category::class),
                    'update-category' => $user->can('update', Category::class),
                    'create-product' => $user->can('create', Product::class),
                    'delete-product' => $user->can('delete', Product::class),
                    'update-product' => $user->can('update', Product::class),                    
                ]
                : []
            ],
        ];
    }
}
