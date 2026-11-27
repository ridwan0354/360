@extends('layouts.app')

@section('title', 'Masuk Sistem — Ruang360°')

@section('content')
<div class="mx-auto max-w-md px-4 py-12 sm:py-16">
    <div class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-slate-900">Masuk Operasional</h1>
            <p class="text-sm text-slate-500 mt-1">Gunakan akun Admin Utama atau Kru Lapangan.</p>
        </div>

        <form method="POST" action="{{ route('login.attempt') }}" class="space-y-4" id="login-form">
            @csrf
            <div>
                <label for="email" class="block text-sm font-semibold text-slate-700 mb-1.5">Alamat Email</label>
                <input id="email" name="email" type="email" value="{{ old('email') }}" required autofocus
                       class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                       placeholder="admin@ruang360.test">
            </div>

            <div>
                <label for="password" class="block text-sm font-semibold text-slate-700 mb-1.5">Kata Sandi</label>
                <input id="password" name="password" type="password" required
                       class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                       placeholder="••••••••">
            </div>

            <label class="flex items-center gap-2 text-xs text-slate-600">
                <input type="checkbox" name="remember" class="rounded border-slate-300 text-amber-600 focus:ring-amber-500">
                Ingat sesi saya di perangkat ini
            </label>

            <button type="submit" class="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition cursor-pointer">
                Masuk ke Dasbor
            </button>
        </form>

        <div class="mt-6 pt-5 border-t border-slate-100">
            <p class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Akses Demo Cepat (Localhost)</p>
            <div class="grid grid-cols-2 gap-2.5">
                <button type="button" onclick="fillDemoLogin('admin@ruang360.test', 'password')"
                        class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left hover:border-amber-400 hover:bg-amber-50/60 transition cursor-pointer">
                    <span class="block text-xs font-bold text-slate-900">Admin Utama</span>
                    <span class="block text-[11px] text-slate-500 truncate">admin@ruang360.test</span>
                </button>
                <button type="button" onclick="fillDemoLogin('kru@ruang360.test', 'password')"
                        class="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left hover:border-amber-400 hover:bg-amber-50/60 transition cursor-pointer">
                    <span class="block text-xs font-bold text-slate-900">Kru Lapangan</span>
                    <span class="block text-[11px] text-slate-500 truncate">kru@ruang360.test</span>
                </button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    function fillDemoLogin(email, password) {
        document.getElementById('email').value = email;
        document.getElementById('password').value = password;
        document.getElementById('login-form').submit();
    }
</script>
@endpush
@endsection
