"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { BouquetOptions } from "./BouquetOptions";

interface ProductInfoProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
    category?: string;
    flowers?: string;
    color?: string;
}

export function ProductInfo({ id, name, price, description, image, category, flowers, color }: ProductInfoProps) {
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

        if (!user) {
            if (confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?")) {
                router.push("/login");
            }
            return;
        }

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

        const { error } = await supabase.from("orders").insert({
            user_id: user.id,
            customer_name: user.user_metadata?.name || user.email,
            customer_phone: user.user_metadata?.phone || "",
            status: "pending",
            total_amount: totalPrice,
            items: [orderItem],
            wedding_date: weddingDate,
            wedding_time: weddingTime,
            venue: venue,
            pickup_location: pickupLocation,
            requests: requests
        });

        if (error) {
            console.error("Error creating order:", error);
            alert(`예약 접수 중 오류가 발생했습니다: ${error.message}`);
            return;
        }

        alert("예약 접수가 완료되었습니다.");
        router.push("/mypage");
    };

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
                {/* Buttons */}
                <button
                    onClick={() => setShowReservationModal(true)}
                    className="w-full py-4 border border-orie-text bg-orie-text text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                    예약하기
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

                        <button
                            onClick={handleReserve}
                            className="w-full py-4 mt-6 bg-orie-text text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                            예약 하기
                        </button>
                    </div>
                </div>
            )}

        </div >
    );
}
