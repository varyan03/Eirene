import { Target, Leaf, Shield } from "lucide-react";

const features = [
    {
        title: "Deep Focus",
        description: "Science-backed timer techniques to help you enter the flow state.",
        icon: Target,
        color: "bg-purple-100 text-purple-600",
    },
    {
        title: "Calm & Relax",
        description: "Curated breathing exercises and visual meditations.",
        icon: Leaf,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Privacy First",
        description: "Your data stays on your device. No tracking, no ads, just peace of mind.",
        icon: Shield,
        color: "bg-blue-100 text-blue-600",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#2d3436]">
                    Discover Inner Peace
                </h2>
                <p className="text-[#636e72] max-w-2xl mx-auto text-lg">
                    Whether you need to power through work or unwind after a long day, Eirene adapts to your needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="group p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-start"
                    >
                        <div className={`p-4 rounded-2xl mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className="w-8 h-8" strokeWidth={2} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[#2d3436]">
                            {feature.title}
                        </h3>
                        <p className="text-[#636e72] leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
