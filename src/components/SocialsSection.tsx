"use client";

export default function SocialsSection() {
  return (
    <section id="socials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">Соцсети</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Мы в социальных сетях
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Подписывайтесь на наши каналы, чтобы быть в курсе новостей и акций
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* VK Preview */}
          <a
            href="https://vk.com/russ.sloboda76"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.684 4 8.198c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 group-hover:text-blue-600 transition-colors">ВКонтакте</h3>
                  <p className="text-sm text-gray-500">Русская Слобода</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Подписаться</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img
                  src="/images/project-sloboda.png"
                  alt="Последний пост ВК"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-sm">
                Следите за новостями жилого комплекса «Русская Слобода» в нашем сообществе ВКонтакте. Актуальные фото, ход строительства, акции и специальные предложения.
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-blue-600 font-medium mt-4 group-hover:text-blue-700">
                Перейти в ВК
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </a>

          {/* Social buttons */}
          <div className="flex flex-col gap-4">
            {/* Telegram */}
            <a
              href="https://t.me/RussianSloboda76"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.912.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.1.154.232.17.325.015.094.034.31.019.478z"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy-900 group-hover:text-blue-600 transition-colors">Telegram</h3>
                <p className="text-gray-500">Канал «Русская Слобода»</p>
              </div>
              <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-semibold group-hover:bg-blue-100 transition-colors">
                Подписаться
              </div>
            </a>

            {/* Max */}
            <a
              href="https://web.max.ru/-71153767137359"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy-900 group-hover:text-red-600 transition-colors">Макс</h3>
                <p className="text-gray-500">Официальный канал</p>
              </div>
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold group-hover:bg-red-100 transition-colors">
                Подписаться
              </div>
            </a>

            {/* Info block */}
            <div className="bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl p-6 border border-gold-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 mb-1">Будьте в курсе</h4>
                  <p className="text-sm text-navy-600">
                    Подписывайтесь на наши каналы, чтобы первыми узнавать о новых акциях, ходе строительства и специальных предложениях для партнёров.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
