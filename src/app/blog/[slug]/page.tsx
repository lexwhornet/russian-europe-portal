import { db } from "@/db";
import { blogArticles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import ContactBlock from "@/components/ContactBlock";

export const dynamic = "force-dynamic";

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await db
    .select()
    .from(blogArticles)
    .where(eq(blogArticles.slug, slug))
    .then((r) => r[0]);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/#blog" className="inline-flex items-center gap-2 text-navy-300 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к блогу
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
          <time className="text-sm text-gray-400 font-medium">
            {new Date(article.createdAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mt-3 mb-8">
            {article.title}
          </h1>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
        <ContactBlock />
      </div>
    </div>
  );
}
