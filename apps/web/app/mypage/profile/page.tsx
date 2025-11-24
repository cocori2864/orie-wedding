"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import MyPageSidebar from "../../../components/MyPageSidebar";

export default function ProfilePage() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setUser(user);

            // Fetch profile data
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profile) {
                setFormData({
                    name: profile.name || "",
                    phone: profile.phone || "",
                    email: user.email || "",
                });
            } else {
                // Fallback if no profile exists
                setFormData({
                    name: user.user_metadata?.name || "",
                    phone: "",
                    email: user.email || "",
                });
            }
            setLoading(false);
        };

        getProfile();
    }, [router, supabase]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    name: formData.name,
                    phone: formData.phone,
                })
                .eq('id', user.id);

            if (error) throw error;

            // Also update auth metadata for consistency
            await supabase.auth.updateUser({
                data: { name: formData.name }
            });

            setMessage("회원 정보가 수정되었습니다.");
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage("정보 수정 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return (
            <main className="pt-32 pb-20 min-h-screen">
                <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10 text-center">
                    <p className="text-orie-text/60">로딩 중...</p>
                </div>
            </main>
        );
    }

    if (!user) return null;

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-4 text-orie-text">마이페이지</h1>
                <p className="text-center text-orie-text/60 mb-16">
                    {formData.name || user.email}님, 환영합니다
                </p>

                <div className="flex flex-col md:flex-row gap-12">
                    <MyPageSidebar />

                    <div className="flex-1">
                        <h2 className="text-lg font-medium mb-8 text-orie-text">회원 정보</h2>

                        <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                            <div>
                                <label className="block text-sm text-orie-text/60 mb-2">이메일</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full p-3 border border-orie-text/10 bg-gray-50 text-orie-text/60"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-orie-text/60 mb-2">이름</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-orie-text/10 focus:outline-none focus:border-orie-text transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-orie-text/60 mb-2">전화번호</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="010-0000-0000"
                                    className="w-full p-3 border border-orie-text/10 focus:outline-none focus:border-orie-text transition-colors"
                                />
                            </div>

                            {message && (
                                <p className={`text-sm ${message.includes("오류") ? "text-red-500" : "text-green-600"}`}>
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 bg-orie-text text-white text-sm font-semibold hover:bg-[#5A6275] transition-colors"
                            >
                                저장하기
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
