import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-12 lg:px-24 pt-20 pb-10 z-10 max-w-7xl mx-auto">

        {/* Text Content (Left) */}
        <div className="flex-1 text-center md:text-left z-10 mt-10 md:mt-0">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[#2d3436] leading-[1.1] drop-shadow-sm">
            Your Sanctuary <br /> for Focus and Calm.
          </h1>

          <p className="text-lg md:text-xl text-[#636e72] mb-8 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
            Discover a personalized space to reduce stress, improve focus, and find your balance through guided experiences.
          </p>

          <a
            href="/focus"
            className="inline-block px-8 py-4 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-[#a29bfe] to-[#fdcb6e] hover:from-[#8c7ae6] hover:to-[#e17055] shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-1"
          >
            Begin Your Journey
          </a>
        </div>

        {/* Visual Content (Right) */}
        <div className="flex-1 relative flex justify-center md:justify-end items-center mt-12 md:mt-0">
          {/* Abstract Globs behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#a29bfe]/30 rounded-full blur-[80px] -z-10"></div>
          <div className="absolute top-1/4 right-0 w-[250px] h-[250px] bg-[#fdcb6e]/30 rounded-full blur-[60px] -z-10"></div>

          <img
            src="/hero-brain.png"
            alt="Floating 3D Brain Cloud"
            className="w-full max-w-[500px] object-contain animate-float drop-shadow-2xl"
          />
        </div>
      </section>
    </main>
  );
}
