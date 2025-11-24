-- ============================================
-- Remove Mock Data from Database
-- ============================================
-- 
-- 사용 방법:
-- 1. Supabase Dashboard 접속: https://supabase.com/dashboard
-- 2. 프로젝트 선택: sxrasjyjvjngqvrqkjnk
-- 3. 좌측 메뉴에서 "SQL Editor" 클릭
-- 4. 이 SQL을 복사하여 붙여넣기
-- 5. "Run" 버튼 클릭
--
-- ⚠️ 주의: 이 작업은 되돌릴 수 없습니다!
-- 실제 주문 데이터가 있다면 삭제되지 않도록 주의하세요.
-- ============================================

-- 1. 테스트/Mock 주문 데이터 삭제
-- (실제 사용자가 만든 주문은 보존하기 위해 특정 조건으로 삭제)
-- 예: created_at이 특정 날짜 이전인 것만 삭제

-- 옵션 A: 모든 주문 데이터 삭제 (주의!)
-- DELETE FROM order_items;
-- DELETE FROM orders;

-- 옵션 B: 특정 날짜 이전의 주문만 삭제 (더 안전)
-- DELETE FROM order_items 
-- WHERE order_id IN (
--     SELECT id FROM orders 
--     WHERE created_at < '2024-11-24'
-- );
-- DELETE FROM orders WHERE created_at < '2024-11-24';

-- 2. Mock 상품 데이터 확인
-- 현재 상품 목록 확인
SELECT id, name, category, status, created_at 
FROM products 
ORDER BY created_at DESC;

-- 3. Mock 상품 삭제 (필요한 경우)
-- 특정 상품만 삭제하려면 ID를 지정하세요
-- DELETE FROM products WHERE id = 'product-id-here';

-- 또는 모든 상품 삭제 (주의!)
-- DELETE FROM products;

-- 4. Mock 사용자 프로필 삭제 (선택사항)
-- 테스트 계정 삭제 (실제 사용자는 보존)
-- DELETE FROM profiles WHERE email LIKE '%test%' OR email LIKE '%mock%';

-- ============================================
-- 확인 쿼리
-- ============================================

-- 남아있는 주문 수 확인
SELECT COUNT(*) as order_count FROM orders;

-- 남아있는 상품 수 확인
SELECT COUNT(*) as product_count FROM products;

-- 남아있는 사용자 수 확인
SELECT COUNT(*) as user_count FROM profiles;

-- ============================================
-- 참고사항
-- ============================================
-- 
-- 실제 운영 환경에서는 데이터를 삭제하기 전에:
-- 1. 백업을 먼저 생성하세요
-- 2. 삭제할 데이터를 정확히 확인하세요
-- 3. WHERE 조건을 신중하게 설정하세요
-- 
-- Mock 데이터 대신 실제 상품 데이터를 추가하려면
-- SQL_UPDATE.md 파일을 참고하세요.
-- ============================================
