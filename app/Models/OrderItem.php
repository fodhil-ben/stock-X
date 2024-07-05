<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    protected $fillable = [
        "price",
        "quantity",
        "order_id",
        "product_id"
    ];  
    public $timestamps = false;
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
