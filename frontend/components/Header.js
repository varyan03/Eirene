import Link from 'next/link';

export default function Header() {
    return (
        <header className="fixed top-6 left-0 right-0 z-50 flex justify-between items-center max-w-6xl mx-auto px-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm">
                    M
                </div>
                <span className="text-lg font-medium text-white/90 tracking-wide">Mindo</span>
            </div>

            {/* Glassmorphic Navigation Pill */}
            <nav className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-2 py-1.5 shadow-lg shadow-black/5">
                <Link
                    href="/focus"
                    className="px-6 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                    Focus Mode
                </Link>
                <Link
                    href="/relax"
                    className="px-6 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                    Relax Mode
                </Link>
                <Link
                    href="/resources"
                    className="px-6 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                    Help Section
                </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
                <Link
                    href="/login"
                    className="px-6 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="px-6 py-2 rounded-full text-sm font-medium text-white bg-purple-500/80 hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20 backdrop-blur-sm"
                >
                    Signup
                </Link>
            </div>
        </header>
    );
}
