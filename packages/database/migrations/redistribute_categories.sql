-- Redistribute products into SIMPLE, PREMIUM, CUSTOM, ETC

-- 1. SIMPLE (6 items) - Natural & Basic styles
UPDATE products SET category = 'simple' WHERE name IN (
    'Shooting Bouquet 01', 'Shooting Bouquet 02', 
    'Shooting Bouquet 03', 'Shooting Bouquet 04',
    'Wedding Bouquet 07', 'Wedding Bouquet 08'
);

-- 2. PREMIUM (6 items) - Luxurious & Classic styles
UPDATE products SET category = 'premium' WHERE name IN (
    'Wedding Bouquet 01', 'Wedding Bouquet 02', 
    'Wedding Bouquet 04', 'Wedding Bouquet 05',
    'Wedding Bouquet 06', 'Shooting Bouquet 07'
);

-- 3. CUSTOM (6 items) - Unique & Oversized styles
UPDATE products SET category = 'custom' WHERE name IN (
    'Shooting Bouquet 05', 'Shooting Bouquet 06', 
    'Shooting Bouquet 08', 'Wedding Bouquet 03',
    'Centerpiece M', 'Vase Arrangement'
);

-- 4. ETC (5 items) - Accessories
UPDATE products SET category = 'etc' WHERE name IN (
    'Corsage Set', 'Groom Boutonniere', 
    'Centerpiece S', 'Flower Basket', 'Gift Flower'
);
