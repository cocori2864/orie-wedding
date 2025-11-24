# 🚀 ORIE 웨딩 부케 쇼핑몰 - Vercel 배포 가이드

## ✅ 1단계: GitHub 저장소 생성 (5분)

### 방법 1: GitHub CLI 사용 (추천)
```bash
# GitHub에 로그인
gh auth login

# 새 저장소 생성 및 푸시
gh repo create orie-wedding --public --source=. --remote=origin --push
```

### 방법 2: 수동으로 생성
1. https://github.com/new 접속
2. Repository name: `orie-wedding`
3. Public 선택
4. Create repository 클릭
5. 터미널에서 실행:
```bash
git remote add origin https://github.com/YOUR_USERNAME/orie-wedding.git
git branch -M main
git push -u origin main
```

---

## ✅ 2단계: Vercel 배포 (10분)

### 1. Vercel 계정 생성
1. https://vercel.com 접속
2. "Sign Up" 클릭
3. **GitHub 계정으로 로그인** (추천)

### 2. 프로젝트 Import
1. Vercel Dashboard → "Add New..." → "Project" 클릭
2. GitHub 저장소 목록에서 `orie-wedding` 선택
3. "Import" 클릭

### 3. 프로젝트 설정

#### **Root Directory 설정:**
- Root Directory: `apps/web`
- Framework Preset: Next.js (자동 감지됨)
- Build Command: `npm run build` (자동)
- Output Directory: `.next` (자동)

#### **환경 변수 설정:**
"Environment Variables" 섹션에서 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://sxrasjyjvjngqvrqkjnk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_d0-3If_gBSFSL9mdNY8UPQ_Ig47rtDR
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### 4. 배포 시작
1. "Deploy" 버튼 클릭
2. 2-3분 대기
3. 배포 완료! 🎉

---

## ✅ 3단계: 관리자 사이트 배포 (5분)

### 1. 새 프로젝트 추가
1. Vercel Dashboard → "Add New..." → "Project"
2. 같은 `orie-wedding` 저장소 선택
3. "Import" 클릭

### 2. 프로젝트 설정

#### **Root Directory 설정:**
- Root Directory: `apps/admin`
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

#### **환경 변수 설정:**
```
NEXT_PUBLIC_SUPABASE_URL=https://sxrasjyjvjngqvrqkjnk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_d0-3If_gBSFSL9mdNY8UPQ_Ig47rtDR
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### 3. 배포 시작
1. "Deploy" 버튼 클릭
2. 2-3분 대기
3. 관리자 사이트 배포 완료! 🎉

---

## ✅ 4단계: 배포 확인

### 고객 사이트
```
https://orie-wedding.vercel.app
또는
https://orie-wedding-YOUR_USERNAME.vercel.app
```

### 관리자 사이트
```
https://orie-wedding-admin.vercel.app
또는
https://orie-wedding-admin-YOUR_USERNAME.vercel.app
```

---

## 🎯 배포 후 테스트

### 1. 고객 사이트 테스트
- [ ] 홈페이지 접속
- [ ] 상품 목록 확인
- [ ] 회원가입
- [ ] 로그인
- [ ] 장바구니 담기
- [ ] 결제 테스트

### 2. 관리자 사이트 테스트
- [ ] 관리자 로그인
- [ ] 주문 목록 확인
- [ ] 주문 상세 확인
- [ ] 상품 관리

---

## 🔧 배포 후 수정 방법

### 코드 수정 시:
```bash
# 1. 코드 수정
# 2. Git 커밋
git add .
git commit -m "수정 내용"
git push

# 3. Vercel이 자동으로 재배포 (2-3분)
```

---

## 🌐 커스텀 도메인 연결 (선택사항)

### 1. 도메인 구매
- Namecheap, GoDaddy 등에서 구매
- 예: `orie-wedding.com`

### 2. Vercel에서 도메인 추가
1. Vercel Dashboard → 프로젝트 선택
2. "Settings" → "Domains"
3. 도메인 입력 → "Add"
4. DNS 설정 안내에 따라 설정

---

## ⚠️ 주의사항

### 1. 환경 변수 확인
- 모든 환경 변수가 정확히 입력되었는지 확인
- `NEXT_PUBLIC_` 접두사 확인

### 2. Supabase URL 허용
Supabase Dashboard → Settings → API → URL Configuration:
- Vercel 배포 URL 추가
- 예: `https://orie-wedding.vercel.app`

### 3. 결제 테스트
- 토스페이먼츠 테스트 키 사용 중
- 실제 결제 전환 시 프로덕션 키로 변경 필요

---

## 🎉 배포 완료!

축하합니다! 이제 전 세계 누구나 접속할 수 있는 웨딩 부케 쇼핑몰이 완성되었습니다!

**고객 사이트:** https://orie-wedding.vercel.app
**관리자 사이트:** https://orie-wedding-admin.vercel.app

---

## 📞 문제 발생 시

### 빌드 에러
- Vercel Dashboard → Deployments → 실패한 배포 클릭
- 로그 확인
- 환경 변수 확인

### 데이터베이스 연결 오류
- Supabase URL/Key 확인
- RLS 정책 확인

### 결제 오류
- 토스페이먼츠 키 확인
- Success/Fail URL 확인
