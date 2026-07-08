"use client";

import { useState } from "react";
import ContactBlock from "./ContactBlock";

interface SectionContent {
  title: string | null;
  content: string;
}

export default function PartnersSection({ data }: { data: SectionContent | null }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  const workflowSteps = [
    {
      step: "01",
      title: "Регистрация",
      desc: "Выберите способ подключения",
      icon: "📋",
      key: "registration",
    },
    {
      step: "02",
      title: "Фиксация клиента",
      desc: "Бессрочная фиксация",
      icon: "📌",
      key: "clientFix",
    },
    {
      step: "03",
      title: "Показ объекта",
      desc: "Реальные проекты",
      icon: "🏠",
      key: "showObject",
    },
    {
      step: "04",
      title: "Бронирование",
      desc: "Онлайн-шахматка",
      icon: "📝",
      key: "booking",
    },
    {
      step: "05",
      title: "Сделка",
      desc: "Полное сопровождение",
      icon: "✅",
      key: "deal",
    },
    {
      step: "06",
      title: "Выплата",
      desc: "Комиссия до 5%",
      icon: "💰",
      key: "payout",
    },
  ];

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">Партнёрам</span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            {data?.title || "Условия для партнёров"}
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Прозрачные условия сотрудничества и поддержка на каждом этапе
          </p>
        </div>

        {/* Workflow steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {workflowSteps.map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveModal(item.key)}
              className="relative p-6 bg-gradient-to-br from-navy-50 to-white rounded-2xl border border-navy-100 hover:shadow-xl transition-all group cursor-pointer text-left"
            >
              <span className="absolute top-4 right-4 text-4xl font-bold text-navy-100 group-hover:text-gold-200 transition-colors">
                {item.step}
              </span>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h4 className="text-lg font-bold text-navy-900 mb-1">{item.title}</h4>
              <p className="text-sm text-navy-600">{item.desc}</p>
              <span className="inline-block mt-3 text-xs text-gold-600 font-semibold">
                Нажмите для подробностей →
              </span>
            </button>
          ))}
        </div>

        <ContactBlock prominent />
      </div>

      {/* Registration Modal */}
      {activeModal === "registration" && (
        <Modal title="Регистрация партнёра" onClose={closeModal}>
          <p className="text-navy-700 mb-6">Выберите удобный способ регистрации:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://t.me/re_partners_bot?start=personal_36"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.912.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.121.1.154.232.17.325.015.094.034.31.019.478z"/></svg>
              </div>
              <div>
                <div className="font-bold text-navy-900">Telegram-бот</div>
                <div className="text-sm text-gray-500">Регистрация через Telegram</div>
              </div>
            </a>
            <a
              href="https://max.ru/id3906957034_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <span className="text-xl">M</span>
              </div>
              <div>
                <div className="font-bold text-navy-900">Макс-бот</div>
                <div className="text-sm text-gray-500">Регистрация через Max.ru</div>
              </div>
            </a>
          </div>
        </Modal>
      )}

      {/* Client Fix Modal */}
      {activeModal === "clientFix" && (
        <Modal title="Фиксация клиента" onClose={closeModal}>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl">👤</div>
              <div>
                <h4 className="font-bold text-navy-900">Личный менеджер отдела продаж</h4>
                <p className="text-sm text-navy-600">Персональный менеджер поможет на любой стадии сделки без снижения комиссии</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="text-2xl">💬</div>
              <div>
                <h4 className="font-bold text-navy-900">Удобный чат-бот</h4>
                <p className="text-sm text-navy-600">Быстрые ответы и обновления статуса клиента 24/7</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl">⏳</div>
              <div>
                <h4 className="font-bold text-navy-900">Бессрочная фиксация клиента</h4>
                <p className="text-sm text-navy-600">Клиент остаётся закреплён за вами без ограничений по времени</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
              <div className="text-2xl">📊</div>
              <div>
                <h4 className="font-bold text-navy-900">Прозрачность воронки</h4>
                <p className="text-sm text-navy-600">Помощь на каждом этапе сделки с полной прозрачностью статуса</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Show Object Modal */}
      {activeModal === "showObject" && (
        <Modal title="Показ объекта" onClose={closeModal}>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <img src="/images/project-sloboda.png" alt="Русская Слобода" className="w-full h-20 object-cover rounded-lg" />
            <img src="/images/project-re.jpg" alt="Русская Европа" className="w-full h-20 object-cover rounded-lg" />
            <img src="/images/re-1.jpg" alt="Проект" className="w-full h-20 object-cover rounded-lg" />
            <img src="/images/sloboda-1.png" alt="Слобода" className="w-full h-20 object-cover rounded-lg" />
            <img src="/images/re-2.jpg" alt="RE" className="w-full h-20 object-cover rounded-lg" />
            <img src="/images/sloboda-2.png" alt="Слобода 2" className="w-full h-20 object-cover rounded-lg" />
          </div>
          <p className="text-navy-700">
            Организуем показы на объектах. Менеджер подберёт квартиру под запрос клиента и согласует удобное время.
          </p>
        </Modal>
      )}

      {/* Booking Modal */}
      {activeModal === "booking" && (
        <Modal title="Бронирование" onClose={closeModal}>
          <p className="text-navy-700 mb-6">
            Проверьте наличие и забронируйте квартиру в интерактивной шахматке:
          </p>
          <a
            href="https://re-shahmatka.ru/?project=all-3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gold-500 hover:bg-gold-600 text-navy-950 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Открыть шахматку
          </a>
        </Modal>
      )}

      {/* Deal Modal */}
      {activeModal === "deal" && (
        <Modal title="Сделка" onClose={closeModal}>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-navy-900 mb-2">Помощь отдела продаж</h4>
              <p className="text-sm text-navy-600">Полный сервис: юридическое сопровождение, подготовка документов, контроль на каждом этапе.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h4 className="font-bold text-navy-900 mb-2">Ипотечный брокер от банка ДОМ.РФ</h4>
              <p className="text-sm text-navy-600">Эксклюзивные ставки и условия, помощь в оформлении ипотечного кредита.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <h4 className="font-bold text-navy-900 mb-2">Безопасность сделок</h4>
              <p className="text-sm text-navy-600">Расчёты через эскроу-счета с гарантией сохранения средств.</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Payout Modal */}
      {activeModal === "payout" && (
        <Modal title="Выплата комиссии" onClose={closeModal}>
          <div className="space-y-4">
            <div className="p-4 bg-gold-50 rounded-xl border border-gold-200">
              <h4 className="font-bold text-navy-900 mb-3">Размеры комиссии</h4>
              <ul className="space-y-2 text-navy-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">5%</span>
                  <span>комиссия на первую сделку с клиентом</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">4%</span>
                  <span>комиссия на последующие сделки</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 font-bold">до 3%</span>
                  <span>комиссия за неуникального клиента</span>
                </li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <h4 className="font-bold text-navy-900 mb-2">🎯 Бонусная система</h4>
              <p className="text-sm text-navy-600">
                <strong>5% комиссия сохраняется</strong> при закрытии свыше 3 сделок в месяц.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-bold text-navy-900 text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
