# 🚀 완벽한 배포를 위한 체크리스트

## ✅ 1단계: Supabase 데이터베이스 설정

### 📝 SQL 스키마 실행

1. **Supabase Dashboard 접속**
   - URL: https://supabase.com/dashboard
   - 프로젝트: `sxrasjyjvjngqvrqkjnk`

2. **SQL Editor 열기**
   - 좌측 메뉴 → **SQL Editor** 클릭
   - **New Query** 버튼 클릭

3. **SQL 복사 & 실행**
   - 아래 SQL 전체를 복사
   - SQL Editor에 붙여넣기
   - **Run** 버튼 클릭 (또는 Ctrl/Cmd + Enter)

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  name text,
  phone text,
  role text default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price integer not null,
  category text,
  image text,
  stock integer default 0,
  color text,
  style text,
  flowers text,
  status text default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  guest_info jsonb,
  total_amount integer not null,
  status text default 'pending',
  payment_method text,
  delivery_method text,
  delivery_info jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Order Items Table
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null,
  price_at_purchase integer not null,
  options jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies
create policy "Public products are viewable by everyone" on public.products
  for select using (true);

create policy "Admins can insert products" on public.products
  for insert with check (auth.uid() in (select id from public.profiles where role = 'admin'));

create policy "Admins can update products" on public.products
  for update using (auth.uid() in (select id from public.profiles where role = 'admin'));

create policy "Users can see own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can see own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Admins can see all orders" on public.orders
  for select using (auth.uid() in (select id from public.profiles where role = 'admin'));

create policy "Users can insert own orders" on public.orders
  for insert with check (auth.uid() = user_id);

-- Function for new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'name', 'customer');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert Initial Products
insert into public.products (name, price, category, image, color, style, flowers, description, stock) values
('클래식 로즈 부케', 180000, '클래식', '/images/bouquet_01.png', 'White', 'Round', 'White Rose, Eucalyptus', '순백의 장미와 그린 잎사귀가 조화롭게 어우러진 클래식한 웨딩 부케입니다.', 10),
('화이트 피오니 부케', 220000, '클래식', '/images/bouquet_02.png', 'White', 'Round', 'Peony, Ranunculus', '풍성하고 우아한 피오니로 구성된 프리미엄 부케입니다.', 5),
('와일드 플라워 부케', 150000, '내추럴', '/images/bouquet_03.png', 'Green', 'Natural', 'Chamomile, Lace Flower', '자연스러운 들꽃의 매력을 담은 내추럴 스타일 부케입니다.', 15),
('유칼립투스 그린 부케', 160000, '내추럴', 'https://images.unsplash.com/photo-1522057306606-8d84dceffe46?w=800&q=80', 'Green', 'Natural', 'Eucalyptus, Olive', '유칼립투스와 올리브 가지로 구성된 그린 부케입니다.', 12),
('블러쉬 핑크 부케', 200000, '로맨틱', 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=800&q=80', 'Pink', 'Round', 'Pink Rose, Peony', '부드러운 핑크 톤의 로맨틱한 부케입니다.', 8),
('라벤더 드림 부케', 190000, '로맨틱', 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80', 'Purple', 'Natural', 'Lavender, Lilac', '라벤더와 라일락의 향기로운 부케입니다.', 10),
('프리미엄 캐스케이드 부케', 350000, '프리미엄', 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80', 'White', 'Drop', 'Orchid, Calla Lily', '우아한 캐스케이드 스타일의 프리미엄 부케입니다.', 3),
('로얄 오키드 부케', 280000, '프리미엄', 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?w=800&q=80', 'White', 'Drop', 'Orchid, Rose', '고급스러운 오키드로 구성된 럭셔리 부케입니다.', 5);
```

4. **실행 확인**
   - 성공 메시지 확인
   - 좌측 메뉴 → **Table Editor** → `products` 테이블에 8개 상품 확인

---

## ⏸️ **SQL 실행 완료 후 알려주세요!**

실행이 완료되면 다음 단계로 진행하겠습니다:
- 2단계: 장바구니 → 주문 연동
- 3단계: 관리자 페이지 실제 데이터 연동
- 4단계: Vercel 배포

**SQL 실행 중 에러가 발생하면 바로 알려주세요!**
