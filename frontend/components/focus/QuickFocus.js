'use client';
import { useState, useMemo, useCallback } from 'react';
import { Play, Clock } from 'lucide-react';
import FocusTimer from './FocusTimer';

export default function QuickFocus() {
    const [isTiming, setIsTiming] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [duration, setDuration] = useState(25); // Default Pomodoro

    // Construct the ad-hoc task object expected by FocusTimer
    const currentTask = useMemo(() => ({
        id: 'quick-focus-task',
        text: taskName.trim() || 'Ad-Hoc Focus Session',
        targetDuration: duration
    }), [taskName, duration]);

    const handleStart = useCallback((e) => {
        if (e) e.preventDefault();
        if (taskName.trim()) {
            setIsTiming(true);
        }
    }, [taskName]);

    const handleComplete = useCallback(() => {
        setIsTiming(false);
        setTaskName('');
    }, []);

    const handleBack = useCallback(() => {
        setIsTiming(false);
    }, []);

    if (isTiming) {
        return (
            <FocusTimer
                task={currentTask}
                onComplete={handleComplete}
                onBack={handleBack}
            />
        );
    }

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-lg border border-white/50 w-full max-w-2xl mx-auto animate-fadeIn flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quick Focus</h2>
            <p className="text-gray-600 text-center mb-10">
                Skip the planning. Jump straight into a focused Pomodoro session for a single task.
            </p>

            <form onSubmit={handleStart} className="w-full flex flex-col items-center gap-6">

                {/* Task Input */}
                <div className="mb-6 relative">
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="What do you want to focus on?"
                        className="w-full bg-white/70 px-5 pt-7 pb-3 rounded-2xl border-none text-gray-800 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-transparent peer transition-shadow"
                        id="quickTaskInput"
                    />
                    <label
                        htmlFor="quickTaskInput"
                        className="absolute left-5 top-2 text-xs font-bold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-orange-500"
                    >
                        Task Name
                    </label>
                </div>
                {/* Duration Selection */}
                <div className="mb-8 flex gap-3">
                    <button
                        type="button"
                        onClick={() => setDuration(25)}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all border ${duration === 25
                            ? 'bg-white border-orange-400 text-orange-600 shadow-md transform scale-105'
                            : 'bg-white/40 border-white/50 text-gray-500 hover:bg-white/60'
                            }`}
                    >
                        <Clock size={16} className="inline-block mr-2" /> 25 min (Standard)
                    </button>
                    <button
                        type="button"
                        onClick={() => setDuration(50)}
                        className={`flex-1 py-4 rounded-2xl font-bold transition-all border ${duration === 50
                            ? 'bg-white border-orange-400 text-orange-600 shadow-md transform scale-105'
                            : 'bg-white/40 border-white/50 text-gray-500 hover:bg-white/60'
                            }`}
                    >
                        <Clock size={16} className="inline-block mr-2" /> 50 min (Deep Dive)
                    </button>
                </div>
                {/* Action */}
                <button
                    type="submit"
                    onClick={handleStart}
                    disabled={!taskName.trim()}
                    className="w-full bg-gradient-to-r from-orange-400 to-rose-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-orange-500 hover:to-rose-500 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Play fill="currentColor" size={20} /> Deep Focus
                </button>
            </form>
        </div>
    );
}
