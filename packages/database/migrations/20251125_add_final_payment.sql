-- Add final payment columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS final_payment_amount INTEGER,
ADD COLUMN IF NOT EXISTS final_payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS final_payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_id TEXT;

-- Add comment
COMMENT ON COLUMN orders.final_payment_amount IS '잔금 결제 금액';
COMMENT ON COLUMN orders.final_payment_status IS '잔금 결제 상태 (pending, paid)';
COMMENT ON COLUMN orders.final_payment_method IS '잔금 결제 수단 (card, transfer, simple_pay)';
COMMENT ON COLUMN orders.payment_id IS 'PG사 결제 고유 ID (imp_uid)';
