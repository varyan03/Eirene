import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-between items-center max-w-6xl mx-auto px-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2d3436] flex items-center justify-center text-white font-bold text-sm">
                    E
                </div>
                <span className="text-lg font-bold text-[#2d3436] tracking-wide">Eirene</span>
            </div>

            {/* Glassmorphic Navigation Pill */}
            <nav className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-md border border-white/40 rounded-full px-2 py-1.5 shadow-sm">
                <Link
                    href="/focus"
                    className="px-6 py-2 rounded-full text-sm font-medium text-[#636e72] hover:text-[#2d3436] hover:bg-white/50 transition-all"
                >
                    Focus Mode
                </Link>
                <Link
                    href="/relax"
                    className="px-6 py-2 rounded-full text-sm font-medium text-[#636e72] hover:text-[#2d3436] hover:bg-white/50 transition-all"
                >
                    Relax Mode
                </Link>
                <Link
                    href="/resources"
                    className="px-6 py-2 rounded-full text-sm font-medium text-[#636e72] hover:text-[#2d3436] hover:bg-white/50 transition-all"
                >
                    Help Section
                </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                <Link
                    href="/login"
                    className="px-6 py-2 rounded-full text-sm font-medium text-[#636e72] hover:text-[#2d3436] hover:bg-white/50 transition-all border border-black/5 bg-white/20 backdrop-blur-sm"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-6 py-2 rounded-full text-sm font-medium text-white bg-[#a29bfe] hover:bg-[#8c7ae6] transition-all shadow-md shadow-purple-200 backdrop-blur-sm"
                >
                    Signup
                </Link>
            </div>
        </header>
    );
}
