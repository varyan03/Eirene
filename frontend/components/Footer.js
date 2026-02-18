import Link from 'next/link';
import { Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative z-10 w-full mt-32 pb-12 px-6">
            <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-12 md:p-16 shadow-lg shadow-purple-500/5">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

                    {/* Column 1: Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo.svg" alt="Eirene Logo" className="w-8 h-8" />
                            <span className="text-xl font-bold text-[#2d3436] font-logo">Eirene</span>
                        </div>
                        <p className="text-[#636e72] leading-relaxed mb-6">
                            Your personal sanctuary for focus and calm. Helping you find balance in a chaotic world.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={Twitter} />
                            <SocialIcon icon={Instagram} />
                            <SocialIcon icon={Mail} />
                        </div>
                    </div>

                    {/* Column 2: Product */}
                    <div>
                        <h4 className="font-bold text-[#2d3436] mb-6">Product</h4>
                        <ul className="space-y-4 text-[#636e72]">
                            <li><Link href="/focus" className="hover:text-[#6c5ce7] transition-colors">Focus Timer</Link></li>
                            <li><Link href="/relax" className="hover:text-[#6c5ce7] transition-colors">Relaxation</Link></li>
                            <li><Link href="/features" className="hover:text-[#6c5ce7] transition-colors">Features</Link></li>
                            <li><Link href="/pricing" className="hover:text-[#6c5ce7] transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h4 className="font-bold text-[#2d3436] mb-6">Company</h4>
                        <ul className="space-y-4 text-[#636e72]">
                            <li><Link href="/about" className="hover:text-[#6c5ce7] transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-[#6c5ce7] transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-[#6c5ce7] transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-[#6c5ce7] transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="font-bold text-[#2d3436] mb-6">Stay in the flow</h4>
                        <p className="text-[#636e72] mb-4 text-sm">
                            Join our newsletter for tips on focus and mindfulness.
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#a29bfe] placeholder-gray-400"
                            />
                            <button className="absolute right-2 top-2 p-1.5 bg-[#a29bfe] hover:bg-[#6c5ce7] rounded-lg text-white transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#dfe6e9] pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#b2bec3]">
                    <p>© 2026 Eirene Wellness. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-[#636e72] transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#636e72] transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon: Icon }) {
    return (
        <a href="#" className="p-2.5 rounded-full bg-white/60 hover:bg-[#a29bfe] hover:text-white transition-all text-[#636e72] shadow-sm">
            <Icon className="w-5 h-5" />
        </a>
    );
}
