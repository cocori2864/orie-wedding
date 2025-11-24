-- ============================================
-- ORIE Wedding - Admin 계정 설정 SQL
-- ============================================
-- 
-- 사용 방법:
-- 1. Supabase Dashboard 접속: https://supabase.com/dashboard
-- 2. 프로젝트 선택: sxrasjyjvjngqvrqkjnk
-- 3. 좌측 메뉴에서 "SQL Editor" 클릭
-- 4. 이 SQL을 복사하여 붙여넣기
-- 5. "Run" 버튼 클릭
--
-- ============================================

-- 1. cocori2864@gmail.com 계정을 admin으로 설정
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'cocori2864@gmail.com';

-- 2. 설정 확인
SELECT id, email, name, role, created_at
FROM profiles
WHERE email = 'cocori2864@gmail.com';

-- ============================================
-- 예상 결과:
-- role 컬럼이 'admin'으로 변경되어야 합니다.
-- ============================================

-- 참고: 만약 계정이 아직 생성되지 않았다면
-- 먼저 웹사이트에서 회원가입을 진행하세요:
-- 1. http://localhost:3000/signup 접속
-- 2. 이메일: cocori2864@gmail.com
-- 3. 비밀번호: rlarla2864!
-- 4. 회원가입 완료 후 위 SQL 실행
