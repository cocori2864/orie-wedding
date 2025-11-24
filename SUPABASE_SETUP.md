# Supabase 설정 가이드

## 1단계: SQL 스키마 실행

### 방법:
1. Supabase Dashboard 접속: https://supabase.com/dashboard
2. 프로젝트 선택: `sxrasjyjvjngqvrqkjnk`
3. 좌측 메뉴에서 **SQL Editor** 클릭
4. **New Query** 버튼 클릭
5. 아래 SQL 전체를 복사하여 붙여넣기
6. **Run** 버튼 클릭 (또는 Ctrl/Cmd + Enter)

### 실행할 SQL:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Users Table (Managed by Supabase Auth, but we can add a profile table)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  name text,
  phone text,
  role text default 'customer', -- 'customer', 'admin'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Products Table
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price integer not null,
  category text, -- 'Classic', 'Natural', 'Romantic', 'Premium'
  image text,
  stock integer default 0,
  color text, -- 'White', 'Pink', etc.
  style text, -- 'Round', 'Drop', etc.
  flowers text, -- 'Rose, Lily'
  status text default 'active', -- 'active', 'draft', 'archived'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Orders Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  guest_info jsonb, -- If guest checkout: { name, phone, email }
  total_amount integer not null,
  status text default 'pending', -- 'pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled'
  payment_method text,
  delivery_method text, -- 'quick', 'pickup'
  delivery_info jsonb, -- { date, time, address, detailAddress, note }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Order Items Table
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  quantity integer not null,
  price_at_purchase integer not null,
  options jsonb, -- e.g. { boutonniere: true, corsage: false }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies (Simplified for initial setup)

-- Products: Everyone can read active products, only admins can insert/update
create policy "Public products are viewable by everyone" on public.products
  for select using (true);

create policy "Admins can insert products" on public.products
  for insert with check (auth.uid() in (select id from public.profiles where role = 'admin'));

create policy "Admins can update products" on public.products
  for update using (auth.uid() in (select id from public.profiles where role = 'admin'));

-- Profiles: Users can read/update their own profile
create policy "Users can see own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Orders: Users can see their own orders, Admins can see all
create policy "Users can see own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Admins can see all orders" on public.orders
  for select using (auth.uid() in (select id from public.profiles where role = 'admin'));

-- Function to handle new user signup
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

-- Insert Initial Mock Data
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

---

## 2단계: 이메일 인증 비활성화 (개발용)

### 방법:
1. Supabase Dashboard → **Authentication** → **Settings**
2. **Email Auth** 섹션 찾기
3. **Confirm email** 옵션을 **OFF**로 설정
4. **Save** 버튼 클릭

이렇게 하면 회원가입 시 이메일 인증 없이 바로 로그인할 수 있습니다.

---

## 3단계: 테스트

### 회원가입 테스트:
1. 브라우저에서 `http://localhost:3000/signup` 접속
2. 이름, 이메일, 비밀번호 입력
3. 회원가입 완료

### 로그인 테스트:
1. `http://localhost:3000/login` 접속
2. 방금 가입한 이메일/비밀번호로 로그인
3. 마이페이지 확인

### 상품 확인:
1. `http://localhost:3000/shop` 접속
2. 8개의 부케 상품이 표시되는지 확인

---

## ✅ 완료 체크리스트

- [ ] SQL 스키마 실행 완료
- [ ] 이메일 인증 비활성화
- [ ] 회원가입 테스트 성공
- [ ] 로그인 테스트 성공
- [ ] 상품 8개 표시 확인

---

## 🆘 문제 발생 시

### "relation already exists" 에러
- 이미 테이블이 존재합니다. SQL Editor에서 기존 테이블을 삭제하거나 새 프로젝트를 만드세요.

### 로그인 안 됨
- 이메일 인증 설정을 확인하세요.
- 환경 변수(.env.local)가 올바른지 확인하세요.

### 상품이 안 보임
- SQL의 INSERT 부분이 실행되었는지 확인하세요.
- Table Editor에서 products 테이블에 데이터가 있는지 확인하세요.
