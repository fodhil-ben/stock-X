<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "total_price"=> ["required", "numeric"],
            'order_items'=>[
                "product_id" => ["required", "exists:products,id"],
                "price"=>["required", "numeric"],
                "quantity"=>["required", "numeric"]
            ]
        ];
    }
}
