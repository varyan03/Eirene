'use client';
import { useState, useEffect, useMemo } from 'react';
import { Play, Pause, RefreshCw, CheckCircle, ArrowLeft, Coffee, FastForward } from 'lucide-react';

export default function FocusTimer({ task, onComplete, onBack }) {
    const durationMinutes = task.targetDuration || 25;

    // Generate phase array based on duration
    const phases = useMemo(() => {
        if (durationMinutes === 25) {
            return [
                { type: 'focus', duration: 25 },
                { type: 'break', duration: 5 },
                { type: 'focus', duration: 25 }
            ];
        } else {
            // Default 50 min deep dive
            return [
                { type: 'focus', duration: 50 },
                { type: 'break', duration: 10 }
            ];
        }
    }, [durationMinutes]);

    const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(phases[0].duration * 60);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0 && isActive) {
            if (currentPhaseIndex < phases.length - 1) {
                // Move to next phase automatically
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCurrentPhaseIndex(prev => prev + 1);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setTimeLeft(phases[currentPhaseIndex + 1].duration * 60);
                // Keep active to auto-start break/next focus
            } else {
                // Entire compound session finished
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsActive(false);
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsFinished(true);
            }
        }
    }, [timeLeft, isActive, currentPhaseIndex, phases]);

    const toggleTimer = () => setIsActive(!isActive);

    // Allows stopping without "failure" penalty
    const stopEarly = () => {
        setIsActive(false);
        setIsFinished(true);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Current phase contextuals
    const currentPhase = phases[currentPhaseIndex];
    const isBreak = currentPhase?.type === 'break';
    const MAX_TIME = currentPhase?.duration * 60;

    // Circular Progress Calculation
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / MAX_TIME;
    const strokeDashoffset = circumference - (progress * circumference);

    if (isFinished) {
        return (
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-10 shadow-lg border border-white/50 w-full max-w-lg mx-auto flex flex-col items-center animate-fadeIn text-center">
                <CheckCircle size={64} className="text-[#00b894] mb-6 animate-bounce" />
                <h2 className="text-3xl font-bold text-[#2d3436] mb-4">Session Complete</h2>
                <p className="text-xl text-[#636e72] font-medium leading-relaxed mb-8">
                    &quot;You showed up.<br />That&apos;s enough.&quot;
                </p>
                <button
                    onClick={() => onComplete(task.id)}
                    className="bg-[#00b894] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#00a884] transition transform hover:scale-105"
                >
                    Return to Timeline
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/50 w-full max-w-lg mx-auto flex flex-col items-center animate-fadeIn">

            <div className="w-full flex justify-between items-center mb-4">
                <button onClick={onBack} className="text-sm text-[#636e72] hover:text-[#2d3436] flex items-center gap-1 transition">
                    <ArrowLeft size={16} /> Back
                </button>
                <span className="text-xs font-semibold bg-white/50 text-gray-500 px-3 py-1 rounded-full uppercase tracking-wider">
                    {durationMinutes} Min Session
                </span>
            </div>

            <h2 className="text-xl font-semibold text-[#636e72] mb-1">
                {isBreak ? 'Rest & Recharge' : `Focus Phase ${Math.floor(currentPhaseIndex / 2) + 1}/${Math.ceil(phases.length / 2)}`}
            </h2>

            <div className="flex items-center gap-2 mb-8 justify-center min-h-[32px]">
                {isBreak ? (
                    <>
                        <Coffee className="text-blue-500 animate-pulse" size={24} />
                        <h3 className="text-2xl font-bold text-blue-500">Break Time</h3>
                    </>
                ) : (
                    <h3 className="text-2xl font-bold text-[#2d3436] text-center">{task.text}</h3>
                )}
            </div>

            <div className="relative mb-8">
                {/* Pulse Effect Background */}
                {isActive && (
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full animate-ping opacity-75 
                        ${isBreak ? 'bg-blue-400/30' : 'bg-[#a29bfe]/20'}`}>
                    </div>
                )}

                {/* SVG Timer Circle */}
                <svg className="transform -rotate-90 w-72 h-72 relative z-10">
                    <circle
                        cx="144"
                        cy="144"
                        r={radius}
                        stroke="white"
                        strokeWidth="12"
                        fill="transparent"
                        className="opacity-30"
                    />
                    <circle
                        cx="144"
                        cy="144"
                        r={radius}
                        stroke={isBreak ? "#3b82f6" : "#ff9f43"}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>

                {/* Time Display */}
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold font-mono tracking-wider z-20 ${isBreak ? 'text-blue-500' : 'text-[#2d3436]'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-6 relative z-20 mb-6">
                <button
                    onClick={toggleTimer}
                    className={`w-16 h-16 rounded-full text-white flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-all ${isBreak ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500'}`}
                >
                    {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
            </div>

            <div className="flex gap-4 relative z-20 mt-4">
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to end the current phase early?')) {
                            setTimeLeft(0);
                            setIsActive(true); // Ensure useEffect triggers transition
                        }
                    }}
                    className="text-sm font-medium text-gray-500 hover:text-orange-500 flex items-center gap-2 transition-colors hover:underline px-4 py-2"
                >
                    <FastForward size={16} /> Skip Phase
                </button>

                <button
                    onClick={stopEarly}
                    className="text-sm font-medium text-[#636e72] hover:text-[#2d3436] flex items-center gap-2 transition-colors hover:underline px-4 py-2"
                >
                    Stop Early (No Penalty)
                </button>
            </div>
        </div>
    );
}
