<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Middleware\CheckLogin;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckOrderCompletde;
use Illuminate\Support\Facades\Route;
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
    public function boot(): void
    {
        Route::aliasMiddleware('ck_login', CheckLogin::class);
        Route::aliasMiddleware('ck_admin', CheckAdmin::class);
        Route::aliasMiddleware('ck_order', CheckOrderCompletde::class);
    }
}
