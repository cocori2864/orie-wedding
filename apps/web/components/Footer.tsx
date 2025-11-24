import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-orie-bg-secondary py-20 border-t border-orie-text/10 text-center text-orie-text">
            <div className="font-serif text-xl font-bold mb-8 tracking-wider">ORIÉ</div>
            <div className="flex justify-center gap-8 mb-10">
                <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    이용약관
                </Link>
                <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    개인정보처리방침
                </Link>
                <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    고객센터
                </Link>
                <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                    Instagram
                </Link>
            </div>
            <p className="text-xs opacity-50">© 2024 ORIÉ. All rights reserved.</p>
        </footer>
    );
}
