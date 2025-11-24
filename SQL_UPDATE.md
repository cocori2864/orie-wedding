# 기존 테이블이 있을 때 실행할 SQL

## 옵션 1: 상품만 추가 (기존 데이터 유지)

```sql
-- 기존 상품 삭제 후 새로 추가
DELETE FROM public.products;

-- 상품 8개 추가
INSERT INTO public.products (name, price, category, image, color, style, flowers, description, stock) VALUES
('클래식 로즈 부케', 180000, '클래식', '/images/bouquet_01.png', 'White', 'Round', 'White Rose, Eucalyptus', '순백의 장미와 그린 잎사귀가 조화롭게 어우러진 클래식한 웨딩 부케입니다.', 10),
('화이트 피오니 부케', 220000, '클래식', '/images/bouquet_02.png', 'White', 'Round', 'Peony, Ranunculus', '풍성하고 우아한 피오니로 구성된 프리미엄 부케입니다.', 5),
('와일드 플라워 부케', 150000, '내추럴', '/images/bouquet_03.png', 'Green', 'Natural', 'Chamomile, Lace Flower', '자연스러운 들꽃의 매력을 담은 내추럴 스타일 부케입니다.', 15),
('유칼립투스 그린 부케', 160000, '내추럴', 'https://images.unsplash.com/photo-1522057306606-8d84dceffe46?w=800&q=80', 'Green', 'Natural', 'Eucalyptus, Olive', '유칼립투스와 올리브 가지로 구성된 그린 부케입니다.', 12),
('블러쉬 핑크 부케', 200000, '로맨틱', 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800&q=80', 'Pink', 'Round', 'Pink Rose, Peony', '부드러운 핑크 톤의 로맨틱한 부케입니다.', 8),
('라벤더 드림 부케', 190000, '로맨틱', 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80', 'Purple', 'Natural', 'Lavender, Lilac', '라벤더와 라일락의 향기로운 부케입니다.', 10),
('프리미엄 캐스케이드 부케', 350000, '프리미엄', 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80', 'White', 'Drop', 'Orchid, Calla Lily', '우아한 캐스케이드 스타일의 프리미엄 부케입니다.', 3),
('로얄 오키드 부케', 280000, '프리미엄', 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=800&q=80', 'White', 'Drop', 'Orchid, Rose', '고급스러운 오키드로 구성된 럭셔리 부케입니다.', 5);
```

---

## 옵션 2: 처음부터 다시 시작 (모든 데이터 삭제)

⚠️ **주의: 모든 데이터가 삭제됩니다!**

```sql
-- 모든 테이블 삭제
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 트리거 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 그 다음 DEPLOYMENT_CHECKLIST.md의 전체 SQL 실행
```

---

## 추천: 옵션 1 사용

기존 회원가입한 계정을 유지하면서 상품만 추가하는 것이 좋습니다.

**위의 "옵션 1" SQL을 복사해서 실행해주세요!**
