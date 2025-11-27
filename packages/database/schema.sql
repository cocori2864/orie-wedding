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

-- Allow anonymous users to create orders
create policy "Everyone can create orders" on public.orders
  for insert with check (true);

-- Order Items:
create policy "Users can see own order items" on public.order_items
  for select using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Admins can see all order items" on public.order_items
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

create policy "Everyone can create order items" on public.order_items
  for insert with check (true);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, phone, role)
  values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'phone', 'customer');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Insert Initial Mock Data
insert into public.products (name, price, category, image, color, style, flowers, description, stock) values
('Classic Rose Bouquet', 180000, 'Classic', '/images/bouquet_01.png', 'White', 'Round', 'White Rose, Eucalyptus', 'Elegant classic rose bouquet.', 10),
('White Peony Bouquet', 220000, 'Classic', '/images/bouquet_02.png', 'White', 'Round', 'Peony, Ranunculus', 'Rich and fluffy peony bouquet.', 5),
('Wild Flower Bouquet', 150000, 'Natural', '/images/bouquet_03.png', 'Green', 'Natural', 'Chamomile, Lace Flower', 'Natural wild flower style.', 15);
