"use client";

import ContactBlock from "./ContactBlock";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  createdAt: string;
}

export default function BlogSection({ articles }: { articles: Article[] }) {
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">Блог</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Полезные материалы
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Статьи и советы для успешных продаж недвижимости
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <a
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-100 transition-colors">
                <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <time className="text-xs text-gray-400 font-medium">
                {new Date(article.createdAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <h3 className="text-lg font-bold text-navy-900 mt-2 mb-3 group-hover:text-gold-600 transition-colors">
                {article.title}
              </h3>
              {article.excerpt && (
                <p className="text-gray-600 text-sm line-clamp-3">{article.excerpt}</p>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 mt-4 group-hover:text-gold-700">
                Читать далее
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <ContactBlock />
      </div>
    </section>
  );
}
