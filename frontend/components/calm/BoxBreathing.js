'use client';
import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export default function BoxBreathing() {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('idle'); // idle, inhale, holdIn, exhale, holdOut
    const [counter, setCounter] = useState(4);
    const [secondsElapsed, setSecondsElapsed] = useState(0);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSecondsElapsed((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    // Derive phase and counter deterministically from absolute time
    useEffect(() => {
        if (!isActive) {
            // When not active, reset to idle state
            setPhase('idle');
            setCounter(4);
            setSecondsElapsed(0); // Reset secondsElapsed when stopping
            return;
        }

        const cycleSecond = secondsElapsed % 16; // 0 to 15

        if (cycleSecond < 4) {
            setPhase('inhale');
        } else if (cycleSecond < 8) {
            setPhase('holdIn');
        } else if (cycleSecond < 12) {
            setPhase('exhale');
        } else {
            setPhase('holdOut');
        }

        // Count down 4 -> 1 within each 4-second block
        // e.g., cycleSecond 0 -> 4, 1 -> 3, 2 -> 2, 3 -> 1
        const blockSecond = cycleSecond % 4;
        setCounter(4 - blockSecond);

    }, [secondsElapsed, isActive]);

    const handleToggle = () => {
        // When starting, secondsElapsed will be 0, which will correctly derive 'inhale' and '4'
        setIsActive(!isActive);
    };

    let instructionText = "Ready to begin?";
    if (phase === 'inhale') instructionText = "Breathe In...";
    if (phase === 'holdIn') instructionText = "Hold...";
    if (phase === 'exhale') instructionText = "Breathe Out...";
    if (phase === 'holdOut') instructionText = "Hold...";

    // Determine target scale:
    // When breathing in or holding full, the orb must be LARGE (1.2)
    // When breathing out or holding empty, the orb must be SMALL (0.5)
    // The browser's native CSS engine smoothly interpolates the 4s gap between these endpoints.
    const getScale = () => {
        if (phase === 'inhale' || phase === 'holdIn') return 1.2;
        return 0.5;
    };

    const transitionStyle = {
        transform: `scale(${getScale()})`,
        transition: 'transform 4s linear',
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[50vh] animate-fadeIn mt-8">
            <h2 className="text-3xl font-light text-gray-800 mb-16 tracking-wide h-10 transition-colors duration-500">
                {instructionText}
            </h2>

            <div className="relative w-64 h-64 flex items-center justify-center mb-24">
                {/* Background static ring to explicitly show the inhale boundary target */}
                <div className="absolute inset-0 rounded-full border-2 border-teal-200/50" style={{ transform: 'scale(1.2)' }}></div>

                {/* Inner static ring to show the exhale boundary target */}
                <div className="absolute inset-0 rounded-full border border-teal-200/30" style={{ transform: 'scale(0.5)' }}></div>

                {/* The Animated Glowing Orb Background */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-300 opacity-60 blur-xl origin-center"
                    style={transitionStyle}
                ></div>

                {/* The Solid Inner Orb */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 shadow-[0_0_40px_rgba(20,184,166,0.3)] origin-center z-10"
                    style={transitionStyle}
                ></div>

                {/* Center Text (Countdown) */}
                <div className="absolute z-20 text-white text-6xl font-light tabular-nums drop-shadow-md">
                    {isActive ? counter : ''}
                </div>
            </div>

            {/* Controls */}
            <button
                onClick={handleToggle}
                className="w-20 h-20 bg-white/60 backdrop-blur-xl rounded-full flex items-center justify-center shadow-[0_8px_32px_0_rgba(20,184,166,0.15)] border border-teal-200/50 hover:bg-white hover:scale-105 transition-all outline-none"
            >
                {isActive ? (
                    <Pause size={32} className="text-teal-600 fill-teal-600" />
                ) : (
                    <Play size={32} className="text-teal-600 fill-teal-600 ml-1" />
                )}
            </button>
        </div>
    );
}
