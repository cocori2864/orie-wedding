"use client";

import { useEffect } from "react";

interface AddressSearchProps {
    onComplete: (address: { address: string; zonecode: string }) => void;
}

declare global {
    interface Window {
        daum: any;
    }
}

export default function AddressSearch({ onComplete }: AddressSearchProps) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleOpenPostcode = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data: any) {
                    onComplete({
                        address: data.address,
                        zonecode: data.zonecode,
                    });
                },
            }).open();
        } else {
            alert("주소 찾기 스크립트를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleOpenPostcode}
            className="px-4 py-3 bg-gray-100 text-orie-text text-sm font-medium hover:bg-gray-200 transition-colors rounded-sm whitespace-nowrap"
        >
            주소 찾기
        </button>
    );
}
