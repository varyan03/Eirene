import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <Header />

      {/* Temporary Hero Placeholder to visualize layout */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-sm">
          Your Sanctuary <br /> for Focus and Calm.
        </h1>
      </div>
    </main>
  );
}
