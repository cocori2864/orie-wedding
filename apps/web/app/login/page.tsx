"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { GuestOrderLookup } from "../../components/order/GuestOrderLookup";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const [rememberEmail, setRememberEmail] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberEmail(true);
        }
    }, []);

    const handleSocialLogin = async (provider: 'google' | 'kakao') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (rememberEmail) {
                localStorage.setItem("savedEmail", email);
            } else {
                localStorage.removeItem("savedEmail");
            }

            router.push("/");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-orie-bg py-20">
            <div className="w-full max-w-md p-8 bg-white shadow-sm">
                <div className="text-center mb-12">
                    <Link href="/" className="font-serif text-3xl font-bold tracking-[2px] text-orie-text">
                        ORIÉ
                    </Link>
                    <p className="mt-4 text-sm text-orie-text/60">계정에 로그인하세요</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-orie-text/60 uppercase tracking-wider">
                            이메일
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text transition-colors"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-orie-text/60 uppercase tracking-wider">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember-email"
                            checked={rememberEmail}
                            onChange={(e) => setRememberEmail(e.target.checked)}
                            className="w-4 h-4 accent-orie-text"
                        />
                        <label htmlFor="remember-email" className="text-sm text-orie-text/80 cursor-pointer">
                            아이디 저장
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors disabled:opacity-50"
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">또는 소셜 계정으로 로그인</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {/* Google */}
                        <button
                            type="button"
                            onClick={() => handleSocialLogin('google')}
                            className="flex items-center justify-center py-3 px-4 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </button>

                        {/* Kakao */}
                        <button
                            type="button"
                            onClick={() => handleSocialLogin('kakao')}
                            className="flex items-center justify-center py-3 px-4 bg-[#FEE500] rounded-md hover:bg-[#FDD835] transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                                <path d="M12 3C7.58 3 4 5.79 4 9.24c0 2.41 1.75 4.5 4.4 5.56-.19.7-.69 2.53-.79 2.9-.12.45.17.44.36.32.25-.17 2.76-1.87 3.86-2.62.56.08 1.13.12 1.71.12 4.42 0 8-2.79 8-6.24C21.54 5.79 17.96 3 12 3z" />
                            </svg>
                        </button>

                        {/* Naver */}
                        <button
                            type="button"
                            onClick={() => alert("네이버 로그인은 현재 준비 중입니다.")}
                            className="flex items-center justify-center py-3 px-4 bg-[#03C75A] rounded-md hover:bg-[#02B351] transition-colors"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFFFFF">
                                <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
                            </svg>
                        </button>
                    </div>

                    <div className="text-center text-sm text-orie-text/60">
                        계정이 없으신가요?{" "}
                        <Link href="/signup" className="text-orie-text underline hover:opacity-70">
                            회원가입
                        </Link>
                    </div>
                </form>
            </div>

            <GuestOrderLookup />
        </main>
    );
}
