import { Metadata } from "next";

export const metadata: Metadata = {
    title: "이용약관",
    description: "ORIÉ 웨딩 부케 쇼핑몰 이용약관입니다.",
};

export default function TermsPage() {
    return (
        <main className="pt-32 pb-20 min-h-screen bg-white">
            <div className="w-full max-w-[800px] mx-auto px-5 md:px-10">
                <h1 className="text-3xl font-serif font-medium mb-8 text-gray-900">이용약관</h1>

                <div className="space-y-8 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제1조 (목적)</h2>
                        <p>
                            본 약관은 ORIÉ(이하 "회사")가 운영하는 웨딩 부케 쇼핑몰(이하 "몰")에서 제공하는
                            인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및
                            책임사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제2조 (정의)</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>"몰"이란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.</li>
                            <li>"이용자"란 "몰"에 접속하여 본 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                            <li>"회원"이라 함은 "몰"에 개인정보를 제공하여 회원등록을 한 자로서, "몰"의 정보를 지속적으로 제공받으며, "몰"이 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                            <li>"비회원"이라 함은 회원에 가입하지 않고 "몰"이 제공하는 서비스를 이용하는 자를 말합니다.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제3조 (약관의 명시와 개정)</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>"몰"은 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 알 수 있도록 초기 서비스화면에 게시합니다.</li>
                            <li>"몰"은 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 등에 관한 법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                            <li>"몰"이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제4조 (서비스의 제공 및 변경)</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>"몰"은 다음과 같은 업무를 수행합니다:
                                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                    <li>웨딩 부케 및 관련 상품에 대한 정보 제공 및 구매계약의 체결</li>
                                    <li>구매계약이 체결된 상품의 배송</li>
                                    <li>기타 "몰"이 정하는 업무</li>
                                </ul>
                            </li>
                            <li>"몰"은 재화의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화·용역의 내용을 변경할 수 있습니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제5조 (회원가입)</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>이용자는 "몰"이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.</li>
                            <li>"몰"은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각호에 해당하지 않는 한 회원으로 등록합니다:
                                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                    <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</li>
                                    <li>등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                                    <li>기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                                </ul>
                            </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제6조 (구매신청)</h2>
                        <p className="mb-2">"몰" 이용자는 다음의 방법에 의하여 구매를 신청합니다:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>성명, 주소, 전화번호 입력</li>
                            <li>재화의 선택</li>
                            <li>결제방법의 선택</li>
                            <li>배송 방법 및 날짜 선택</li>
                            <li>본 약관에 동의한다는 표시</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제7조 (환불 및 교환)</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>웨딩 부케의 특성상 주문 제작 상품이므로, 제작 시작 후에는 취소 및 환불이 불가능합니다.</li>
                            <li>배송된 상품이 주문 내용과 다르거나 파손된 경우, 배송 후 24시간 이내에 고객센터로 연락 주시면 교환 또는 환불 처리해드립니다.</li>
                            <li>단순 변심에 의한 반품은 불가능합니다.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제8조 (개인정보보호)</h2>
                        <p>
                            "몰"은 이용자의 정보수집 시 구매계약 이행에 필요한 최소한의 정보를 수집합니다.
                            개인정보 처리에 관한 자세한 사항은 개인정보처리방침을 참고하시기 바랍니다.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-gray-900">제9조 (분쟁해결)</h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>"몰"은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
                            <li>"몰"과 이용자간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.</li>
                        </ol>
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
