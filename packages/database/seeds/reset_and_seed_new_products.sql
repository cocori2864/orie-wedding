-- 1. Clean up existing data (Delete order_items first to avoid FK constraint errors)
DELETE FROM order_items;
DELETE FROM products;

-- 2. Insert New Products using images from samplepics2
INSERT INTO products (name, description, price, image, category, stock) VALUES
-- Shooting Bouquets (8 items)
('Shooting Bouquet 01', '자연스러운 무드의 촬영용 부케', 250000, '/images/IMG_5307.JPG', 'shooting', 10),
('Shooting Bouquet 02', '화사한 색감의 촬영 부케', 260000, '/images/IMG_6113.JPG', 'shooting', 10),
('Shooting Bouquet 03', '빈티지 스타일 촬영 부케', 240000, '/images/IMG_7072.jpeg', 'shooting', 10),
('Shooting Bouquet 04', '내추럴 그린 촬영 부케', 230000, '/images/IMG_7077.jpeg', 'shooting', 10),
('Shooting Bouquet 05', '오버사이즈 촬영 부케', 280000, '/images/IMG_9244.JPG', 'shooting', 10),
('Shooting Bouquet 06', '유니크한 쉐입의 촬영 부케', 270000, '/images/IMG_9245.JPG', 'shooting', 10),
('Shooting Bouquet 07', '로맨틱 핑크 촬영 부케', 250000, '/images/IMG_9246.JPG', 'shooting', 10),
('Shooting Bouquet 08', '딥한 컬러감의 촬영 부케', 260000, '/images/IMG_9247.JPG', 'shooting', 10),

-- Wedding Bouquets (8 items)
('Wedding Bouquet 01', '클래식 화이트 본식 부케', 350000, '/images/IMG_9248.JPG', 'wedding', 5),
('Wedding Bouquet 02', '우아한 카라 본식 부케', 330000, '/images/IMG_9252.JPG', 'wedding', 5),
('Wedding Bouquet 03', '사랑스러운 믹스 본식 부케', 320000, '/images/IMG_9253.JPG', 'wedding', 5),
('Wedding Bouquet 04', '고급스러운 튤립 본식 부케', 300000, '/images/IMG_9254.JPG', 'wedding', 5),
('Wedding Bouquet 05', '청순한 은방울꽃 본식 부케', 450000, '/images/IMG_9255.JPG', 'wedding', 5),
('Wedding Bouquet 06', '화려한 작약 본식 부케', 380000, '/images/IMG_9256.JPG', 'wedding', 5),
('Wedding Bouquet 07', '심플한 장미 본식 부케', 290000, '/images/IMG_9257.JPG', 'wedding', 5),
('Wedding Bouquet 08', '내추럴 가든 본식 부케', 310000, '/images/IMG_9258.JPG', 'wedding', 5),

-- Others (7 items)
('Corsage Set', '혼주 코사지 세트', 100000, '/images/IMG_9259.JPG', 'etc', 20),
('Groom Boutonniere', '신랑 부토니에', 30000, '/images/IMG_9260.JPG', 'etc', 20),
('Centerpiece S', '미니 센터피스', 80000, '/images/IMG_9261.JPG', 'etc', 10),
('Centerpiece M', '테이블 센터피스', 150000, '/images/IMG_9262.JPG', 'etc', 10),
('Flower Basket', '플라워 바스켓', 120000, '/images/IMG_9263.JPG', 'etc', 10),
('Vase Arrangement', '화병 꽂이', 90000, '/images/IMG_9264.JPG', 'etc', 10),
('Gift Flower', '선물용 꽃다발', 70000, '/images/IMG_9265.JPG', 'etc', 10);
