<!DOCTYPE html>
<html lang="id" class="h-full bg-slate-50">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Ruang360° — Virtual Tour VR & Denah Interaktif Multi-Event')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('head')
</head>
<body class="min-h-full flex flex-col text-slate-900 antialiased selection:bg-amber-200 selection:text-slate-950">
    <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between gap-4">
                <div class="flex items-center gap-6">
                    <a href="{{ route('home') }}" class="flex items-center gap-2.5 group">
                        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-amber-400 shadow-sm ring-1 ring-amber-500/30 transition group-hover:scale-105">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="9"/>
                                <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
                            </svg>
                        </div>
                        <div class="leading-tight">
                            <span class="block text-base font-bold tracking-tight text-slate-900">Ruang<span class="text-amber-600">360°</span></span>
                            <span class="block text-[11px] font-medium text-slate-500">Virtual Tour &amp; Denah Multi-Event</span>
                        </div>
                    </a>

                    @auth
                        <nav class="hidden md:flex items-center gap-1">
                            @if(auth()->user()->isAdmin())
                                <a href="{{ route('admin.dashboard') }}" class="rounded-lg px-3 py-1.5 text-sm font-medium {{ request()->routeIs('admin.dashboard') || request()->routeIs('admin.events.*') || request()->routeIs('admin.floorplan.*') ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }}">
                                    Dasbor Event
                                </a>
                                <a href="{{ route('admin.crew.index') }}" class="rounded-lg px-3 py-1.5 text-sm font-medium {{ request()->routeIs('admin.crew.*') ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }}">
                                    Manajemen Kru
                                </a>
                            @endif
                            <a href="{{ route('kru.dashboard') }}" class="rounded-lg px-3 py-1.5 text-sm font-medium {{ request()->routeIs('kru.*') ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }}">
                                Portal Kru Lapangan
                            </a>
                        </nav>
                    @endauth
                </div>

                <div class="flex items-center gap-3">
                    @auth
                        <div class="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs">
                            <span class="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                            <span class="font-semibold text-slate-800">{{ auth()->user()->name }}</span>
                            <span class="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-700">{{ auth()->user()->role }}</span>
                        </div>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                                Keluar
                            </button>
                        </form>
                    @else
                        <a href="{{ route('login') }}" class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition">
                            Masuk Admin / Kru
                        </a>
                    @endauth
                </div>
            </div>

            @auth
                <nav class="flex md:hidden items-center gap-1 pb-2.5 overflow-x-auto">
                    @if(auth()->user()->isAdmin())
                        <a href="{{ route('admin.dashboard') }}" class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold {{ request()->routeIs('admin.dashboard') || request()->routeIs('admin.events.*') || request()->routeIs('admin.floorplan.*') ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700' }}">Dasbor Event</a>
                        <a href="{{ route('admin.crew.index') }}" class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold {{ request()->routeIs('admin.crew.*') ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700' }}">Kru</a>
                    @endif
                    <a href="{{ route('kru.dashboard') }}" class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold {{ request()->routeIs('kru.*') ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-700' }}">Portal Kru</a>
                </nav>
            @endauth
        </div>
    </header>

    <main class="flex-1">
        @if(session('success') || session('status'))
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
                <div class="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 shadow-sm">
                    <span>{{ session('success') ?? session('status') }}</span>
                </div>
            </div>
        @endif

        @if($errors->any())
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
                <div class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                    <ul class="list-disc pl-5 space-y-0.5">
                        @foreach($errors->all() as $err)
                            <li>{{ $err }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        @endif

        @yield('content')
    </main>

    @stack('scripts')
</body>
</html>
