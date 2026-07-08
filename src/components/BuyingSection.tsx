"use client";

import ContactBlock from "./ContactBlock";

interface SectionContent {
  title: string | null;
  content: string;
}

export default function BuyingSection({ data }: { data: SectionContent | null }) {
  return (
    <section id="buying" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">Для клиентов</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {data?.title || "Условия покупки для клиентов"}
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Все доступные способы покупки квартиры в наших проектах
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data?.content || "<p>Информация обновляется...</p>" }}
          />
        </div>

        <ContactBlock />
      </div>
    </section>
  );
}
