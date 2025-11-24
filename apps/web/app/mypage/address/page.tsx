"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase/client";
import MyPageSidebar from "../../../components/MyPageSidebar";

interface Address {
    id: string;
    name: string;
    recipient: string;
    phone: string;
    address: string;
    detailAddress: string;
    zipCode: string;
    isDefault: boolean;
}

export default function AddressPage() {
    const router = useRouter();
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

    // Form state
    const [formData, setFormData] = useState<Omit<Address, 'id'>>({
        name: "",
        recipient: "",
        phone: "",
        address: "",
        detailAddress: "",
        zipCode: "",
        isDefault: false,
    });

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setUser(user);
            // Load addresses from metadata
            const userAddresses = user.user_metadata?.addresses || [];
            setAddresses(userAddresses);
            setLoading(false);
        };

        checkUser();
    }, [router, supabase]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        let newAddresses = [...addresses];

        if (formData.isDefault) {
            newAddresses = newAddresses.map(addr => ({ ...addr, isDefault: false }));
        }

        if (currentAddress) {
            // Edit existing
            newAddresses = newAddresses.map(addr =>
                addr.id === currentAddress.id
                    ? { ...formData, id: currentAddress.id }
                    : addr
            );
        } else {
            // Add new
            const newAddress = {
                ...formData,
                id: crypto.randomUUID(),
            };
            // If it's the first address, make it default automatically
            if (newAddresses.length === 0) newAddress.isDefault = true;

            newAddresses.push(newAddress);
        }

        // Update Supabase
        const { error } = await supabase.auth.updateUser({
            data: { addresses: newAddresses }
        });

        if (error) {
            alert("주소 저장 중 오류가 발생했습니다.");
            return;
        }

        setAddresses(newAddresses);
        setIsEditing(false);
        setCurrentAddress(null);
        resetForm();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        const newAddresses = addresses.filter(addr => addr.id !== id);

        const { error } = await supabase.auth.updateUser({
            data: { addresses: newAddresses }
        });

        if (error) {
            alert("삭제 중 오류가 발생했습니다.");
            return;
        }

        setAddresses(newAddresses);
    };

    const handleEdit = (addr: Address) => {
        setCurrentAddress(addr);
        setFormData({
            name: addr.name,
            recipient: addr.recipient,
            phone: addr.phone,
            address: addr.address,
            detailAddress: addr.detailAddress,
            zipCode: addr.zipCode,
            isDefault: addr.isDefault,
        });
        setIsEditing(true);
    };

    const resetForm = () => {
        setFormData({
            name: "",
            recipient: "",
            phone: "",
            address: "",
            detailAddress: "",
            zipCode: "",
            isDefault: false,
        });
    };

    if (loading) return <div className="pt-32 text-center">로딩 중...</div>;
    if (!user) return null;

    return (
        <main className="pt-32 pb-20 min-h-screen">
            <div className="w-full max-w-[1000px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-light text-center mb-4 text-orie-text">마이페이지</h1>
                <p className="text-center text-orie-text/60 mb-16">
                    {user.user_metadata?.name || user.email}님, 환영합니다
                </p>

                <div className="flex flex-col md:flex-row gap-12">
                    <MyPageSidebar />

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-medium text-orie-text">배송지 관리</h2>
                            {!isEditing && (
                                <button
                                    onClick={() => { setIsEditing(true); resetForm(); setCurrentAddress(null); }}
                                    className="px-4 py-2 border border-orie-text text-sm hover:bg-orie-text hover:text-white transition-colors"
                                >
                                    + 새 배송지 추가
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSave} className="max-w-md space-y-4 border p-6 border-orie-text/10">
                                <h3 className="font-medium mb-4">{currentAddress ? "배송지 수정" : "새 배송지 추가"}</h3>

                                <input
                                    placeholder="배송지명 (예: 집, 회사)"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 border border-orie-text/10"
                                    required
                                />
                                <input
                                    placeholder="받는 분"
                                    value={formData.recipient}
                                    onChange={e => setFormData({ ...formData, recipient: e.target.value })}
                                    className="w-full p-3 border border-orie-text/10"
                                    required
                                />
                                <input
                                    placeholder="전화번호"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full p-3 border border-orie-text/10"
                                    required
                                />
                                <div className="flex gap-2">
                                    <input
                                        placeholder="우편번호"
                                        value={formData.zipCode}
                                        onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                                        className="w-1/3 p-3 border border-orie-text/10"
                                        required
                                    />
                                    <button type="button" className="px-4 bg-gray-100 text-xs">주소 찾기</button>
                                </div>
                                <input
                                    placeholder="주소"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full p-3 border border-orie-text/10"
                                    required
                                />
                                <input
                                    placeholder="상세 주소"
                                    value={formData.detailAddress}
                                    onChange={e => setFormData({ ...formData, detailAddress: e.target.value })}
                                    className="w-full p-3 border border-orie-text/10"
                                />

                                <label className="flex items-center gap-2 text-sm text-orie-text/60">
                                    <input
                                        type="checkbox"
                                        checked={formData.isDefault}
                                        onChange={e => setFormData({ ...formData, isDefault: e.target.checked })}
                                    />
                                    기본 배송지로 설정
                                </label>

                                <div className="flex gap-2 mt-4">
                                    <button type="submit" className="flex-1 py-3 bg-orie-text text-white text-sm">저장</button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="flex-1 py-3 border border-orie-text/20 text-sm"
                                    >
                                        취소
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                {addresses.length === 0 ? (
                                    <p className="text-center py-10 text-orie-text/40">등록된 배송지가 없습니다.</p>
                                ) : (
                                    addresses.map(addr => (
                                        <div key={addr.id} className="border border-orie-text/10 p-5 flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="font-medium">{addr.name}</span>
                                                    {addr.isDefault && <span className="text-[10px] bg-orie-text text-white px-1.5 py-0.5">기본</span>}
                                                </div>
                                                <p className="text-sm text-orie-text/80">{addr.recipient} / {addr.phone}</p>
                                                <p className="text-sm text-orie-text/60 mt-1">
                                                    ({addr.zipCode}) {addr.address} {addr.detailAddress}
                                                </p>
                                            </div>
                                            <div className="flex gap-2 text-xs text-orie-text/60">
                                                <button onClick={() => handleEdit(addr)} className="hover:text-orie-text underline">수정</button>
                                                <button onClick={() => handleDelete(addr.id)} className="hover:text-orie-text underline">삭제</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
