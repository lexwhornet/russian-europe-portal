"use client";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-900/60 to-navy-950/80" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-5 py-2 rounded-full text-sm font-medium mb-8 border border-white/20">
          <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          Портал для партнёров застройщика
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Русская{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
            Европа
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
          Всё для успешных продаж: презентации, контент, условия и&nbsp;поддержка для риэлторов и&nbsp;агентств недвижимости
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#partners"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-gold-500/30"
          >
            Стать партнёром
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm"
          >
            О проектах
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
