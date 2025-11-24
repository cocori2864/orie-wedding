"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });

            if (error) throw error;

            // For this demo, we assume auto-confirm is on or we just redirect to login
            // In production, you might show a "Check your email" message
            router.push("/login?message=Check your email to confirm account");
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
                    <p className="mt-4 text-sm text-orie-text/60">Create your account</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-orie-text/60 uppercase tracking-wider">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text transition-colors"
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-orie-text/60 uppercase tracking-wider">
                            Email
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
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-white border border-orie-text/20 text-sm focus:outline-none focus:border-orie-text transition-colors"
                            placeholder="Min. 6 characters"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                    <div className="text-center text-sm text-orie-text/60">
                        Already have an account?{" "}
                        <Link href="/login" className="text-orie-text underline hover:opacity-70">
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}
