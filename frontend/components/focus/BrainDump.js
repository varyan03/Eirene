import { useState } from 'react';
import { ArrowRight, Trash2 } from 'lucide-react';

export default function BrainDump({ onProcess }) {
    const [input, setInput] = useState('');
    const [items, setItems] = useState([]);

    const handleAdd = () => {
        if (!input.trim()) return;
        const newItem = { id: Date.now(), text: input, type: 'raw' };
        setItems([...items, newItem]);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg border border-white/50 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#2d3436] mb-2">Brain Dump</h2>
            <p className="text-[#636e72] mb-6">Get everything out of your head. Don&apos;t worry about organizing yet.</p>

            {/* Input Area */}
            <div className="relative mb-8">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What's on your mind? (Press Enter to add)"
                    className="w-full bg-white/50 border border-white/60 rounded-xl p-4 pr-12 text-[#2d3436] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a29bfe]/50 resize-none h-32 transition-all"
                />
                <button
                    onClick={handleAdd}
                    className="absolute bottom-3 right-3 bg-[#a29bfe] text-white p-2 rounded-lg hover:bg-[#8c7ae6] transition-colors shadow-sm"
                >
                    <ArrowRight size={20} />
                </button>
            </div>

            {/* List of Captured Items */}
            {items.length > 0 && (
                <div className="space-y-3 mb-8">
                    {items.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between bg-white/60 p-3 rounded-lg border border-white/40 animate-fadeIn">
                            <span className="text-[#2d3436]">{item.text}</span>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {items.length > 0 && (
                <button
                    onClick={() => onProcess(items)}
                    className="w-full py-3 bg-[#fdcb6e] text-white font-semibold rounded-xl shadow-md hover:bg-[#fab1a0] transition-all transform hover:-translate-y-0.5"
                >
                    Process These Items
                </button>
            )}
        </div>
    );
}
