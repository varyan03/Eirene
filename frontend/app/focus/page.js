'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Header from '@/components/Header';

const FocusTimer = dynamic(() => import('@/components/focus/FocusTimer'), { loading: () => <p className="text-center text-gray-500 animate-pulse">Loading timer...</p> });
const FocusPlanner = dynamic(() => import('@/components/focus/FocusPlanner'), { loading: () => <p className="text-center text-gray-500 animate-pulse">Loading planner...</p> });
const FocusTimeline = dynamic(() => import('@/components/focus/FocusTimeline'), { loading: () => <p className="text-center text-gray-500 animate-pulse">Loading timeline...</p> });
const QuickFocus = dynamic(() => import('@/components/focus/QuickFocus'), { loading: () => <p className="text-center text-gray-500 animate-pulse">Loading quick focus...</p> });
import { loadFocusData, saveFocusData, clearFocusData } from '@/utils/focusStorage';
import { generateSchedule } from '@/utils/schedulingAlgorithm';

export default function FocusPage() {
    const [viewMode, setViewMode] = useState('selection'); // 'selection', 'structured' or 'quick'

    // Structured flow states
    const [structuredStep, setStructuredStep] = useState('planner'); // 'planner', 'timeline', 'timer'
    const [scheduleData, setScheduleData] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [completedTasks, setCompletedTasks] = useState([]);

    // On mount, check if there's a valid saved schedule
    useEffect(() => {
        const savedData = loadFocusData();
        if (savedData && (
            savedData.today.high.length > 0 || savedData.today.medium.length > 0 || savedData.today.low.length > 0 ||
            savedData.tomorrow.high.length > 0 || savedData.tomorrow.medium.length > 0 || savedData.tomorrow.low.length > 0
        )) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setScheduleData(savedData); // Store the RAW Multi-day payload
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCompletedTasks(savedData.completedTasks || []);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStructuredStep('timeline');
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setScheduleData(null);
        }
    }, []);

    const handleGenerateTimeline = (focusData) => {
        saveFocusData(focusData, []); // Save raw multi-day data and reset completed
        setCompletedTasks([]);
        setScheduleData(focusData);
        setStructuredStep('timeline');
    };

    const handleStartFocus = (task) => {
        setCurrentTask(task);
        setStructuredStep('timer');
    };

    const handleCompleteTask = (taskId) => {
        // Return to timeline without deleting the task, preserving the plan
        let newCompletedTasks = completedTasks;
        if (taskId && !completedTasks.includes(taskId)) {
            newCompletedTasks = [...completedTasks, taskId];
            setCompletedTasks(newCompletedTasks);

            if (scheduleData) {
                saveFocusData(scheduleData, newCompletedTasks);
            }
        }
        setCurrentTask(null);
        setStructuredStep('timeline');
    };

    const handleEditPlan = () => {
        // Non-destructive edit: just return to planner view, passing raw data back down
        setStructuredStep('planner');
    };

    return (
        <main className="pl-20 min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden transition-colors duration-1000">
            <Header />

            {/* Bright, Motivating Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-yellow-300 to-orange-400 opacity-40 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-rose-400 to-pink-400 opacity-40 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-gradient-to-tr from-amber-300 to-yellow-400 opacity-30 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s' }}></div>
            </div>

            <div className="container mx-auto px-6 pt-32 pb-12 flex flex-col items-center">

                {/* Mode Selection Screen */}
                {viewMode === 'selection' && (
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 z-10 relative">
                        {/* Structured Plan Card */}
                        <div
                            onClick={() => setViewMode('structured')}
                            className="bg-white/30 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/40 shadow-[0_8px_32px_0_rgba(255,159,67,0.1)] cursor-pointer hover:bg-white/50 hover:shadow-[0_8px_32px_0_rgba(255,159,67,0.2)] hover:border-white/60 transition-all duration-500 ease-out transform hover:-translate-y-2 group flex flex-col"
                        >
                            <div
                                className="w-full h-48 rounded-[2rem] mb-8 shadow-inner overflow-hidden group-hover:shadow-md transition-all duration-500 relative"
                            >
                                <Image src="/images/structured_plan_bg.png" alt="Structured Plan Background" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-orange-500 transition-colors duration-300 px-2">Structured Plan</h2>
                            <p className="text-gray-600/90 leading-relaxed text-lg mb-8 px-2 flex-grow">
                                Organize your day by intent. Input high, medium, and low priority tasks, and let Eirene build a sustainable, guilt-free hourly timeline for you.
                            </p>
                            <span className="text-base font-bold text-orange-500 flex items-center gap-2 group-hover:gap-3 transition-all px-2 md:mt-auto">
                                Plan your day <span className="text-xl">&rarr;</span>
                            </span>
                        </div>

                        {/* Quick Focus Card */}
                        <div
                            onClick={() => setViewMode('quick')}
                            className="bg-white/30 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/40 shadow-[0_8px_32px_0_rgba(251,113,133,0.1)] cursor-pointer hover:bg-white/50 hover:shadow-[0_8px_32px_0_rgba(251,113,133,0.2)] hover:border-white/60 transition-all duration-500 ease-out transform hover:-translate-y-2 group flex flex-col"
                        >
                            <div
                                className="w-full h-48 rounded-[2rem] mb-8 shadow-inner overflow-hidden group-hover:shadow-md transition-all duration-500 relative"
                            >
                                <Image src="/images/quick_focus_bg.png" alt="Quick Focus Background" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-rose-500 transition-colors duration-300 px-2">Quick Focus</h2>
                            <p className="text-gray-600/90 leading-relaxed text-lg mb-8 px-2 flex-grow">
                                Skip the planning phase. Jump straight into a focused 25 or 50-minute Pomodoro session for a single, ad-hoc task.
                            </p>
                            <span className="text-base font-bold text-rose-500 flex items-center gap-2 group-hover:gap-3 transition-all px-2 md:mt-auto">
                                Start focusing now <span className="text-xl">&rarr;</span>
                            </span>
                        </div>
                    </div>
                )}

                {/* Back to Selection Button (Only visible in active modes) */}
                {viewMode !== 'selection' && (
                    <div className="w-full max-w-4xl flex justify-start mb-6 z-10 relative">
                        <button
                            onClick={() => setViewMode('selection')}
                            className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-2 transition bg-white/40 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/50 shadow-sm"
                        >
                            &larr; Choose Mode
                        </button>
                    </div>
                )}

                {/* Dynamic Content */}
                <div className="w-full max-w-4xl transition-all duration-500 ease-in-out relative z-10">

                    {viewMode === 'quick' && (
                        <QuickFocus />
                    )}

                    {viewMode === 'structured' && structuredStep === 'planner' && (
                        <FocusPlanner onGenerate={handleGenerateTimeline} initialData={scheduleData} />
                    )}

                    {viewMode === 'structured' && structuredStep === 'timeline' && scheduleData && (
                        <FocusTimeline
                            focusData={scheduleData} // Passing raw multi-day data instead of pre-generated schedule
                            completedTasks={completedTasks}
                            onStartSession={handleStartFocus}
                            onBack={handleEditPlan}
                        />
                    )}

                    {viewMode === 'structured' && structuredStep === 'timer' && currentTask && (
                        <FocusTimer
                            task={currentTask}
                            onComplete={handleCompleteTask}
                            onBack={() => setStructuredStep('timeline')}
                        />
                    )}
                </div>

            </div>
        </main>
    );
}
