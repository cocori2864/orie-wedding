-- 1. Add category column if not exists
ALTER TABLE products ADD COLUMN IF NOT EXISTS category text;

-- 2. Insert Products (5 for each category)
-- Note: Using the same image for each category for demonstration. 
-- In a real scenario, you would upload unique images to Supabase Storage.
INSERT INTO products (name, description, price, image, category, stock) VALUES
-- Shooting Bouquets
('Sunset Coral Bouquet', '강렬한 코랄과 피치 컬러가 어우러진 촬영용 오버사이즈 부케', 250000, '/images/shooting.png', 'shooting', 10),
('Wild Blue Delphinium', '딥 블루 델피늄을 사용하여 신비로운 분위기를 연출하는 촬영 부케', 280000, '/images/shooting.png', 'shooting', 8),
('Vintage Garden Rose', '빈티지한 가든 장미와 내추럴한 그린 소재의 조화', 230000, '/images/shooting.png', 'shooting', 12),
('Bohemian Chic', '자유분방한 쉐입과 텍스처가 돋보이는 보헤미안 스타일 부케', 260000, '/images/shooting.png', 'shooting', 10),
('Dramatic Red', '강렬한 레드 컬러로 포인트가 되는 드라마틱한 촬영 부케', 270000, '/images/shooting.png', 'shooting', 7),

-- Wedding Bouquets
('Pure White Peony', '순백의 작약으로 완성한 클래식하고 우아한 본식 부케', 350000, '/images/wedding.png', 'wedding', 5),
('Elegant Lily of the Valley', '은방울꽃의 청초함을 담은 하이엔드 웨딩 부케', 450000, '/images/wedding.png', 'wedding', 3),
('Classic Rose Round', '가장 클래식한 화이트 장미 라운드 부케', 300000, '/images/wedding.png', 'wedding', 8),
('Soft Peach Juliet', '줄리엣 로즈의 사랑스러운 피치 컬러가 돋보이는 부케', 320000, '/images/wedding.png', 'wedding', 6),
('Graceful Calla Lily', '카라의 우아한 라인을 살려 세련미를 강조한 부케', 330000, '/images/wedding.png', 'wedding', 5),

-- Others
('Groom Boutonniere', '신랑님의 턱시도에 품격을 더해주는 고급 부토니에', 30000, '/images/etc.png', 'etc', 50),
('Parent Corsage Set', '양가 부모님을 위한 우아한 코사지 세트 (4ea)', 100000, '/images/etc.png', 'etc', 20),
('Bridal Crown', '화관으로 연출하는 로맨틱한 헤어 장식', 80000, '/images/etc.png', 'etc', 15),
('Reception Centerpiece', '포토테이블을 장식하는 미니 센터피스', 150000, '/images/etc.png', 'etc', 10),
('Flower Shower Petals', '축복의 순간을 위한 생화 플라워 샤워', 50000, '/images/etc.png', 'etc', 30);
