"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { href: "#content", label: "Контент" },
  { href: "#socials", label: "Соцсети" },
  { href: "#projects", label: "Проекты" },
  { href: "#media", label: "Фото и видео" },
  { href: "#buying", label: "Условия покупки" },
  { href: "#partners", label: "Для партнёров" },
  { href: "#blog", label: "Блог" },
  { href: "#chess", label: "Шахматка" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${scrolled ? "bg-navy-900 text-gold-400" : "bg-white/20 text-white backdrop-blur-sm"}`}>
                РЕ
              </div>
              <div>
                <span className={`font-bold text-lg ${scrolled ? "text-navy-900" : "text-white"}`}>
                  Русская Европа
                </span>
                <span className={`block text-xs ${scrolled ? "text-navy-500" : "text-white/70"}`}>
                  Партнёрский портал
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-navy-700 hover:text-navy-900 hover:bg-navy-50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-navy-900" : "text-white"}`}
              aria-label="Открыть меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl animate-slide-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center font-bold">
                    РЕ
                  </div>
                  <div>
                    <span className="font-bold text-navy-900">Русская Европа</span>
                    <span className="block text-xs text-navy-500">Партнёрский портал</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  aria-label="Закрыть меню"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-navy-700 hover:bg-navy-50 hover:text-navy-900 font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href="https://t.me/re_partners_bot?start=personal_36"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-navy-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy-800 transition-colors"
                >
                  Стать партнёром
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
