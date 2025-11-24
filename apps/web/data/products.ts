// 웨딩 부케 상품 데이터
export const ALL_PRODUCTS = [
    { id: "4", name: "피치 튤립 로맨스 부케", price: 190000, category: "로맨틱", image: "/images/bouquet_04.jpg", color: "Pink", style: "Round" },
    { id: "5", name: "모던 카라 릴리 부케", price: 210000, category: "클래식", image: "/images/bouquet_05.jpg", color: "White", style: "Drop" },
    { id: "6", name: "빈티지 수국 부케", price: 170000, category: "로맨틱", image: "/images/bouquet_06.jpg", color: "Purple", style: "Round" },
    { id: "7", name: "코랄 가든 로즈 부케", price: 230000, category: "프리미엄", image: "/images/bouquet_07.jpg", color: "Peach", style: "Natural" },
    { id: "8", name: "미니멀 오키드 부케", price: 250000, category: "프리미엄", image: "/images/bouquet_08.jpg", color: "White", style: "Drop" },
];

import { CATEGORIES as RAW_CATEGORIES, COLORS as RAW_COLORS, STYLES as RAW_STYLES } from "../lib/constants";

export const CATEGORIES = ["전체", ...RAW_CATEGORIES];
export const COLORS = ["전체", ...RAW_COLORS];
export const STYLES = ["전체", ...RAW_STYLES];

export const PRODUCT_DETAILS: Record<string, {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    flowers: string;
    color: string;
    style: string;
}> = {

    "4": {
        id: "4",
        name: "피치 튤립 로맨스 부케",
        price: 190000,
        category: "로맨틱",
        description: "피치와 핑크 톤의 튤립이 어우러진 로맨틱한 부케입니다. 부드러운 색감이 사랑스러운 신부님의 이미지를 완성해줍니다.",
        image: "/images/bouquet_04.jpg",
        flowers: "피치 튤립 | 핑크 튤립 | 스위트피",
        color: "Pink",
        style: "Round",
    },
    "5": {
        id: "5",
        name: "모던 카라 릴리 부케",
        price: 210000,
        category: "클래식",
        description: "심플하고 세련된 화이트 카라 릴리로 구성된 모던 부케입니다. 긴 줄기의 우아한 라인이 돋보이는 디자인입니다.",
        image: "/images/bouquet_05.jpg",
        flowers: "화이트 카라 | 베어그라스",
        color: "White",
        style: "Drop",
    },
    "6": {
        id: "6",
        name: "빈티지 수국 부케",
        price: 170000,
        category: "로맨틱",
        description: "블루와 퍼플 톤의 수국이 어우러진 빈티지 무드의 부케입니다. 파스텔 톤의 색감이 신비롭고 몽환적인 분위기를 자아냅니다.",
        image: "/images/bouquet_06.jpg",
        flowers: "블루 수국 | 퍼플 수국 | 델피늄",
        color: "Purple",
        style: "Round",
    },
    "7": {
        id: "7",
        name: "코랄 가든 로즈 부케",
        price: 230000,
        category: "프리미엄",
        description: "화사한 코랄 가든 로즈와 화이트 리시안셔스가 풍성하게 어우러진 가든 스타일 부케입니다. 자연스러운 아름다움이 돋보입니다.",
        image: "/images/bouquet_07.jpg",
        flowers: "코랄 가든 로즈 | 리시안셔스 | 유칼립투스",
        color: "Peach",
        style: "Natural",
    },
    "8": {
        id: "8",
        name: "미니멀 오키드 부케",
        price: 250000,
        category: "프리미엄",
        description: "화이트 오키드와 그린 소재가 흐르는 듯한 라인을 만드는 미니멀하고 고급스러운 부케입니다. 특별한 날, 품격을 더해줍니다.",
        image: "/images/bouquet_08.jpg",
        flowers: "화이트 오키드 | 스마일락스 | 몬스테라",
        color: "White",
        style: "Drop",
    },
};
