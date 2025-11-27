-- Create daily_capacity table
create table if not exists public.daily_capacity (
  date date primary key,
  max_slots integer not null, -- If present, this is the limit. 0 means blocked.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.daily_capacity enable row level security;

-- Policies
create policy "Everyone can read daily capacity" on public.daily_capacity
  for select using (true);

create policy "Admins can manage daily capacity" on public.daily_capacity
  for all using (
    auth.uid() in (select id from public.profiles where role = 'admin')
  );
