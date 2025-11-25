"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";


export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

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

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("비밀번호는 6자 이상이어야 합니다.");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        phone,
                    },
                },
            });

            if (error) {
                if (error.message.includes("already registered") || error.status === 422) {
                    throw new Error("이미 가입된 이메일입니다.");
                }
                throw error;
            }

            // For this demo, we assume auto-confirm is on or we just redirect to login
            // In production, you might show a "Check your email" message
            router.push("/login?message=이메일을 확인하여 계정을 인증해주세요.");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-orie-bg">
            <div className="w-full max-w-md p-8">
                <div className="text-center mb-12">
                    <Link href="/" className="font-serif text-3xl font-bold tracking-[2px] text-orie-text">
                        ORIÉ
                    </Link>
                    <p className="mt-4 text-sm text-orie-text/60">계정 만들기</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-orie-text/60 uppercase tracking-wider">
                            이름
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text transition-colors"
                            placeholder="이름을 입력하세요"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-orie-text/60 uppercase tracking-wider">
                            연락처
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text transition-colors"
                            placeholder="010-0000-0000"
                            required
                        />
                    </div>



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
                            placeholder="6자 이상 입력"
                            minLength={6}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-orie-text/60 uppercase tracking-wider">
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text transition-colors"
                            placeholder="비밀번호를 다시 입력하세요"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors disabled:opacity-50"
                    >
                        {loading ? "가입 중..." : "회원가입"}
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-orie-bg text-gray-500">또는 소셜 계정으로 가입</span>
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
                        이미 계정이 있으신가요?{" "}
                        <Link href="/login" className="text-orie-text underline hover:opacity-70">
                            로그인
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
