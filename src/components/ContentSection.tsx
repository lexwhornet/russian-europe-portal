"use client";

import ContactBlock from "./ContactBlock";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  telegramLink: string | null;
  createdAt: string;
}

export default function ContentSection({ posts }: { posts: Post[] }) {
  return (
    <section id="content" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">Контент</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Контент для соцсетей
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Готовые материалы для публикации в ваших социальных сетях
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.telegramLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
            >
              {post.imageUrl && (
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                    <span>M</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="p-5">
                <time className="text-xs text-gray-400 font-medium">
                  {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="text-lg font-bold text-navy-900 mt-2 mb-2 group-hover:text-gold-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>
                <span className="inline-flex items-center gap-1 text-sm text-red-500 font-medium mt-3 group-hover:text-red-600">
                  Открыть в Макс
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://max.ru/join/UKHn87I1ZjVei3Q5f0ZU3iebm-GjYJk9jKbHcskVMNA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <p className="font-semibold text-navy-900 group-hover:text-red-700 transition-colors">Макс.Канал</p>
              <p className="text-sm text-gray-500">Свежие посты и материалы</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </a>
          <a
            href="https://disk.yandex.ru/d/ozkSyJJs5rCZng/Для%20соц%20сетей"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            </div>
            <div>
              <p className="font-semibold text-navy-900 group-hover:text-yellow-700 transition-colors">Яндекс.Диск</p>
              <p className="text-sm text-gray-500">Картинки для соцсетей</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>

        <ContactBlock />
      </div>
    </section>
  );
}
