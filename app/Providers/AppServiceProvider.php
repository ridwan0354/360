<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
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
    public function boot(): void
    {
        // Support Cloudflare SSL Mode: Flexible (origin receives HTTP :80 + X-Forwarded-Proto: https)
        $forwardedProto = strtolower((string) request()->headers->get('X-Forwarded-Proto', ''));
        $isHttpsApp = str_starts_with((string) config('app.url'), 'https://');

        if ($forwardedProto === 'https' || ($this->app->environment('production') && $isHttpsApp)) {
            URL::forceScheme('https');
        }
    }
}
