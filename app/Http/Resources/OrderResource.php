<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'total_price'=>$this->total_price,
            'worker_id'=>$this->worker_id,
            'created_at'=>(new Carbon($this->created_at))->format('Y-M-D'),
            'order_items'=>OrderItemResource::collection($this->orderItems)
        ];
    }
}
