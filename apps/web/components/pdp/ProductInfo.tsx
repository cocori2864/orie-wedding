"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { BouquetOptions } from "./BouquetOptions";
import { GuestOrderForm } from "../order/GuestOrderForm";
import { createOrder } from "../../app/actions/createOrder";

interface ProductInfoProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    category?: string;
    flowers?: string;
    color?: string;
    status?: string;
}

export function ProductInfo({ id, name, price, description, image, category, flowers, color, status }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Option States
    const [weddingDate, setWeddingDate] = useState<Date | null>(null);
    const [weddingTime, setWeddingTime] = useState("");
    const [venue, setVenue] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [corsageCount, setCorsageCount] = useState(0);
    const [requests, setRequests] = useState("");

    const [showReservationModal, setShowReservationModal] = useState(false);
    const [showGuestForm, setShowGuestForm] = useState(false);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleReserve = async () => {
        if (!weddingDate || !weddingTime || !venue || !pickupLocation) {
            alert("예식 정보와 수령 장소를 모두 입력해주세요.");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        console.log('[ProductInfo] User check:', user ? 'Logged in' : 'Not logged in');

        if (!user) {
            // 비회원 주문 폼 표시
            console.log('[ProductInfo] Showing guest form');
            setShowGuestForm(true);
            return;
        }

        // Fetch phone from profiles table (updated in mypage)
        const { data: profile } = await supabase
            .from('profiles')
            .select('phone, name')
            .eq('id', user.id)
            .single();

        const userName = profile?.name || user.user_metadata?.name || user.email || '';
        const userPhone = profile?.phone || user.user_metadata?.phone || '';

        await processOrder(user.id, userName, userPhone);
    };

    const processOrder = async (userId: string | null, userName: string, userPhone: string, guestPassword?: string) => {
        const totalPrice = (price + (corsageCount * 15000)) * quantity;

        const orderItem = {
            id,
            name,
            price: price + (corsageCount * 15000),
            image,
            quantity,
            options: {
                color,
                flowers,
                corsageCount
            }
        };

        const orderData = {
            user_id: userId, // null for guest
            customer_name: userName,
            customer_phone: userPhone,
            status: "pending",
            total_amount: totalPrice,
            items: [orderItem],
            wedding_date: weddingDate?.toISOString().split('T')[0], // Convert to YYYY-MM-DD
            wedding_time: weddingTime,
            venue: venue,
            pickup_location: pickupLocation,
            requests: requests
        };

        const result = await createOrder(
            orderData,
            userPhone,
            userName,
            guestPassword
        );

        if (!result.success) {
            console.error("Error creating order:", result.error);
            alert(`예약 접수 중 오류가 발생했습니다: ${result.error}`);
            return;
        }

        alert("예약 접수가 완료되었습니다.");
        if (userId) {
            router.push("/mypage");
        } else {
            // 비회원은 주문 조회 페이지나 홈으로 이동 (추후 주문 완료 페이지로 변경 권장)
            router.push("/");
        }
    };

    const handleGuestSubmit = async (guestInfo: { name: string; phone: string; password: string }) => {
        await processOrder(null, guestInfo.name, guestInfo.phone, guestInfo.password);
        setShowGuestForm(false);
        setShowReservationModal(false);
    };

    console.log('[ProductInfo] Render state - showGuestForm:', showGuestForm);

    return (
        <div className="w-full md:w-1/2 md:pl-20 md:sticky md:top-24 h-fit">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <p className="text-xs text-orie-text/60 mb-2 uppercase tracking-wider">{category || "웨딩 부케"}</p>
                    <h1 className="text-3xl font-serif font-normal text-orie-text mb-2">{name}</h1>
                </div>
            </div>

            {/* Price Hidden */}

            {/* Flower Details - Improved Design */}
            <div className="flex flex-col gap-4 mb-10 border-t border-b border-orie-text/10 py-8">
                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                    <span className="text-xs font-serif text-orie-text/60 uppercase tracking-widest">Color</span>
                    <span className="text-sm text-orie-text font-light">{color || "White & Green"}</span>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                    <span className="text-xs font-serif text-orie-text/60 uppercase tracking-widest">Flowers</span>
                    <span className="text-sm text-orie-text font-light leading-relaxed">{flowers || "Rose, Lisianthus, Tulip, Eucalyptus"}</span>
                </div>
            </div>

            <div className="mb-10">
                <p className="text-sm text-orie-text/80 leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-col gap-4">
                {/* Status Warning */}
                {status && status !== 'active' && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-800">
                        {status === 'archived' && '이 상품은 현재 판매가 중단되었습니다.'}
                        {status === 'draft' && '이 상품은 준비 중입니다.'}
                    </div>
                )}

                {/* Buttons */}
                <button
                    onClick={() => {
                        if (status && status !== 'active') {
                            alert('현재 예약이 불가능한 상품입니다.');
                            return;
                        }
                        setShowReservationModal(true);
                    }}
                    disabled={status !== 'active' && status !== undefined}
                    className={`w-full py-4 border border-orie-text text-sm font-semibold transition-opacity ${status === 'active' || status === undefined
                        ? 'bg-orie-text text-white hover:opacity-90'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {status === 'active' || status === undefined ? '예약하기' : '예약 불가'}
                </button>
            </div>

            {/* Reservation Modal */}
            {showReservationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-md p-6 max-h-[90vh] overflow-y-auto relative shadow-xl">
                        <button
                            onClick={() => setShowReservationModal(false)}
                            className="absolute top-4 right-4 text-orie-text hover:opacity-50"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <h3 className="text-xl font-serif mb-6 text-orie-text">예약 정보 입력</h3>

                        <BouquetOptions
                            weddingDate={weddingDate}
                            setWeddingDate={setWeddingDate}
                            weddingTime={weddingTime}
                            setWeddingTime={setWeddingTime}
                            venue={venue}
                            setVenue={setVenue}
                            pickupLocation={pickupLocation}
                            setPickupLocation={setPickupLocation}
                            corsageCount={corsageCount}
                            setCorsageCount={setCorsageCount}
                            requests={requests}
                            setRequests={setRequests}
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />

                        {showGuestForm ? (
                            <GuestOrderForm
                                onSubmit={handleGuestSubmit}
                                onCancel={() => setShowGuestForm(false)}
                            />
                        ) : (
                            <button
                                onClick={handleReserve}
                                className="w-full py-4 mt-6 bg-orie-text text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                            >
                                예약 하기
                            </button>
                        )}
                    </div>
                </div>
            )}

        </div >
    );
}
