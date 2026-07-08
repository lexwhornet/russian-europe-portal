"use client";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center font-bold">
                РЕ
              </div>
              <div>
                <span className="font-bold text-lg">Русская Европа</span>
                <span className="block text-xs text-navy-400">Партнёрский портал</span>
              </div>
            </div>
            <p className="text-navy-400 text-sm leading-relaxed">
              Портал для риэлторов и агентств недвижимости — партнёров застройщика «Русская Европа»
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gold-400 mb-4">Быстрые ссылки</h4>
            <div className="space-y-2">
              {
                [
                  { href: "#content", label: "Контент для соцсетей" },
                  { href: "#projects", label: "Информация о проектах" },
                  { href: "#media", label: "Фото и видео" },
                  { href: "#buying", label: "Условия покупки" },
                  { href: "#partners", label: "Условия для партнёров" },
                  { href: "#blog", label: "Блог" },
                  { href: "#chess", label: "Шахматка" },
                  { href: "https://re-shahmatka.ru/?project=all-3", label: "Шахматка (внешняя)" },
                ].map((link) => (
                  <a key={link.href} href={link.href} className="block text-sm text-navy-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                ))
              }
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gold-400 mb-4">Контакты</h4>
            <div className="space-y-3 text-sm">
              <a href="https://t.me/re_partners_bot?start=personal_36" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c.18 1.897...z"/></svg>
                Telegram-бот
              </a>
              <a href="https://max.ru/id3906957034_bot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-navy-400 hover:text-white transition-colors">
                💬 Макс-бот
              </a>
              <a href="tel:+79051301862" className="flex items-center gap-2 text-navy-400 hover:text-white transition-colors">
                📞 8 905 130 18 62
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}