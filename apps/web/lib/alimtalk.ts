import { SolapiMessageService } from "solapi";

// 실제 키가 없으면 Mock 모드로 동작
const API_KEY = process.env.SOLAPI_API_KEY;
const API_SECRET = process.env.SOLAPI_API_SECRET;
const SENDER_PHONE = process.env.SOLAPI_SENDER_PHONE || "01000000000";
const PF_ID = process.env.SOLAPI_PF_ID || "KA01..."; // 카카오 채널 ID
const TEMPLATE_ID = process.env.SOLAPI_TEMPLATE_ID || "KA01..."; // 템플릿 ID

// API Key가 없으면 Mock Service 사용
const messageService = (API_KEY && API_SECRET)
    ? new SolapiMessageService(API_KEY, API_SECRET)
    : null;

export async function sendBankInfoAlimtalk(to: string, customerName: string, amount: number) {
    const formattedAmount = amount.toLocaleString();
    const bankAccount = "우리은행 1002-123-456789 (예금주: 오리에)";

    if (!messageService) {
        console.log("================ [MOCK ALIMTALK] ================");
        console.log(`To: ${to}`);
        console.log(`Template: [ORIÉ] 주문이 접수되었습니다.`);
        console.log(`내용: 안녕하세요 ${customerName}님, 주문이 정상적으로 접수되었습니다.`);
        console.log(`결제 금액: ${formattedAmount}원`);
        console.log(`입금 계좌: ${bankAccount}`);
        console.log("=================================================");
        return { success: true, mock: true };
    }

    try {
        const result = await messageService.send({
            to,
            from: SENDER_PHONE,
            kakaoOptions: {
                pfId: PF_ID,
                templateId: TEMPLATE_ID,
                variables: {
                    "#{name}": customerName,
                    "#{amount}": formattedAmount,
                    "#{account}": bankAccount,
                },
            },
        });
        console.log("알림톡 전송 성공:", result);
        return { success: true, result };
    } catch (error) {
        console.error("알림톡 전송 실패:", error);
        return { success: false, error };
    }
}
