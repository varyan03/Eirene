'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import BrainDump from '@/components/focus/BrainDump';

export default function FocusPage() {
    const [brainDumpItems, setBrainDumpItems] = useState([]);

    const handleProcessItems = (items) => {
        setBrainDumpItems(items);
        console.log("Items captured:", items);
        // Future: Move to next step (Processor)
        alert("Capture phase complete! Items saved.");
    };

    return (
        <main className="min-h-screen bg-[#dfe6e9] relative overflow-hidden">
            <Header />

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a29bfe]/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#fdcb6e]/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-6 pt-32 pb-12 flex flex-col items-center">

                {/* Simple Title for Capture Phase */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-[#2d3436] mb-2">Focus Mode</h1>
                    <p className="text-[#636e72]">Step 1: Capture your thoughts</p>
                </div>

                {/* Dynamic Content */}
                <div className="w-full max-w-4xl transition-all duration-500 ease-in-out">
                    <BrainDump onProcess={handleProcessItems} />
                </div>

            </div>
        </main>
    );
}
