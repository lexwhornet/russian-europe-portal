"use client";

import { useState } from "react";
import ContactBlock from "./ContactBlock";

interface Presentation {
  id: number;
  title: string;
  description: string | null;
  fileUrl: string;
}

interface Project {
  slug: string;
  name: string;
  subtitle: string;
  images: string[];
  description: string;
  features: string[];
  presentations: Presentation[];
}

const projects: Project[] = [
  {
    slug: "sloboda",
    name: "Русская Слобода",
    subtitle: "Ярославль",
    images: [
      "/images/project-sloboda.png",
      "/images/sloboda-1.png",
      "/images/sloboda-2.png",
      "/images/sloboda-3.png",
      "/images/sloboda-4.png",
    ],
    description:
      "Жилой комплекс «Русская Слобода» — это современный микрорайон с продуманной инфраструктурой и уютными дворами. Европейская архитектура, зелёные зоны отдыха, детские площадки и всё необходимое для комфортной жизни.",
    features: [
      "Малоэтажная застройка",
      "Закрытые дворы без машин",
      "Собственная инфраструктура",
      "Детские площадки и зоны отдыха",
      "Подземный паркинг",
      "Кладовые помещения",
    ],
    presentations: [],
  },
  {
    slug: "re",
    name: "Русская Европа",
    subtitle: "Калининград",
    images: [
      "/images/project-re.jpg",
      "/images/re-1.jpg",
      "/images/re-2.jpg",
      "/images/re-3.jpg",
      "/images/re-4.jpg",
    ],
    description:
      "ЖК «Русская Европа» — флагманский проект компании в самом европейском городе России. Сочетание немецкой архитектурной традиции и современных технологий строительства. Идеальное расположение в Калининграде.",
    features: [
      "Расположение в центре Калининграда",
      "Европейская архитектура",
      "Энергоэффективные технологии",
      "Умный дом",
      "Развитая инфраструктура",
      "Видеонаблюдение территории",
    ],
    presentations: [],
  },
];

function ImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchStart(null);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={images[current]}
        alt={`${name} - фото ${current + 1}`}
        className="w-full aspect-[4/3] object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent pointer-events-none" />

      {/* Navigation arrows — always visible */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Counter badge */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === current ? "bg-white w-7" : "bg-white/50 hover:bg-white/80 w-2.5"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-12 left-6">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
      </div>
    </div>
  );
}

export default function ProjectsSection({
  presentations,
}: {
  presentations: Presentation[];
}) {
  const [modalPdf, setModalPdf] = useState<string | null>(null);

  const projectsWithPresentations = projects.map((p) => ({
    ...p,
    presentations: presentations.filter((pr) => pr.fileUrl.includes(p.slug)),
  }));

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Наши проекты
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Информация о проектах
          </h2>
          <p className="text-navy-600 max-w-2xl mx-auto">
            Подробная информация о каждом жилом комплексе для успешных продаж
          </p>
        </div>

        <div className="space-y-16">
          {projectsWithPresentations.map((project, idx) => (
            <div
              key={project.slug}
              className={`flex flex-col ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-8 lg:gap-12 items-center`}
            >
              {/* Image Carousel */}
              <div className="w-full lg:w-1/2">
                <ImageCarousel images={project.images} name={project.name} />
                {project.subtitle && (
                  <p className="text-gold-600 font-medium mt-2 text-center lg:text-left">
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Info */}
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4 lg:hidden">
                  {project.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-gold-500 mt-0.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-navy-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Link to presentations folder */}
                <a
                  href="https://disk.yandex.ru/d/ozkSyJJs5rCZng/Презентации"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-950 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Скачать презентации
                </a>
              </div>
            </div>
          ))}
        </div>

        <ContactBlock />
      </div>

      {/* PDF Modal */}
      {modalPdf && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setModalPdf(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-navy-900">Презентация</h3>
              <div className="flex items-center gap-2">
                <a
                  href={modalPdf}
                  download
                  className="text-sm bg-gold-500 hover:bg-gold-600 text-navy-950 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Скачать
                </a>
                <button
                  onClick={() => setModalPdf(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={modalPdf}
                className="w-full h-full rounded-lg border border-gray-200"
                title="Presentation"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
