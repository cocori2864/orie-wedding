# 🧪 ORIE Wedding - 전체 테스트 가이드

## ✅ 현재 상태

- ✅ 고객 웹사이트: http://localhost:3000
- ✅ 관리자 패널: http://localhost:3001
- ✅ 환경 변수 설정 완료
- ✅ Supabase 연결 완료

---

## 📋 테스트 순서

### 1단계: Admin 계정 설정 (5분)

#### A. 회원가입
1. 브라우저에서 http://localhost:3000/signup 접속
2. 다음 정보로 회원가입:
   - 이메일: `cocori2864@gmail.com`
   - 비밀번호: `rlarla2864!`
   - 이름: 원하는 이름 입력
3. 회원가입 완료

#### B. Admin 권한 부여
1. Supabase Dashboard 접속: https://supabase.com/dashboard
2. 프로젝트 선택: `sxrasjyjvjngqvrqkjnk`
3. 좌측 메뉴에서 **SQL Editor** 클릭
4. `admin_setup.sql` 파일의 내용을 복사하여 붙여넣기
5. **Run** 버튼 클릭
6. 결과에서 `role`이 `'admin'`으로 변경되었는지 확인

---

### 2단계: 고객 사이트 테스트 (10분)

#### A. 상품 둘러보기
1. http://localhost:3000 접속
2. 메인 페이지 확인
3. "Shop" 메뉴 클릭
4. 상품 목록 확인 (8개의 부케가 표시되어야 함)
5. 상품 하나 클릭하여 상세 페이지 확인

#### B. 장바구니 & 주문
1. 상품 상세 페이지에서 "Add to Cart" 클릭
2. 우측 상단 장바구니 아이콘 클릭
3. 장바구니에 상품이 담겼는지 확인
4. "Checkout" 버튼 클릭
5. 배송 정보 입력:
   - 이름, 전화번호, 주소 입력
   - 배송 방법 선택 (빠른 배송 또는 픽업)
   - 배송 날짜/시간 선택
6. "주문하기" 버튼 클릭
7. 주문 완료 페이지 확인

#### C. MyPage 확인
1. 우측 상단 프로필 아이콘 클릭
2. "My Page" 선택
3. 방금 주문한 내역이 표시되는지 확인
4. 주문 번호, 날짜, 상태, 금액 확인

---

### 3단계: Admin 패널 테스트 (15분)

#### A. Admin 로그인
1. http://localhost:3001/login 접속
2. 로그인:
   - 이메일: `cocori2864@gmail.com`
   - 비밀번호: `rlarla2864!`
3. Dashboard로 이동

#### B. Dashboard 확인
1. 통계 카드 확인:
   - New Orders
   - Payment Pending
   - Preparing
   - Delivered
2. "Recent Orders" 테이블 확인:
   - 방금 생성한 주문이 표시되는지 확인
   - 고객 이름, 금액, 상태 확인
3. "New Users" 섹션 확인

#### C. Orders 페이지 테스트
1. 좌측 메뉴에서 "주문 관리" 클릭
2. 주문 목록 확인
3. **필터 테스트**:
   - 상태 드롭다운에서 "결제 완료" 선택
   - 해당 상태의 주문만 표시되는지 확인
4. **검색 테스트**:
   - 검색창에 주문 번호 일부 입력
   - 검색 결과 확인

#### D. Products 페이지 테스트
1. 좌측 메뉴에서 "상품 관리" 클릭
2. 상품 목록 확인
3. **필터 테스트**:
   - 카테고리 선택 (Classic, Natural, Romantic, Premium)
   - 상태 선택 (Active, Out of Stock, Archived)
4. **검색 테스트**:
   - 검색창에 상품명 입력 (예: "Rose")
   - 검색 결과 확인
5. **상품 수정 테스트**:
   - 상품 하나의 "Edit" 아이콘 클릭
   - 상품 정보 수정 (예: 가격 변경)
   - "Save Changes" 버튼 클릭
   - 상품 목록으로 돌아가서 변경사항 확인

---

### 4단계: 보안 테스트 (5분)

#### A. 권한 체크
1. 브라우저 시크릿 모드 열기
2. http://localhost:3001 접속
3. 로그인 페이지로 리다이렉트되는지 확인
4. 일반 고객 계정으로 로그인 시도
5. 로그인 페이지로 다시 리다이렉트되는지 확인 (Unauthorized 메시지)

#### B. 결제 실패 페이지
1. http://localhost:3000/payment/fail?message=테스트+에러 접속
2. 에러 페이지가 정상적으로 표시되는지 확인
3. "다시 결제하기" 버튼 클릭하여 체크아웃 페이지로 이동하는지 확인

---

### 5단계: SEO 확인 (3분)

#### A. 메타데이터 확인
1. http://localhost:3000 접속
2. 브라우저에서 우클릭 → "페이지 소스 보기"
3. `<title>` 태그 확인: "ORIÉ - Wedding Bouquet Shop"
4. Open Graph 메타 태그 확인

#### B. 상품 페이지 메타데이터
1. 상품 상세 페이지 접속
2. 페이지 소스 보기
3. `<title>` 태그에 상품명이 포함되어 있는지 확인
4. Open Graph 이미지 태그 확인

---

## ✅ 체크리스트

### 고객 사이트
- [ ] 회원가입 성공
- [ ] 로그인 성공
- [ ] 상품 목록 표시
- [ ] 상품 상세 페이지 표시
- [ ] 장바구니 추가
- [ ] 주문 생성
- [ ] MyPage에 주문 표시

### Admin 패널
- [ ] Admin 로그인 성공
- [ ] Dashboard 통계 표시
- [ ] Recent Orders 표시
- [ ] Orders 페이지 필터 작동
- [ ] Orders 페이지 검색 작동
- [ ] Products 페이지 필터 작동
- [ ] Products 페이지 검색 작동
- [ ] 상품 수정 기능 작동

### 보안
- [ ] 비로그인 시 admin 접근 차단
- [ ] 일반 사용자 admin 접근 차단
- [ ] 결제 실패 페이지 정상 표시

### SEO
- [ ] 메인 페이지 메타데이터 확인
- [ ] 상품 페이지 동적 메타데이터 확인

---

## 🐛 문제 발생 시

### 서버가 실행되지 않을 때
```bash
# 패키지 재설치
cd /home/cocori2864/orie-wedding
npm install

# 서버 재시작
npm run dev --workspace=web
npm run dev --workspace=admin
```

### Supabase 연결 오류
1. `.env.local` 파일이 존재하는지 확인
2. 환경 변수가 올바른지 확인
3. 서버 재시작

### Admin 로그인 안 될 때
1. Supabase에서 `profiles` 테이블 확인
2. `role` 컬럼이 `'admin'`인지 확인
3. `admin_setup.sql` 다시 실행

---

## 📊 예상 결과

모든 테스트가 성공하면:
- ✅ 고객이 상품을 주문할 수 있음
- ✅ 주문 내역이 MyPage에 표시됨
- ✅ Admin이 Dashboard에서 실시간 통계를 볼 수 있음
- ✅ Admin이 주문과 상품을 관리할 수 있음
- ✅ 검색과 필터가 정상 작동함
- ✅ 보안이 적절히 설정됨
- ✅ SEO 메타데이터가 올바르게 설정됨

---

## 🎉 완료!

모든 테스트가 성공하면 프로젝트가 정상적으로 작동하는 것입니다!
