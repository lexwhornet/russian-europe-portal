import { db } from "@/db";
import { blogArticles } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const all = await db.select().from(blogArticles).orderBy(desc(blogArticles.createdAt));
  return Response.json(all);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = await db
    .insert(blogArticles)
    .values({
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || null,
      imageUrl: body.imageUrl || null,
      published: body.published ?? true,
    })
    .returning();

  return Response.json(result[0]);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = await db
    .update(blogArticles)
    .set({
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || null,
      imageUrl: body.imageUrl || null,
      published: body.published ?? true,
      updatedAt: new Date(),
    })
    .where(eq(blogArticles.id, body.id))
    .returning();

  return Response.json(result[0]);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  await db.delete(blogArticles).where(eq(blogArticles.id, id));
  return Response.json({ success: true });
}
