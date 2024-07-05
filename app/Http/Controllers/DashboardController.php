<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DashboardController extends Controller
{
    public function index () {
        if (Gate::allows('view-dashboard')){
            $today_data = Order::whereDate('created_at', Carbon::today())
            ->selectRaw('SUM("total_price") as today_income, COUNT(*) as today_orders')
            ->first();
            $total_products = Product::count();
            $orders = Order::latest()
            ->limit(5)
            ->get();
            return inertia('Dashboard', [
                'orders'=> OrderResource::collection($orders),
                'today_orders'=>$today_data->today_orders ?? 0,
                'total_products'=>$total_products,
                'today_income'=>number_format($today_data->today_income, 2) ?? 0
            ]);
        }
    }
}
