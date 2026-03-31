'use client';
import { useState } from 'react';
import { Eye, Hand, Ear, Wind, Coffee, Check, ArrowRight, RotateCcw } from 'lucide-react';

const steps = [
    {
        count: 5,
        title: 'Things you can SEE',
        description: 'Look around you. Notice five things you can see. It could be a pen, a spot on the ceiling, anything in your surroundings.',
        icon: Eye,
        color: 'text-amber-500',
        bgColor: 'bg-amber-100',
        borderColor: 'border-amber-200',
        shadowColor: 'rgba(245, 158, 11, 0.4)',
        ringColor: 'border-amber-500/20'
    },
    {
        count: 4,
        title: 'Things you can FEEL',
        description: 'Pay attention to your body and what you can touch. Notice four things you can feel. The texture of your clothes, the temperature of the air, the floor beneath your feet.',
        icon: Hand,
        color: 'text-orange-500',
        bgColor: 'bg-orange-100',
        borderColor: 'border-orange-200',
        shadowColor: 'rgba(249, 115, 22, 0.4)',
        ringColor: 'border-orange-500/20'
    },
    {
        count: 3,
        title: 'Things you can HEAR',
        description: 'Listen to the sounds around you. Notice three things you can hear. The hum of a refrigerator, traffic outside, or even your own breathing.',
        icon: Ear,
        color: 'text-rose-500',
        bgColor: 'bg-rose-100',
        borderColor: 'border-rose-200',
        shadowColor: 'rgba(244, 63, 94, 0.4)',
        ringColor: 'border-rose-500/20'
    },
    {
        count: 2,
        title: 'Things you can SMELL',
        description: 'Notice two things you can smell right now. You might need to move around or just take a deep breath. It could be a faint scent in the air.',
        icon: Wind,
        color: 'text-pink-500',
        bgColor: 'bg-pink-100',
        borderColor: 'border-pink-200',
        shadowColor: 'rgba(236, 72, 153, 0.4)',
        ringColor: 'border-pink-500/20'
    },
    {
        count: 1,
        title: 'Thing you can TASTE',
        description: 'Focus on one thing you can taste. It might be the lingering taste of a meal, your toothpaste, or just the resting state of your mouth.',
        icon: Coffee,
        color: 'text-fuchsia-500',
        bgColor: 'bg-fuchsia-100',
        borderColor: 'border-fuchsia-200',
        shadowColor: 'rgba(217, 70, 239, 0.4)',
        ringColor: 'border-fuchsia-500/20'
    }
];

export default function FiveFourThreeTwoOne({ onBack }) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            setIsComplete(true);
        }
    };

    const handleReset = () => {
        setCurrentStepIndex(0);
        setIsComplete(false);
    };

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-[50vh] animate-fadeIn mt-8 pb-12">
            {!isComplete ? (
                <>
                    {/* Header */}
                    <div className="flex flex-col items-center mb-12 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 shadow-sm backdrop-blur-md mb-6 transition-all duration-500">
                            <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Step {currentStepIndex + 1} of 5</span>
                        </div>
                        <h2 className={`text-4xl md:text-5xl font-light mb-4 transition-colors duration-700 ${steps[currentStepIndex].color}`}>
                            {steps[currentStepIndex].title}
                        </h2>
                        <p className="max-w-xl text-gray-600/90 text-lg leading-relaxed px-4 transition-opacity duration-500">
                            {steps[currentStepIndex].description}
                        </p>
                    </div>

                    {/* Interactive Circle Display */}
                    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-16 group">
                        {/* Outer Glow */}
                        <div
                            className="absolute inset-0 rounded-full blur-3xl opacity-30 mix-blend-multiply transition-all duration-1000 ease-in-out"
                            style={{ backgroundColor: steps[currentStepIndex].shadowColor.replace('0.4', '1').replace('rgba', 'rgb').replace(/, \d+\.?\d*\)/, ')') }}
                        ></div>

                        {/* Static Ring */}
                        <div className={`absolute inset-0 rounded-full border-[1.5px] border-dashed ${steps[currentStepIndex].ringColor} transition-all duration-1000 animate-[spin_30s_linear_infinite]`}></div>

                        {/* Main Circle */}
                        <div className={`relative w-48 h-48 md:w-60 md:h-60 rounded-full flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl border border-white shadow-xl transition-all duration-700 ease-out z-10`}
                            style={{ boxShadow: `0 20px 40px -10px ${steps[currentStepIndex].shadowColor}` }}
                        >
                            <div className={`mb-3 transition-colors duration-700 ${steps[currentStepIndex].color}`}>
                                {(() => {
                                    const IconComponent = steps[currentStepIndex].icon;
                                    return <IconComponent size={48} strokeWidth={1.5} />;
                                })()}
                            </div>
                            <div className={`text-7xl font-light tabular-nums transition-colors duration-700 ${steps[currentStepIndex].color}`}>
                                {steps[currentStepIndex].count}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <button
                        onClick={handleNext}
                        className={`group relative overflow-hidden flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-800 font-medium text-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 outline-none`}
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-gray-900">
                            {currentStepIndex < steps.length - 1 ? "I've found them" : "Finish Exercise"}
                        </span>
                        <ArrowRight size={20} className={`relative z-10 transition-transform duration-300 group-hover:translate-x-1 ${steps[currentStepIndex].color}`} />
                    </button>

                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full animate-fadeIn mt-12">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-teal-100 to-emerald-50 flex items-center justify-center mb-8 shadow-inner border border-teal-200/50">
                        <Check size={48} className="text-teal-500" />
                    </div>
                    <h2 className="text-4xl font-light text-gray-800 mb-4">You are Grounded</h2>
                    <p className="text-gray-600 text-lg mb-12 max-w-md text-center leading-relaxed">
                        You've successfully brought your awareness back to the present moment. Take a deep breath and gently return to your day.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/40 text-gray-700 font-medium border border-white/60 hover:bg-white/60 hover:shadow-sm transition-all shadow-[0_4px_16px_0_rgba(0,0,0,0.02)]"
                        >
                            <RotateCcw size={18} />
                            Start Over
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
