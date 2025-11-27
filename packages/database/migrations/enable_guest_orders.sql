-- Add guest_info column and make user_id nullable for guest orders

-- 1. Make user_id nullable
ALTER TABLE public.orders ALTER COLUMN user_id DROP NOT NULL;

-- 2. Add guest_info column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'orders' AND column_name = 'guest_info') THEN
        ALTER TABLE public.orders ADD COLUMN guest_info JSONB;
    END IF;
END $$;
