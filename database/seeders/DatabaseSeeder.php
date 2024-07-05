<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
// use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'fodhil',
            'email' => 'test@example.com',
            'password' => 'asdfasdf',
            'is_admin' => true
        ]);
        User::factory()->create([
            'name' => 'test',
            'email' => 'test1@example.com',
            'password' => 'asdfasdf',
            'is_admin' => false
        ]);
        User::factory(10)->create();


        Category::factory()
            ->count(5)
            ->hasProducts(10)
            ->create();

        Order::factory()
            ->count(20)
            // ->hasorderItem(4)
            ->create();
        OrderItem::factory()
            ->count(20)
            ->create();
    }
}
