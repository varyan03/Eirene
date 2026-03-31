'use client';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Check, ArrowLeft, ArrowRight } from 'lucide-react';

const groups = [
    { key: 'hands', label: 'Hands & Forearms', tense: 5, relax: 30, desc: 'Clench your fists and tense your forearms. Hold the tension, then release and notice the sensation.' },
    { key: 'arms', label: 'Upper Arms & Shoulders', tense: 5, relax: 30, desc: 'Tighten your biceps and shoulders by pulling your shoulders up toward your ears. Hold, then relax.' },
    { key: 'face', label: 'Face & Jaw', tense: 5, relax: 30, desc: 'Squeeze your facial muscles and jaw lightly. Hold, then soften your face and feel the release.' },
    { key: 'neck', label: 'Neck', tense: 5, relax: 30, desc: 'Carefully tense the neck by gently pressing your head back (avoid strain). Hold, then relax gently.' },
    { key: 'chest', label: 'Chest & Upper Back', tense: 5, relax: 30, desc: 'Take a deep breath and hold to feel your chest tense, then exhale and relax your chest and back.' },
    { key: 'stomach', label: 'Abdomen', tense: 5, relax: 30, desc: 'Tighten your abdominal muscles, hold briefly, then let them soften.' },
    { key: 'thighs', label: 'Thighs', tense: 5, relax: 30, desc: 'Squeeze your thigh muscles gently. Hold the tension, then release.' },
    { key: 'calves', label: 'Calves & Shins', tense: 5, relax: 30, desc: 'Point or flex your toes to engage your calves. Hold, then relax and notice the warm release.' },
    { key: 'feet', label: 'Feet', tense: 5, relax: 30, desc: 'Curl your toes and tense the soles of your feet. Hold, then release fully.' }
];

export default function PMR({ onBack }) {
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState('idle'); // idle | tense | relax | complete
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        // Clear interval on unmount
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (!isActive) return clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft <= 0) {
            if (phase === 'tense') {
                // move to relax for the same group
                const relaxSec = groups[index].relax;
                setPhase('relax');
                setTimeLeft(relaxSec);
            } else if (phase === 'relax') {
                // advance to next group or finish
                if (index < groups.length - 1) {
                    const next = index + 1;
                    setIndex(next);
                    setPhase('tense');
                    setTimeLeft(groups[next].tense);
                } else {
                    setPhase('complete');
                    setIsActive(false);
                }
            } else if (phase === 'idle') {
                // Shouldn't happen while active
            }
        }
    }, [timeLeft, phase, index, isActive]);

    const start = () => {
        if (phase === 'idle' || phase === 'complete') {
            setIndex(0);
            setPhase('tense');
            setTimeLeft(groups[0].tense);
            setIsActive(true);
            return;
        }

        // resume
        setIsActive(true);
    };

    const pause = () => {
        setIsActive(false);
    };

    const reset = () => {
        setIsActive(false);
        clearInterval(intervalRef.current);
        setIndex(0);
        setPhase('idle');
        setTimeLeft(0);
    };

    const next = () => {
        clearInterval(intervalRef.current);
        if (index < groups.length - 1) {
            const nextIndex = index + 1;
            setIndex(nextIndex);
            setPhase('tense');
            setTimeLeft(groups[nextIndex].tense);
            setIsActive(false);
        } else {
            setPhase('complete');
            setIsActive(false);
        }
    };

    const prev = () => {
        clearInterval(intervalRef.current);
        if (index > 0) {
            const prevIndex = index - 1;
            setIndex(prevIndex);
            setPhase('tense');
            setTimeLeft(groups[prevIndex].tense);
            setIsActive(false);
        } else {
            reset();
        }
    };

    const formatTime = (s) => {
        if (s == null) return '';
        const secs = Math.max(0, s);
        const mm = Math.floor(secs / 60);
        const ss = secs % 60;
        return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    };

    const current = groups[index];

    return (
        <div className="flex flex-col items-center justify-start w-full min-h-[50vh] animate-fadeIn mt-8 pb-12">
            {phase !== 'complete' ? (
                <>
                    <div className="flex flex-col items-center mb-10 text-center px-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 shadow-sm backdrop-blur-md mb-4">
                            <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">Progressive Muscle Relaxation</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light mb-2 text-gray-800">{current.label}</h2>
                        <p className="max-w-xl text-gray-600/90 text-md leading-relaxed px-2">{current.desc}</p>
                        <div className="mt-3 text-sm text-gray-500">Phase: <span className="font-medium text-gray-700">{phase === 'idle' ? 'Ready' : phase === 'tense' ? 'Tense' : 'Relax'}</span></div>
                    </div>

                    <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-100 to-amber-100 opacity-40 blur-xl"></div>

                        <div className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl border border-white shadow-lg z-10">
                            <div className="text-6xl font-mono tabular-nums text-gray-800">{formatTime(timeLeft)}</div>
                            <div className="text-sm text-gray-500 mt-2">{phase === 'idle' ? 'Ready' : phase === 'tense' ? 'Tense for' : 'Relax for'}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        {isActive ? (
                            <button onClick={pause} className="w-14 h-14 rounded-full bg-white/60 backdrop-blur-xl flex items-center justify-center shadow-sm">
                                <Pause size={20} />
                            </button>
                        ) : (
                            <button onClick={start} className="w-14 h-14 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-white flex items-center justify-center shadow-md">
                                <Play size={20} />
                            </button>
                        )}

                        <button onClick={prev} className="px-4 py-2 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition">Prev</button>
                        <button onClick={next} className="px-4 py-2 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition">Next</button>
                        <button onClick={reset} className="px-4 py-2 rounded-xl bg-white/40 border border-white/60 hover:bg-white/60 transition flex items-center gap-2">
                            <RotateCcw size={16} /> Reset
                        </button>
                    </div>

                    <div className="text-sm text-gray-500">Step {index + 1} of {groups.length}</div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full animate-fadeIn mt-12">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-teal-100 to-emerald-50 flex items-center justify-center mb-6 shadow-inner border border-teal-200/50">
                        <Check size={48} className="text-teal-500" />
                    </div>
                    <h2 className="text-3xl font-light text-gray-800 mb-4">Session Complete</h2>
                    <p className="text-gray-600 text-md mb-8 max-w-md text-center leading-relaxed">Great work — you moved progressively through the major muscle groups and gave your body a chance to release tension. Take a slow breath and open your eyes gently.</p>
                    <div className="flex gap-4">
                        <button onClick={reset} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/40 text-gray-700 font-medium border border-white/60 hover:bg-white/60 hover:shadow-sm transition-all">Restart</button>
                    </div>
                </div>
            )}
        </div>
    );
}
