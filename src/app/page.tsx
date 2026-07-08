import { db } from "@/db";
import { posts, presentations, blogArticles, siteContent, mediaLinks } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { seedDatabase } from "@/lib/seed";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentSection from "@/components/ContentSection";
import SocialsSection from "@/components/SocialsSection";
import ProjectsSection from "@/components/ProjectsSection";
import MediaSection from "@/components/MediaSection";
import BuyingSection from "@/components/BuyingSection";
import PartnersSection from "@/components/PartnersSection";
import BlogSection from "@/components/BlogSection";
import ChessSection from "@/components/ChessSection";
import Footer from "@/components/Footer";

export const revalidate = 60; // ISR cache for 60 seconds to make page loads lightning fast and instant

const globalForCache = globalThis as unknown as {
  __homeDataCache?: { data: any; ts: number };
};

type HomeDataTuple = [
  ({ id: number; title: string; content: string; imageUrl: string | null; telegramLink: string | null; published: boolean; createdAt: Date; updatedAt: Date })[],
  ({ id: number; projectSlug: string; title: string; description: string | null; fileUrl: string; createdAt: Date })[],
  ({ id: number; title: string; slug: string; content: string; excerpt: string | null; imageUrl: string | null; published: boolean; createdAt: Date; updatedAt: Date })[],
  { id: number; sectionKey: string; title: string | null; content: string; updatedAt: Date } | null,
  { id: number; sectionKey: string; title: string | null; content: string; updatedAt: Date } | null,
  ({ id: number; category: string; title: string; url: string; thumbnailUrl: string | null; sortOrder: number; createdAt: Date })[]
];

async function getCachedHomeData(): Promise<HomeDataTuple> {
  const now = Date.now();
  // Keep memory cache for 5 minutes (300_000 ms) inside Cloudflare Worker Isolate
  if (globalForCache.__homeDataCache && now - globalForCache.__homeDataCache.ts < 300000) {
    return globalForCache.__homeDataCache.data;
  }

  const result = await Promise.all([
    db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt)),
    db.select().from(presentations).orderBy(presentations.projectSlug),
    db
      .select()
      .from(blogArticles)
      .where(eq(blogArticles.published, true))
      .orderBy(desc(blogArticles.createdAt)),
    db
      .select()
      .from(siteContent)
      .where(eq(siteContent.sectionKey, "buying_conditions"))
      .then((r) => r[0] || null),
    db
      .select()
      .from(siteContent)
      .where(eq(siteContent.sectionKey, "partner_conditions"))
      .then((r) => r[0] || null),
    db.select().from(mediaLinks).orderBy(mediaLinks.sortOrder),
  ]);

  globalForCache.__homeDataCache = { data: result, ts: now };
  return result;
}

export default async function HomePage() {
  const [allPosts, allPresentations, allArticles, buyingContent, partnerContent, allMediaLinks] =
    await getCachedHomeData();

  const serializePosts = allPosts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const serializePresentations = allPresentations.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  const serializeArticles = allArticles.map((a) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  const serializeMediaLinks = allMediaLinks.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
  }));

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ContentSection posts={serializePosts} />
        <SocialsSection />
        <ProjectsSection presentations={serializePresentations} />
        <MediaSection mediaLinks={serializeMediaLinks} />
        <BuyingSection
          data={
            buyingContent
              ? { title: buyingContent.title, content: buyingContent.content }
              : null
          }
        />
        <PartnersSection
          data={
            partnerContent
              ? { title: partnerContent.title, content: partnerContent.content }
              : null
          }
        />
        <BlogSection articles={serializeArticles} />
        <ChessSection />
      </main>
      <Footer />
    </>
  );
}
