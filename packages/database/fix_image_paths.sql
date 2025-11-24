-- Update image paths from .png to .jpg for the 5 new products
UPDATE public.products 
SET image = '/images/bouquet_04.jpg' 
WHERE name = '피치 튤립 로맨스 부케';

UPDATE public.products 
SET image = '/images/bouquet_05.jpg' 
WHERE name = '모던 카라 릴리 부케';

UPDATE public.products 
SET image = '/images/bouquet_06.jpg' 
WHERE name = '빈티지 수국 부케';

UPDATE public.products 
SET image = '/images/bouquet_07.jpg' 
WHERE name = '코랄 가든 로즈 부케';

UPDATE public.products 
SET image = '/images/bouquet_08.jpg' 
WHERE name = '미니멀 오키드 부케';
