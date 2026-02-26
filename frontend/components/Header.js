'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Zap, Coffee, HelpCircle, LogIn, UserPlus } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    if (isHome) {
        return (
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-between items-center max-w-6xl mx-auto px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="Eirene Logo" className="w-10 h-10" />
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

    // Sidebar for inner pages
    return (
        <aside className="fixed top-0 left-0 h-full w-20 flex flex-col items-center py-8 bg-white/40 backdrop-blur-xl border-r border-white/50 shadow-lg z-50 transition-all duration-300 hover:w-56 group overflow-hidden">
            {/* Logo */}
            <Link href="/" className="flex justify-center items-center w-full mb-12 relative h-10">
                <div className="absolute left-1/2 -translate-x-1/2 group-hover:left-5 group-hover:translate-x-0 transition-all duration-300">
                    <img src="/logo.svg" alt="Eirene Logo" className="w-10 h-10" />
                </div>
                <span className="text-xl font-bold text-[#2d3436] tracking-wide absolute left-16 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">Eirene</span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex flex-col w-full gap-4 px-3 flex-grow">
                <Link href="/" className="flex items-center w-full p-3 rounded-xl text-[#636e72] hover:bg-white/60 hover:text-orange-500 transition-all group/link relative">
                    <div className="w-10 flex justify-center shrink-0">
                        <Home size={22} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium whitespace-nowrap absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">Home</span>
                </Link>
                <Link href="/focus" className={`flex items-center w-full p-3 rounded-xl transition-all group/link relative ${pathname === '/focus' ? 'bg-white/60 text-orange-500 shadow-sm' : 'text-[#636e72] hover:bg-white/60 hover:text-orange-500'}`}>
                    <div className="w-10 flex justify-center shrink-0">
                        <Zap size={22} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium whitespace-nowrap absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">Focus Mode</span>
                </Link>
                <Link href="/relax" className={`flex items-center w-full p-3 rounded-xl transition-all group/link relative ${pathname === '/relax' ? 'bg-white/60 text-emerald-500 shadow-sm' : 'text-[#636e72] hover:bg-white/60 hover:text-emerald-500'}`}>
                    <div className="w-10 flex justify-center shrink-0">
                        <Coffee size={22} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium whitespace-nowrap absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">Relax Mode</span>
                </Link>
                <Link href="/resources" className={`flex items-center w-full p-3 rounded-xl transition-all group/link relative ${pathname === '/resources' ? 'bg-white/60 text-[#a29bfe] shadow-sm' : 'text-[#636e72] hover:bg-white/60 hover:text-[#a29bfe]'}`}>
                    <div className="w-10 flex justify-center shrink-0">
                        <HelpCircle size={22} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium whitespace-nowrap absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">Help Section</span>
                </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex flex-col w-full gap-3 px-3 mt-auto">
                <Link href="/login" className="flex items-center w-full p-3 rounded-xl text-[#636e72] hover:bg-white/60 transition-all group/link relative">
                    <div className="w-10 flex justify-center shrink-0">
                        <LogIn size={22} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium whitespace-nowrap absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">Login</span>
                </Link>
                <Link href="/signup" className="flex items-center w-full p-3 rounded-xl text-white bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 shadow-md transition-all group/link relative">
                    <div className="w-10 flex justify-center shrink-0">
                        <UserPlus size={22} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                    <span className="font-medium whitespace-nowrap absolute left-14 opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm">Signup</span>
                </Link>
            </div>
        </aside>
    );
}
