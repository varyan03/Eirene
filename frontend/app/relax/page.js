'use client';
import { useState } from 'react';
import Header from '../../components/Header';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const BoxBreathing = dynamic(() => import('../../components/calm/BoxBreathing'), { ssr: false });
const FiveFourThreeTwoOne = dynamic(() => import('../../components/calm/FiveFourThreeTwoOne'), { ssr: false });
const PMR = dynamic(() => import('../../components/calm/PMR'), { ssr: false });

export default function RelaxPage() {
    const [viewMode, setViewMode] = useState('selection');

    return (
        <main className="min-h-screen relative bg-[#FDF9F1] overflow-hidden selection:bg-teal-200">
            {/* Header */}
            <Header />

            {/* Pastel Abstract Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-teal-200 to-emerald-300 opacity-30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '9s' }}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-amber-200 to-orange-300 opacity-20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '11s' }}></div>
                <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-gradient-to-tr from-purple-200 to-indigo-300 opacity-20 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '13s' }}></div>
            </div>

            <div className="container mx-auto px-6 pt-32 pb-12 flex flex-col items-center">

                {/* Mode Selection Screen */}
                {viewMode === 'selection' && (
                    <div className="w-full max-w-5xl flex flex-col gap-8 mt-4 z-10 relative">

                        {/* Section: Grounding & Calm */}
                        <div className="flex flex-col gap-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                            <div className="flex items-center gap-3 px-2">
                                <h3 className="text-3xl font-bold text-gray-800 tracking-tight">Grounding & Calm</h3>
                                <div className="h-px bg-gray-300 flex-grow ml-4 opacity-50"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Box Breathing Card */}
                                <div
                                    onClick={() => setViewMode('box-breathing')}
                                    className="bg-white/30 backdrop-blur-xl rounded-[2rem] p-6 border border-white/40 shadow-[0_8px_32px_0_rgba(20,184,166,0.1)] cursor-pointer hover:bg-white/50 hover:shadow-[0_8px_32px_0_rgba(20,184,166,0.2)] hover:border-teal-200/60 transition-all duration-500 ease-out transform hover:-translate-y-2 group flex flex-col"
                                >
                                    <div className="w-full h-48 rounded-[1.5rem] mb-6 shadow-inner overflow-hidden group-hover:shadow-md transition-all duration-500 relative bg-teal-50">
                                        <Image src="/images/box_breathing_bg.png" alt="Box Breathing Background" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" priority />
                                        <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300 px-1">Box Breathing</h2>
                                    <p className="text-gray-600/90 leading-relaxed text-sm mb-6 px-1 flex-grow">
                                        Reset your nervous system with rhythmic 4-second breathing cycles. Proven to lower heart rate and clear mental fog.
                                    </p>
                                    <span className="text-sm font-bold text-teal-600 flex items-center gap-2 group-hover:gap-3 transition-all px-1 md:mt-auto">
                                        Breathe <span className="text-lg">&rarr;</span>
                                    </span>
                                </div>

                                {/* 5-4-3-2-1 Method Card */}
                                <div
                                    onClick={() => setViewMode('54321')}
                                    className="bg-white/30 backdrop-blur-xl rounded-[2rem] p-6 border border-white/40 shadow-[0_8px_32px_0_rgba(217,119,6,0.1)] cursor-pointer hover:bg-white/50 hover:shadow-[0_8px_32px_0_rgba(217,119,6,0.2)] hover:border-amber-200/60 transition-all duration-500 ease-out transform hover:-translate-y-2 group flex flex-col"
                                >
                                    <div className="w-full h-48 rounded-[1.5rem] mb-6 shadow-inner overflow-hidden group-hover:shadow-md transition-all duration-500 relative bg-amber-50">
                                        <Image src="/images/five_senses_bg.png" alt="5-4-3-2-1 Background" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" priority />
                                        <div className="absolute inset-0 bg-gradient-to-t from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300 px-1">5-4-3-2-1 Method</h2>
                                    <p className="text-gray-600/90 leading-relaxed text-sm mb-6 px-1 flex-grow">
                                        Interrupt rumination and anxiety by mindfully acknowledging your 5 senses. A highly effective, portable grounding technique.
                                    </p>
                                    <span className="text-sm font-bold text-amber-600 flex items-center gap-2 group-hover:gap-3 transition-all px-1 md:mt-auto">
                                        Ground yourself <span className="text-lg">&rarr;</span>
                                    </span>
                                </div>

                                {/* PMR Card */}
                                <div
                                    onClick={() => setViewMode('pmr')}
                                    className="bg-white/30 backdrop-blur-xl rounded-[2rem] p-6 border border-white/40 shadow-[0_8px_32px_0_rgba(147,51,234,0.1)] cursor-pointer hover:bg-white/50 hover:shadow-[0_8px_32px_0_rgba(147,51,234,0.2)] hover:border-purple-200/60 transition-all duration-500 ease-out transform hover:-translate-y-2 group flex flex-col"
                                >
                                    <div className="w-full h-48 rounded-[1.5rem] mb-6 shadow-inner overflow-hidden group-hover:shadow-md transition-all duration-500 relative bg-purple-50">
                                        <Image src="/images/pmr_bg.png" alt="PMR Background" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" priority />
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300 px-1">Progressive Relaxation</h2>
                                    <p className="text-gray-600/90 leading-relaxed text-sm mb-6 px-1 flex-grow">
                                        Actively release physical tension stored in the body by cycling through 5s tense and 30s relax intervals.
                                    </p>
                                    <span className="text-sm font-bold text-purple-600 flex items-center gap-2 group-hover:gap-3 transition-all px-1 md:mt-auto">
                                        Release tension <span className="text-lg">&rarr;</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back to Selection Button (Only visible in active modes) */}
                {viewMode !== 'selection' && (
                    <div className="w-full max-w-5xl flex justify-start mb-6 z-10 relative">
                        <button
                            onClick={() => setViewMode('selection')}
                            className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-2 transition bg-white/40 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm"
                        >
                            &larr; Choose Mode
                        </button>
                    </div>
                )}

                {/* Dynamic Content */}
                <div className="w-full max-w-5xl transition-all duration-500 ease-in-out relative z-10">
                    {/* Placeholder for Box Breathing */}
                    {viewMode === 'box-breathing' && (
                        <BoxBreathing onBack={() => setViewMode('selection')} />
                    )}

                    {/* Placeholder for 54321 */}
                    {viewMode === '54321' && (
                        <FiveFourThreeTwoOne onBack={() => setViewMode('selection')} />
                    )}

                    {/* PMR Component */}
                    {viewMode === 'pmr' && (
                        <PMR onBack={() => setViewMode('selection')} />
                    )}
                </div>

            </div>
        </main>
    );
}
