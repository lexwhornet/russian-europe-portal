import { db } from "@/db";
import { posts } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return Response.json(allPosts);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = await db
    .insert(posts)
    .values({
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl || null,
      telegramLink: body.telegramLink || null,
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
    .update(posts)
    .set({
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl || null,
      telegramLink: body.telegramLink || null,
      published: body.published ?? true,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, body.id))
    .returning();

  return Response.json(result[0]);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  await db.delete(posts).where(eq(posts.id, id));
  return Response.json({ success: true });
}
