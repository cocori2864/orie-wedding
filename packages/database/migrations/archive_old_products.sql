-- Step 1: Set all old products to 'archived' status
-- This will hide them from the website
UPDATE public.products 
SET status = 'archived' 
WHERE name NOT IN (
    '피치 튤립 로맨스 부케',
    '모던 카라 릴리 부케',
    '빈티지 수국 부케',
    '코랄 가든 로즈 부케',
    '미니멀 오키드 부케'
);

-- Step 2: Make sure the new products are active
UPDATE public.products 
SET status = 'active' 
WHERE name IN (
    '피치 튤립 로맨스 부케',
    '모던 카라 릴리 부케',
    '빈티지 수국 부케',
    '코랄 가든 로즈 부케',
    '미니멀 오키드 부케'
);
