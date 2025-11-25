-- 사용자가 자신의 주문을 취소(상태 변경)할 수 있도록 Update 권한 부여
CREATE POLICY "Users can update their own orders"
ON orders FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
