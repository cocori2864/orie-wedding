export default function ReservationPage() {
    return (
        <div className="w-full min-h-screen pt-32 pb-20 px-5 md:px-10 bg-orie-bg flex flex-col items-center justify-center">
            <h1 className="text-4xl font-serif text-orie-text mb-8">RESERVATION GUIDE</h1>
            <div className="max-w-2xl text-center space-y-6 text-orie-text/80">
                <p>
                    예약은 WORKS 메뉴에서 원하시는 부케를 선택하신 후 진행하실 수 있습니다.
                </p>
                <div className="bg-white p-8 rounded-sm shadow-sm text-left space-y-4">
                    <h3 className="font-serif text-lg mb-2">예약 절차</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>WORKS 메뉴에서 마음에 드는 부케 디자인을 선택합니다.</li>
                        <li>상세 페이지에서 [예약하기] 버튼을 클릭합니다.</li>
                        <li>예식 정보(날짜, 시간, 장소)를 입력합니다.</li>
                        <li>예약금 입금 후 예약이 확정됩니다.</li>
                    </ol>
                </div>
                <p className="text-sm text-orie-text/60">
                    * 문의사항은 카카오톡 채널 '오리에'로 연락 주시면 빠르게 답변 드리겠습니다.
                </p>
            </div>
        </div>
    );
}
