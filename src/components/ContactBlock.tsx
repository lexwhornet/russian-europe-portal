"use client";

interface ContactBlockProps {
  prominent?: boolean;
}

export default function ContactBlock({ prominent = false }: ContactBlockProps) {
  if (prominent) {
    return (
      <div className="mt-16 rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-8 md:p-12 text-white shadow-2xl">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ★ Станьте нашим партнёром
          </div>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Подключитесь к партнёрской программе
          </h3>
          <p className="text-lg md:text-xl text-navy-200 mb-8 leading-relaxed">
            Чтобы зафиксировать клиента и начать работу, подключитесь через нашего бота.
            Мы ценим каждого партнёра и предлагаем лучшие условия сотрудничества.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="https://t.me/re_partners_bot?start=personal_36"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.912.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.1.154.232.17.325.015.094.034.31.019.478z"/></svg>
              Telegram-бот
            </a>
            <a
              href="https://max.ru/id3906957034_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            >
              Макс-бот
            </a>
          </div>
          <div className="border-t border-white/20 pt-8">
            <h4 className="text-lg font-semibold text-gold-300 mb-4">Контактные данные</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <a href="https://max.ru/u/f9LHodD0cOKv6T4eR_UjAAOhjprK5-4M83VMQRh3pIa38vDPDR3N9ompkkA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center text-navy-200 hover:text-white transition-colors">
                <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                Менеджер в Максе
              </a>
              <a href="tel:+79051301862" className="flex items-center gap-2 justify-center text-navy-200 hover:text-white transition-colors">
                <svg className="w-5 h-5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                8 905 130 18 62
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-r from-navy-50 to-gold-50 border border-navy-100 p-6 md:p-8">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-navy-900 mb-3">
          Подключитесь к партнёрской программе
        </h3>
        <p className="text-navy-600 mb-6">
          Чтобы зафиксировать клиента и начать работу, подключитесь через нашего бота
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <a
            href="https://t.me/re_partners_bot?start=personal_36"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.912.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.1.154.232.17.325.015.094.034.31.019.478z"/></svg>
            Telegram-бот
          </a>
          <a
            href="https://max.ru/id3906957034_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-navy-900 border border-navy-200 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
          >
            Макс-бот
          </a>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-navy-600">
          <a href="https://max.ru/u/f9LHodD0cOKv6T4eR_UjAAOhjprK5-4M83VMQRh3pIa38vDPDR3N9ompkkA" target="_blank" rel="noopener noreferrer" className="hover:text-navy-900 transition-colors">
            💬 Менеджер в Максе
          </a>
          <a href="tel:+79051301862" className="hover:text-navy-900 transition-colors">
            📞 8 905 130 18 62
          </a>
        </div>
      </div>
    </div>
  );
}
