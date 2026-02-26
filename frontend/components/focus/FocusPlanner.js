'use client';
import { useState, useCallback, memo } from 'react';
import { ArrowRight, Plus, Trash2, Calendar } from 'lucide-react';

const BucketList = memo(({ title, items, bucketId, colorClass, activeBucket, onRemove }) => {
    return (
        <div className={`bg-white/40 p-5 rounded-2xl border border-white/50 shadow-sm transition-all ${activeBucket === bucketId ? 'ring-2 ring-orange-400/60 shadow-md transform scale-[1.02]' : ''}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className={`font-bold ${colorClass}`}>{title}</h3>
                <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-500 font-bold shadow-sm">{items.length}</span>
            </div>

            <div className="space-y-2 mb-4 max-h-40 overflow-y-auto custom-scrollbar">
                {items.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">Empty</p>
                ) : (
                    items.map((task) => (
                        <div key={task.id} className="flex items-center justify-between bg-white/70 p-2 rounded-lg text-sm group">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 w-4">{task.rank}.</span>
                                <span className="text-gray-700 truncate max-w-[150px]">{task.text}</span>
                            </div>
                            <button onClick={() => onRemove(task.id, bucketId)} className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
});
BucketList.displayName = 'BucketList';

export default function FocusPlanner({ onGenerate, initialData }) {
    const [dateToggle, setDateToggle] = useState('Today');

    // Master state holding both days
    const [plan, setPlan] = useState({
        today: initialData?.today || { high: [], medium: [], low: [] },
        tomorrow: initialData?.tomorrow || { high: [], medium: [], low: [] }
    });

    const [input, setInput] = useState('');
    const [activeBucket, setActiveBucket] = useState('high');

    // Get current day's active list
    const currentDayKey = dateToggle.toLowerCase();
    const high = plan[currentDayKey].high;
    const medium = plan[currentDayKey].medium;
    const low = plan[currentDayKey].low;

    const handleAdd = useCallback((e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newTask = {
            id: Date.now().toString(),
            text: input.trim(),
            rank: plan[currentDayKey][activeBucket].length + 1
        };

        setPlan(prev => ({
            ...prev,
            [currentDayKey]: {
                ...prev[currentDayKey],
                [activeBucket]: [...prev[currentDayKey][activeBucket], newTask]
            }
        }));

        setInput('');
    }, [input, activeBucket, currentDayKey, plan]);

    const removeTask = useCallback((id, bucket) => {
        setPlan(prev => ({
            ...prev,
            [currentDayKey]: {
                ...prev[currentDayKey],
                [bucket]: prev[currentDayKey][bucket]
                    .filter(t => t.id !== id)
                    .map((t, i) => ({ ...t, rank: i + 1 }))
            }
        }));
    }, [currentDayKey]);

    const handleGenerate = useCallback(() => {
        // Pass the entire state object, not just one day
        onGenerate(plan);
    }, [onGenerate, plan]);

    // Total tasks across BOTH days to enable generation
    const totalTasks =
        plan.today.high.length + plan.today.medium.length + plan.today.low.length +
        plan.tomorrow.high.length + plan.tomorrow.medium.length + plan.tomorrow.low.length;

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-white/50 w-full max-w-4xl mx-auto animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Priority Planning</h2>
                    <p className="text-gray-600 text-sm">Sort tasks by intent. We&apos;ll map them to an hourly timeline.</p>
                </div>

                {/* Date Toggle */}
                <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-white/60">
                    {['Today', 'Tomorrow'].map((opt) => (
                        <button
                            key={opt}
                            onClick={() => setDateToggle(opt)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dateToggle === opt
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {opt === 'Tomorrow' && <Calendar size={14} className="inline mr-1 -mt-0.5" />}
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleAdd} className="flex gap-2 mb-8 bg-white/60 p-2 rounded-2xl border border-white/60 shadow-sm">
                <select
                    value={activeBucket}
                    onChange={(e) => setActiveBucket(e.target.value)}
                    className="bg-white px-3 py-3 rounded-xl border-none text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400/50 cursor-pointer shadow-sm"
                >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                </select>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 bg-transparent px-4 py-2 text-gray-800 focus:outline-none placeholder-gray-400"
                />

                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-gray-800 text-white p-3 rounded-xl hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus size={20} />
                </button>
            </form>

            {/* Priority Buckets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <BucketList title="High Priority" items={high} bucketId="high" colorClass="text-rose-500" activeBucket={activeBucket} onRemove={removeTask} />
                <BucketList title="Medium Priority" items={medium} bucketId="medium" colorClass="text-orange-500" activeBucket={activeBucket} onRemove={removeTask} />
                <BucketList title="Low Priority" items={low} bucketId="low" colorClass="text-emerald-500" activeBucket={activeBucket} onRemove={removeTask} />
            </div>

            {/* Generate Action */}
            <div className="flex justify-end border-t border-white/40 pt-6">
                <button
                    onClick={handleGenerate}
                    disabled={totalTasks === 0}
                    className="bg-gradient-to-r from-orange-400 to-rose-400 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-orange-500 hover:to-rose-500 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                    Generate Timeline <ArrowRight size={18} />
                </button>
            </div>
        </div >
    );
}
