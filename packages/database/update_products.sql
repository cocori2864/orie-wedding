-- Delete old products and keep only AI-generated ones
-- First, delete all existing products
DELETE FROM public.products;

-- Insert only the 5 Gemini-generated products
INSERT INTO public.products (name, price, category, image, color, style, flowers, description, stock) VALUES
('피치 튤립 로맨스 부케', 190000, '로맨틱', '/images/bouquet_04.png', 'Pink', 'Round', '피치 튤립, 핑크 튤립, 스위트피', '피치와 핑크 톤의 튤립이 어우러진 로맨틱한 부케입니다. 부드러운 색감이 사랑스러운 신부님의 이미지를 완성해줍니다.', 10),
('모던 카라 릴리 부케', 210000, '클래식', '/images/bouquet_05.png', 'White', 'Drop', '화이트 카라, 베어그라스', '심플하고 세련된 화이트 카라 릴리로 구성된 모던 부케입니다. 긴 줄기의 우아한 라인이 돋보이는 디자인입니다.', 8),
('빈티지 수국 부케', 170000, '로맨틱', '/images/bouquet_06.png', 'Purple', 'Round', '블루 수국, 퍼플 수국, 델피늄', '블루와 퍼플 톤의 수국이 어우러진 빈티지 무드의 부케입니다. 파스텔 톤의 색감이 신비롭고 몽환적인 분위기를 자아냅니다.', 12),
('코랄 가든 로즈 부케', 230000, '프리미엄', '/images/bouquet_07.png', 'Peach', 'Natural', '코랄 가든 로즈, 리시안셔스, 유칼립투스', '화사한 코랄 가든 로즈와 화이트 리시안셔스가 풍성하게 어우러진 가든 스타일 부케입니다. 자연스러운 아름다움이 돋보입니다.', 5),
('미니멀 오키드 부케', 250000, '프리미엄', '/images/bouquet_08.png', 'White', 'Drop', '화이트 오키드, 스마일락스, 몬스테라', '화이트 오키드와 그린 소재가 흐르는 듯한 라인을 만드는 미니멀하고 고급스러운 부케입니다. 특별한 날, 품격을 더해줍니다.', 3);
