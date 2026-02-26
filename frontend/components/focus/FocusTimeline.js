'use client';
import { useState, useMemo, useEffect } from 'react';
import { Play, Clock, ArrowLeft, Info, Calendar, Lock, ChevronUp, ChevronDown, Edit2, Check, X } from 'lucide-react';
import { generateSchedule, formatTimeAMPM } from '@/utils/schedulingAlgorithm';

export default function FocusTimeline({ focusData, onStartSession, onBack }) {
    const [activeView, setActiveView] = useState('Today'); // 'Today' or 'Tomorrow'
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [localSchedule, setLocalSchedule] = useState([]);
    const [editingTimeId, setEditingTimeId] = useState(null);
    const [editTimeValue, setEditTimeValue] = useState('');

    // Dynamically generate the schedule for the selected day from the raw raw focusData
    const scheduleData = useMemo(() => {
        const targetData = focusData[activeView.toLowerCase()];
        return generateSchedule({
            dateToggle: activeView,
            high: targetData.high,
            medium: targetData.medium,
            low: targetData.low
        });
    }, [focusData, activeView]);

    const { schedule, isOverCapacity, hasLateNightWarning, message } = scheduleData;

    useEffect(() => {
        setLocalSchedule(schedule);
    }, [schedule]);

    const handleMoveTask = (index, direction) => {
        const newSchedule = [...localSchedule];
        const targetIndex = index + direction;

        if (targetIndex < 0 || targetIndex >= newSchedule.length) return;

        const taskA = newSchedule[index];
        const taskB = newSchedule[targetIndex];

        const tempText = taskA.text;
        const tempTier = taskA.tier;
        const tempId = taskA.id;

        newSchedule[index] = { ...taskA, text: taskB.text, tier: taskB.tier, id: taskB.id };
        newSchedule[targetIndex] = { ...taskB, text: tempText, tier: tempTier, id: tempId };

        setLocalSchedule(newSchedule);
    };

    const handleTimeSave = (id, newTimeStr) => {
        if (!newTimeStr) {
            setEditingTimeId(null);
            return;
        }

        const newSchedule = [...localSchedule];
        const taskIndex = newSchedule.findIndex(t => t.id === id);
        if (taskIndex === -1) return;

        const [hours, minutes] = newTimeStr.split(':').map(Number);

        let baseTime = new Date(newSchedule[taskIndex].startTime);
        baseTime.setHours(hours, minutes, 0, 0);

        let currentTime = baseTime;
        for (let i = taskIndex; i < newSchedule.length; i++) {
            const startTime = new Date(currentTime);
            const endTime = new Date(currentTime);
            endTime.setHours(endTime.getHours() + 1);

            newSchedule[i] = {
                ...newSchedule[i],
                startTime,
                endTime,
                blockLabel: `${formatTimeAMPM(startTime)} - ${formatTimeAMPM(endTime)}`
            };

            currentTime = endTime;
        }

        setLocalSchedule(newSchedule);
        setEditingTimeId(null);
    };

    const handleSessionSelect = (task, durationMinutes) => {
        setOpenDropdownId(null);
        onStartSession({ ...task, targetDuration: durationMinutes });
    };

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-white/50 w-full max-w-2xl mx-auto animate-fadeIn">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition">
                    <ArrowLeft size={16} /> Edit Plan
                </button>

                {/* Multi-Day Timeline Toggle */}
                <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-white/60 shadow-sm">
                    {['Today', 'Tomorrow'].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setActiveView(opt)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeView === opt
                                ? 'bg-white text-orange-500 shadow-md transform scale-105'
                                : 'text-gray-500 hover:text-gray-800'
                                }`}
                        >
                            {opt === 'Tomorrow' && <Calendar size={14} />}
                            {opt} Schedule
                        </button>
                    ))}
                </div>

                <div className="hidden md:block w-20"></div> {/* Spacer for centering on desktop */}
            </div>

            {/* Supportive Messages */}
            {message && (
                <div className={`mb-8 p-4 rounded-xl flex items-start gap-3 text-sm 
                    ${isOverCapacity ? 'bg-orange-100 text-orange-800' :
                        hasLateNightWarning ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}`}>
                    <Info size={18} className="mt-0.5 shrink-0" />
                    <div>
                        <span className="font-semibold block mb-1">
                            {isOverCapacity ? 'Gentle Boundary' : 'Schedule Generated'}
                        </span>
                        {message}
                    </div>
                </div>
            )}

            {/* Timeline view */}
            <div className="relative pl-6 border-l-2 border-orange-300/50 space-y-8 my-8 pb-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {localSchedule.map((slot, index) => (
                    <div key={`${slot.id}-${index}`} className={`relative group ${openDropdownId === slot.id ? 'z-50' : 'z-0'}`}>
                        {/* Timeline dot */}
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-orange-400 shadow-sm group-hover:scale-125 transition-transform"></div>

                        <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-white/50 hover:border-orange-300 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group-hover:shadow-md group-hover:-translate-y-1">

                            <div className="flex items-start gap-3">
                                {/* Reorder Controls */}
                                <div className="flex flex-col gap-0.5 mt-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleMoveTask(index, -1)}
                                        disabled={index === 0}
                                        className="p-1 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded disabled:opacity-30 transition"
                                    >
                                        <ChevronUp size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleMoveTask(index, 1)}
                                        disabled={index === localSchedule.length - 1}
                                        className="p-1 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded disabled:opacity-30 transition"
                                    >
                                        <ChevronDown size={16} />
                                    </button>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1 group/time">
                                        <Clock size={14} className="text-gray-400 shrink-0" />
                                        {editingTimeId === slot.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="time"
                                                    value={editTimeValue}
                                                    onChange={(e) => setEditTimeValue(e.target.value)}
                                                    className="text-xs border border-orange-300 rounded px-1 py-0.5 min-w-[80px] outline-none focus:ring-1 focus:ring-orange-400"
                                                />
                                                <button onClick={() => handleTimeSave(slot.id, editTimeValue)} className="text-emerald-500 hover:scale-110 transition"><Check size={14} /></button>
                                                <button onClick={() => setEditingTimeId(null)} className="text-gray-400 hover:scale-110 transition"><X size={14} /></button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-xs font-semibold text-gray-500 tracking-wider font-mono">
                                                    {slot.blockLabel}
                                                </span>
                                                <button
                                                    onClick={() => {
                                                        setEditingTimeId(slot.id);
                                                        const d = new Date(slot.startTime);
                                                        setEditTimeValue(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
                                                    }}
                                                    className="sm:opacity-0 group-hover/time:opacity-100 text-gray-300 hover:text-orange-500 transition p-1"
                                                >
                                                    <Edit2 size={12} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">{slot.text}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block capitalize font-bold
                                        ${slot.tier === 'high' ? 'bg-rose-100 text-rose-700' :
                                            slot.tier === 'medium' ? 'bg-orange-100 text-orange-700' :
                                                'bg-emerald-100 text-emerald-700'}`}>
                                        {slot.tier} Priority
                                    </span>
                                </div>
                            </div>

                            {/* Session Trigger */}
                            <div className="relative">
                                {activeView === 'Tomorrow' ? (
                                    <button
                                        disabled
                                        className="bg-gray-100 text-gray-400 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 w-full sm:w-auto justify-center border border-gray-200 cursor-not-allowed"
                                        title="Unlocks at midnight"
                                    >
                                        <Lock size={14} /> Locked
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenDropdownId(openDropdownId === slot.id ? null : slot.id);
                                            }}
                                            className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:from-orange-500 hover:to-rose-500 transition-all flex items-center gap-2 w-full sm:w-auto justify-center transform hover:scale-105 active:scale-95 border-t border-white/20"
                                        >
                                            <Play size={14} fill="currentColor" /> Start
                                        </button>

                                        {openDropdownId === slot.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-10 py-2 animate-fadeIn">
                                                <div className="text-xs font-semibold text-gray-400 px-4 mb-2 uppercase tracking-wider">Session Length</div>
                                                <button onClick={() => handleSessionSelect(slot, 10)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                                                    10 min <span className="text-xs text-gray-400">(Quick start)</span>
                                                </button>
                                                <button onClick={() => handleSessionSelect(slot, 25)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                                                    25 min <span className="text-xs text-gray-400">(Pomodoro)</span>
                                                </button>
                                                <button onClick={() => handleSessionSelect(slot, 50)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                                                    50 min <span className="text-xs text-gray-400">(Deep dive)</span>
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                ))}

                {localSchedule.length === 0 && (
                    <div className="text-gray-500 italic py-4">No tasks planned for {activeView.toLowerCase()}.</div>
                )}
            </div>

        </div>
    );
}
