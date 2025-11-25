# 잔금 결제 기능 구현 (Final Payment Feature)

## 개요
예약금 결제 이후 남은 잔금을 결제하는 기능을 구현했습니다. 관리자가 제작 완료 후 잔금을 요청하면, 고객은 카드 결제 또는 계좌 이체를 통해 잔금을 납부할 수 있습니다.

## 주요 기능

### 1. 데이터베이스 변경 (`orders` 테이블)
다음 컬럼들이 추가되었습니다:
- `final_payment_amount` (INTEGER): 실제 결제된 잔금 금액
- `final_payment_status` (TEXT): 잔금 결제 상태 (`pending`, `paid`, `verification_pending`)
- `final_payment_method` (TEXT): 잔금 결제 수단 (`card`, `transfer`)
- `payment_id` (TEXT): PG사 결제 고유 ID (imp_uid)
- `final_payment_request_amount` (INTEGER): 관리자가 요청한 잔금 금액

### 2. 관리자 기능 (`apps/admin`)
- **주문 상태 관리**:
    - `pending` (예약 대기) -> `payment_pending` (예약금 대기) -> `confirmed` (예약 확정) -> `production_completed` (제작 완료) -> `completed` (주문 완료)
    - 각 단계별로 **"이전 단계로 되돌리기"** 버튼 제공.
- **잔금 요청**:
    - '제작 완료' 상태 변경 시 **잔금 금액 설정 모달** 표시.
    - 금액 설정 후 확인 시 고객에게 알림톡(Mock) 발송.
- **입금 확인**:
    - 고객이 계좌 이체 시, 관리자가 수동으로 입금 확인 후 '잔금 입금 확인' 버튼 클릭 -> 주문 완료 처리.
- **권한 관리**:
    - `Service Role Key`를 사용하는 Server Action을 통해 RLS를 우회하여 모든 주문 상태 변경 가능.

### 3. 사용자 기능 (`apps/web`)
- **마이페이지**:
    - 주문 상태가 `production_completed`일 때 "잔금 결제하기" 버튼 표시.
- **결제 페이지 (`/payment/[id]`)**:
    - 관리자가 설정한 잔금 금액 확인.
    - **카드 결제**: 포트원(PortOne) 연동을 통해 즉시 결제. 결제 성공 시 자동 완료 처리.
    - **계좌 이체**: 알림톡으로 안내된 계좌로 입금 (웹사이트 내 별도 조작 불필요).

### 4. 알림톡 (Mock)
- 잔금 요청 시 콘솔에 알림톡 발송 로그 출력 (실제 연동 준비 완료).
- 포함 정보: 고객명, 잔금 금액, 계좌번호, 결제 링크.

## 환경 변수
- `SUPABASE_SERVICE_ROLE_KEY`: 관리자 권한으로 DB 업데이트를 위해 필요 (Server Action).
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 기본 Supabase 연동.

## 파일 목록
- `packages/database/migrations/20251125_add_final_payment.sql`
- `apps/web/app/payment/[id]/page.tsx`
- `apps/web/app/actions/processPayment.ts`
- `apps/admin/components/OrderStatusActions.tsx`
- `apps/admin/app/actions/updateOrderStatus.ts`
- `apps/admin/app/orders/[id]/page.tsx`
