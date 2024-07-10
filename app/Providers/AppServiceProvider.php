<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void
    {
        Gate::define('view-dashboard', function(User $user){
            return $user->is_admin;
        });
        if (env('APP_ENV') == 'production') {
            $url->forceScheme('https');
        }
    }
}
