"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "Is Eirene free to use?",
        answer: "Yes! The core features of Eirene, including the Focus Timer and basic Relaxation tools, are completely free. We believe mental wellness should be accessible to everyone."
    },
    {
        question: "Do you store my personal data?",
        answer: "We prioritize your privacy. All session data (timers, preferences) is stored locally on your device. We do not track your activity or sell your data."
    },
    {
        question: "How does the Focus Timer work?",
        answer: "Our timer uses the Pomodoro technique by default (25 minutes focus, 5 minutes break), but you can customize it to fit your personal workflow."
    },
    {
        question: "Can I use Eirene offline?",
        answer: "Absolutely. Once the app is loaded, all features work seamlessly without an internet connection."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-[#2d3436]">
                Common Questions
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                        >
                            <span className="text-lg font-semibold text-[#2d3436]">
                                {faq.question}
                            </span>
                            {openIndex === index ? (
                                <ChevronUp className="w-5 h-5 text-[#636e72]" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-[#636e72]" />
                            )}
                        </button>

                        <div
                            className={`px-6 text-[#636e72] leading-relaxed overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
