export default function PricePage() {
    return (
        <div className="w-full min-h-screen pt-32 pb-20 px-5 md:px-10 bg-orie-bg">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif text-orie-text mb-12 text-center">PRICE LIST</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-serif text-orie-text mb-4 border-b border-orie-text/20 pb-2">BOUQUET</h2>
                            <ul className="space-y-4 text-orie-text/80">
                                <li className="flex justify-between">
                                    <span>Basic Line</span>
                                    <span>180,000 KRW ~</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Premium Line</span>
                                    <span>250,000 KRW ~</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>High-End Line</span>
                                    <span>350,000 KRW ~</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-serif text-orie-text mb-4 border-b border-orie-text/20 pb-2">ADD-ON</h2>
                            <ul className="space-y-4 text-orie-text/80">
                                <li className="flex justify-between">
                                    <span>Boutonniere (Included)</span>
                                    <span>0 KRW</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Corsage (Per piece)</span>
                                    <span>15,000 KRW</span>
                                </li>
                            </ul>
                        </section>
                    </div>

                    <div className="bg-white p-8 rounded-sm shadow-sm">
                        <h3 className="text-lg font-serif text-orie-text mb-4">NOTICE</h3>
                        <ul className="space-y-3 text-sm text-orie-text/70 list-disc pl-4">
                            <li>모든 상품은 부가세 포함 가격입니다.</li>
                            <li>시장 상황에 따라 꽃의 구성이 변경될 수 있습니다.</li>
                            <li>예약금 입금 순으로 예약이 확정됩니다.</li>
                            <li>배송비는 별도이며, 거리에 따라 차등 부과됩니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
