"use client";

import ContactBlock from "./ContactBlock";

export default function ChessSection() {
  return (
    <section id="chess" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">Шахматка</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Шахматка квартир
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Актуальная информация о наличии и стоимости квартир
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <div className="w-20 h-20 bg-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Выбор квартир онлайн
            </h3>
            <p className="text-navy-200 mb-8 text-lg">
              Смотрите наличие, планировки и цены всех квартир в интерактивной шахматке
            </p>
            <a
              href="https://re-shahmatka.ru/?project=all-3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-navy-950 px-10 py-5 rounded-xl font-bold text-xl transition-all hover:scale-105 shadow-lg shadow-gold-500/30"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Открыть шахматку
            </a>
          </div>
        </div>

        <ContactBlock />
      </div>
    </section>
  );
}
