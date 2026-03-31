'use client';
import Header from '../../components/Header';
import { PhoneCall, HeartPulse, BookOpen, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
    return (
        <main className="min-h-screen relative bg-[#FDF9F1] overflow-hidden selection:bg-purple-200">
            {/* Header */}
            <Header />

            {/* Pastel Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-purple-200 to-indigo-300 opacity-30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-rose-200 to-orange-200 opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s' }}></div>
            </div>

            <div className="container mx-auto px-6 pt-32 pb-24 flex flex-col items-center relative z-10 w-full lg:max-w-6xl md:pl-24">

                <div className="text-center w-full max-w-3xl mb-12 animate-fadeIn">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-6 border border-purple-200">
                        <HeartPulse size={16} /> Support & Guidelines
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight">You Are Not Alone</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        If you or someone you know is going through a tough time, please reach out for help.
                        Below are verified government helplines and immediate self-help techniques to guide you.
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column: Helplines */}
                    <div className="flex flex-col gap-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <ShieldCheck className="text-rose-500" />
                                Professional Help
                            </h2>
                            <div className="h-px bg-gray-300 flex-grow opacity-50 ml-2"></div>
                        </div>

                        {/* Tele MANAS */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-rose-200 shadow-sm hover:shadow-md hover:bg-white/60 transition-all border-l-4 border-l-rose-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Tele MANAS</h3>
                                    <p className="text-sm font-medium text-rose-600">Govt. of India National Helpline</p>
                                </div>
                                <div className="p-3 bg-rose-100 rounded-full text-rose-600">
                                    <PhoneCall size={24} />
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">
                                Free, 24/7 mental health support in 20 languages. Offers psychological counseling and psychiatric consultations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a href="tel:14416" className="flex-1 flex justify-center items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                                    Call 14416
                                </a>
                                <a href="tel:18008914416" className="flex-1 flex justify-center items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 py-3 px-4 rounded-xl font-medium transition-colors border border-rose-200">
                                    1800-89-14416
                                </a>
                            </div>
                        </div>

                        {/* NIMHANS */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:bg-white/60 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">NIMHANS Helpline</h3>
                                    <p className="text-xs font-medium text-gray-500">National Institute of Mental Health and Neurosciences</p>
                                </div>
                                <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                                    <PhoneCall size={20} />
                                </div>
                            </div>
                            <a href="tel:08046110007" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition">
                                080-46110007 <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Vandrevala Foundation & AASRA */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-5 border border-gray-200 shadow-sm hover:bg-white/60 transition-all">
                                <h3 className="text-md font-bold text-gray-800 mb-1">Vandrevala Foundation</h3>
                                <p className="text-xs text-gray-500 mb-3">24/7 Crisis Support</p>
                                <a href="tel:9999666555" className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:underline">
                                    <PhoneCall size={14} /> 9999 666 555
                                </a>
                            </div>
                            <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-5 border border-gray-200 shadow-sm hover:bg-white/60 transition-all">
                                <h3 className="text-md font-bold text-gray-800 mb-1">AASRA</h3>
                                <p className="text-xs text-gray-500 mb-3">Suicide Prevention</p>
                                <a href="tel:9820466726" className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:underline">
                                    <PhoneCall size={14} /> 9820466726
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Self-Help */}
                    <div className="flex flex-col gap-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <BookOpen className="text-indigo-500" />
                                Immediate Self-Help
                            </h2>
                            <div className="h-px bg-gray-300 flex-grow opacity-50 ml-2"></div>
                        </div>

                        {/* Interactive Tools Link */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-indigo-200 shadow-sm hover:shadow-md hover:bg-white/60 transition-all border-l-4 border-l-indigo-500 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Use Our Breathing Tools</h3>
                                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                                    Whenever you feel overwhelmed, anxious, or unable to focus, our interactive grounding exercises can help regulate your nervous system immediately.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/relax" className="flex-1 flex justify-center items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium transition-colors text-sm">
                                    Box Breathing
                                </Link>
                                <Link href="/relax" className="flex-1 flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-xl font-medium transition-colors text-sm">
                                    5-4-3-2-1 Grounding
                                </Link>
                            </div>
                        </div>

                        {/* Emergency Grounding Guidelines */}
                        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick De-escalation Steps</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">1</div>
                                    <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Change your temperature:</span> Splash cold water on your face or hold an ice cube to rapidly lower anxiety.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">2</div>
                                    <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Step away:</span> Remove yourself from the environment triggering you, even if it's just to another room.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">3</div>
                                    <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Name to Tame:</span> Say out loud what you are feeling ("I am feeling panicked right now"). Naming the emotion helps reduce its intensity.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">4</div>
                                    <p className="text-sm text-gray-700"><span className="font-semibold text-gray-900">Reach out:</span> Text or call a trusted friend. You don't have to explain everything, just having a connection helps.</p>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="w-full mt-12 text-center">
                    <p className="text-xs text-gray-400">
                        Disclaimer: Eirene provides tools for focus and relaxation but is not a substitute for professional medical advice. For emergencies, please contact the helplines listed above immediately.
                    </p>
                </div>
            </div>
        </main>
    );
}
