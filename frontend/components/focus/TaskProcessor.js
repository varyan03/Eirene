import { useState } from 'react';
import { ArrowRight, Play, Edit2, Check } from 'lucide-react';

export default function TaskProcessor({ items, onStartFocus, onBack, onEndSession }) {
    // Initialize items with an 'actionText' property which defaults to the raw text
    const [tasks, setTasks] = useState(
        items.map(item => ({ ...item, actionText: item.text, isEditing: false }))
    );

    const handleEditToggle = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, isEditing: !t.isEditing } : t
        ));
    };

    const handleTextChange = (id, newText) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, actionText: newText } : t
        ));
    };

    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            handleEditToggle(id);
        }
    };

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-white/50 w-full max-w-2xl mx-auto animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2d3436]">Clarify & Select</h2>
                <div className="flex gap-4">
                    <button onClick={onEndSession} className="text-sm text-red-400 hover:text-red-500 font-medium">
                        End Session
                    </button>
                    <button onClick={onBack} className="text-sm text-[#636e72] hover:text-[#2d3436]">
                        ← Back to Dump
                    </button>
                </div>
            </div>

            <p className="text-[#636e72] mb-8">
                Refine your items into <span className="font-semibold text-[#a29bfe]">Next Physical Actions</span>.
                Select the one you want to do <strong>right now</strong>.
            </p>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="group bg-white/60 p-4 rounded-xl border border-white/60 hover:border-[#a29bfe]/50 transition-all shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-4">

                            {/* Editable Text Area */}
                            <div className="flex-1">
                                {task.isEditing ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={task.actionText}
                                            onChange={(e) => handleTextChange(task.id, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(e, task.id)}
                                            onBlur={() => handleEditToggle(task.id)}
                                            className="w-full bg-white border border-[#a29bfe] rounded-lg px-3 py-1 text-[#2d3436] focus:outline-none"
                                        />
                                        <button onClick={() => handleEditToggle(task.id)} className="text-[#a29bfe]">
                                            <Check size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleEditToggle(task.id)}>
                                        <span className="text-lg font-medium text-[#2d3436]">{task.actionText}</span>
                                        <Edit2 size={14} className="text-[#b2bec3] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}

                                {/* Original raw text ref */}
                                {task.text !== task.actionText && (
                                    <p className="text-xs text-[#b2bec3] mt-1">Origin: &quot;{task.text}&quot;</p>
                                )}
                            </div>

                            {/* Engage Button */}
                            <button
                                onClick={() => onStartFocus({ ...task, text: task.actionText })}
                                className="bg-[#fdcb6e] hover:bg-[#fab1a0] text-white p-3 rounded-full shadow-md transition-all transform hover:scale-105 active:scale-95 flex-shrink-0"
                                title="Start Focus Session"
                            >
                                <Play size={20} fill="white" className="ml-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="text-center py-12 text-[#b2bec3]">
                    No items to process. Go back and capture some thoughts!
                </div>
            )}
        </div>
    );
}
