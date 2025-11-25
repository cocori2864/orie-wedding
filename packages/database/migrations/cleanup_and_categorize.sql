-- 1. Add category column if not exists
ALTER TABLE products ADD COLUMN IF NOT EXISTS category text;

-- 2. Delete order_items that reference products we want to delete
-- (This removes the foreign key constraint issue)
DELETE FROM order_items 
WHERE product_id IN (
    SELECT id FROM products 
    WHERE name NOT IN (
        '피치 튤립 로맨스 부케',
        '모던 카라 릴리 부케',
        '빈티지 수국 부케',
        '코랄 가든 로즈 부케',
        '미니멀 오키드 부케'
    )
);

-- 3. Delete all products except the 5 specified ones
DELETE FROM products 
WHERE name NOT IN (
    '피치 튤립 로맨스 부케',
    '모던 카라 릴리 부케',
    '빈티지 수국 부케',
    '코랄 가든 로즈 부케',
    '미니멀 오키드 부케'
);

-- 4. Update categories for the remaining products
-- 촬영부케 (2개)
UPDATE products SET category = 'shooting' 
WHERE name IN ('피치 튤립 로맨스 부케', '빈티지 수국 부케');

-- 본식부케 (3개)
UPDATE products SET category = 'wedding' 
WHERE name IN ('모던 카라 릴리 부케', '코랄 가든 로즈 부케', '미니멀 오키드 부케');
