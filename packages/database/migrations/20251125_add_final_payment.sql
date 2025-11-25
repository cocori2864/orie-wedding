-- Add final payment columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS final_payment_amount INTEGER,
ADD COLUMN IF NOT EXISTS final_payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS final_payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS final_payment_request_amount INTEGER;

-- Add comment
COMMENT ON COLUMN orders.final_payment_amount IS '실제 결제된 잔금 금액';
COMMENT ON COLUMN orders.final_payment_request_amount IS '관리자가 요청한 잔금 금액';
COMMENT ON COLUMN orders.final_payment_status IS '잔금 결제 상태 (pending, paid, verification_pending)';
COMMENT ON COLUMN orders.final_payment_method IS '잔금 결제 수단 (card, transfer)';
COMMENT ON COLUMN orders.payment_id IS 'PG사 결제 고유 ID (imp_uid)';
