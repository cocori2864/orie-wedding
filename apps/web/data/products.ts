// 웨딩 부케 상품 데이터
export const ALL_PRODUCTS = [
    { id: "1", name: "클래식 로즈 부케", price: 180000, category: "클래식", image: "/images/bouquet_01.png", color: "White", style: "Round" },
    { id: "2", name: "화이트 피오니 부케", price: 220000, category: "클래식", image: "/images/bouquet_02.png", color: "White", style: "Round" },
    { id: "3", name: "와일드 플라워 부케", price: 150000, category: "내추럴", image: "/images/bouquet_03.png", color: "Green", style: "Natural" },
    { id: "4", name: "유칼립투스 그린 부케", price: 160000, category: "내추럴", image: "https://images.unsplash.com/photo-1522057306606-8d84dceffe46?w=800&q=80", color: "Green", style: "Natural" },
    { id: "5", name: "블러쉬 핑크 부케", price: 200000, category: "로맨틱", image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800&q=80", color: "Pink", style: "Round" },
    { id: "6", name: "라벤더 드림 부케", price: 190000, category: "로맨틱", image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80", color: "Purple", style: "Natural" },
    { id: "7", name: "프리미엄 캐스케이드 부케", price: 350000, category: "프리미엄", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80", color: "White", style: "Drop" },
    { id: "8", name: "로얄 오키드 부케", price: 280000, category: "프리미엄", image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=800&q=80", color: "White", style: "Drop" },
];

export const CATEGORIES = ["전체", "클래식", "내추럴", "로맨틱", "프리미엄"];
export const COLORS = ["전체", "White", "Pink", "Peach", "Green", "Purple"];
export const STYLES = ["전체", "Round", "Drop", "Natural"];

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
    "1": {
        id: "1",
        name: "클래식 로즈 부케",
        price: 180000,
        category: "클래식",
        description: "순백의 장미와 그린 잎사귀가 조화롭게 어우러진 클래식한 웨딩 부케입니다. 영원한 사랑을 상징하는 장미로 특별한 날을 더욱 빛나게 해드립니다.",
        image: "/images/bouquet_01.png",
        flowers: "화이트 로즈 | 유칼립투스 | 피버퓨",
        color: "White",
        style: "Round",
    },
    "2": {
        id: "2",
        name: "화이트 피오니 부케",
        price: 220000,
        category: "클래식",
        description: "풍성하고 우아한 피오니로 구성된 프리미엄 부케입니다. 부드러운 꽃잎이 신부님의 아름다움을 한층 돋보이게 합니다.",
        image: "/images/bouquet_02.png",
        flowers: "화이트 피오니 | 라넌큘러스 | 더스티 밀러",
        color: "White",
        style: "Round",
    },
    "3": {
        id: "3",
        name: "와일드 플라워 부케",
        price: 150000,
        category: "내추럴",
        description: "자연스러운 들꽃의 매력을 담은 내추럴 스타일 부케입니다. 가든 웨딩이나 야외 결혼식에 완벽하게 어울립니다.",
        image: "/images/bouquet_03.png",
        flowers: "카모마일 | 레이스플라워 | 그린벨",
        color: "Green",
        style: "Natural",
    },
    "4": {
        id: "4",
        name: "유칼립투스 그린 부케",
        price: 160000,
        category: "내추럴",
        description: "싱그러운 유칼립투스와 그린 식물로 구성된 모던한 부케입니다. 미니멀하면서도 세련된 느낌을 원하시는 신부님께 추천드립니다.",
        image: "https://images.unsplash.com/photo-1522057306606-8d84dceffe46?w=800&q=80",
        flowers: "유칼립투스 | 올리브 | 아이비",
        color: "Green",
        style: "Natural",
    },
    "5": {
        id: "5",
        name: "블러쉬 핑크 부케",
        price: 200000,
        category: "로맨틱",
        description: "연한 핑크빛 장미와 꽃들이 로맨틱한 분위기를 연출하는 부케입니다. 사랑스럽고 여성스러운 이미지를 완성해 드립니다.",
        image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800&q=80",
        flowers: "블러쉬 로즈 | 스프레이 로즈 | 리시안셔스",
        color: "Pink",
        style: "Round",
    },
    "6": {
        id: "6",
        name: "라벤더 드림 부케",
        price: 190000,
        category: "로맨틱",
        description: "은은한 라벤더 컬러가 몽환적인 분위기를 자아내는 부케입니다. 향기로운 라벤더가 특별한 날의 추억을 더해줍니다.",
        image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80",
        flowers: "라벤더 | 라일락 | 스톡",
        color: "Purple",
        style: "Natural",
    },
    "7": {
        id: "7",
        name: "프리미엄 캐스케이드 부케",
        price: 350000,
        category: "프리미엄",
        description: "우아하게 흘러내리는 캐스케이드 스타일의 프리미엄 부케입니다. 클래식하고 고급스러운 웨딩을 꿈꾸시는 분께 추천드립니다.",
        image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80",
        flowers: "호접란 | 카라 | 아이비 | 장미",
        color: "White",
        style: "Drop",
    },
    "8": {
        id: "8",
        name: "로얄 오키드 부케",
        price: 280000,
        category: "프리미엄",
        description: "고급스러운 호접란으로 구성된 럭셔리 부케입니다. 우아함과 품격을 동시에 갖춘 특별한 부케로 최고의 순간을 장식하세요.",
        image: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=800&q=80",
        flowers: "호접란 | 덴파레 | 몬스테라",
        color: "White",
        style: "Drop",
    },
};
