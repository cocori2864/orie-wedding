import { Metadata } from "next";

export const metadata: Metadata = {
    title: "개인정보처리방침",
    description: "ORIÉ 웨딩 부케 쇼핑몰 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-white">
            <div className="w-full max-w-[800px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-serif font-medium mb-8 text-gray-900">개인정보처리방침</h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <p className="mb-4">
                            ORIÉ(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다.
                        </p>
                        <p>
                            회사는 개인정보처리방침을 통하여 이용자가 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">1. 개인정보의 수집 및 이용 목적</h2>
                        <p className="mb-2">회사는 다음의 목적을 위하여 개인정보를 처리합니다:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>회원 가입 및 관리</strong>: 회원 가입의사 확인, 회원제 서비스 제공, 본인 확인, 불량회원의 부정 이용 방지</li>
                            <li><strong>재화 또는 서비스 제공</strong>: 물품 배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공</li>
                            <li><strong>마케팅 및 광고</strong>: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">2. 수집하는 개인정보의 항목</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">회원가입 시</h3>
                                <ul className="list-disc list-inside ml-4">
                                    <li>필수항목: 이메일, 비밀번호, 이름, 전화번호</li>
                                    <li>선택항목: 생년월일, 성별</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">상품 구매 시</h3>
                                <ul className="list-disc list-inside ml-4">
                                    <li>필수항목: 수령인 이름, 배송지 주소, 전화번호</li>
                                    <li>결제정보: 신용카드 정보, 은행계좌 정보 (결제대행사를 통해 처리)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">서비스 이용 과정에서 자동 수집되는 정보</h3>
                                <ul className="list-disc list-inside ml-4">
                                    <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">3. 개인정보의 보유 및 이용기간</h2>
                        <p className="mb-2">회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                        <ul className="list-disc list-inside space-y-2 mt-4">
                            <li><strong>회원 정보</strong>: 회원 탈퇴 시까지 (단, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지)</li>
                            <li><strong>계약 또는 청약철회 등에 관한 기록</strong>: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li><strong>대금결제 및 재화 등의 공급에 관한 기록</strong>: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li><strong>소비자의 불만 또는 분쟁처리에 관한 기록</strong>: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                            <li><strong>표시·광고에 관한 기록</strong>: 6개월 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">4. 개인정보의 제3자 제공</h2>
                        <p className="mb-2">회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>이용자가 사전에 동의한 경우</li>
                            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
                            <li>배송업무를 위해 배송업체에 필요한 최소한의 정보(성명, 주소, 전화번호)를 제공하는 경우</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">5. 개인정보 처리의 위탁</h2>
                        <p className="mb-2">회사는 서비스 향상을 위해 아래와 같이 개인정보 처리업무를 외부 전문업체에 위탁하여 운영하고 있습니다:</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-300 mt-4">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">수탁업체</th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">위탁업무 내용</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Supabase</td>
                                        <td className="border border-gray-300 px-4 py-2">회원 정보 및 주문 정보 저장</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">Vercel</td>
                                        <td className="border border-gray-300 px-4 py-2">웹사이트 호스팅</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">토스페이먼츠</td>
                                        <td className="border border-gray-300 px-4 py-2">결제 처리</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">6. 정보주체의 권리·의무 및 행사방법</h2>
                        <p className="mb-2">이용자는 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>개인정보 열람 요구</li>
                            <li>개인정보 오류 등이 있을 경우 정정 요구</li>
                            <li>개인정보 삭제 요구</li>
                            <li>개인정보 처리정지 요구</li>
                        </ul>
                        <p className="mt-4">
                            권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">7. 개인정보의 파기</h2>
                        <p className="mb-2">회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                        <div className="mt-4 space-y-2">
                            <p><strong>파기절차:</strong> 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</p>
                            <p><strong>파기방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">8. 개인정보 보호책임자</h2>
                        <p className="mb-2">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:</p>
                        <div className="bg-gray-50 p-4 rounded-lg mt-4">
                            <p><strong>개인정보 보호책임자</strong></p>
                            <p>이메일: privacy@orie.com</p>
                            <p>전화번호: 02-1234-5678</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">9. 개인정보 처리방침의 변경</h2>
                        <p>
                            이 개인정보 처리방침은 2024년 11월 24일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            시행일자: 2024년 11월 24일
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
