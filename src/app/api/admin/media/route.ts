import { db } from "@/db";
import { mediaLinks } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const all = await db.select().from(mediaLinks).orderBy(mediaLinks.sortOrder);
  return Response.json(all);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = await db
    .insert(mediaLinks)
    .values({
      category: body.category,
      title: body.title,
      url: body.url,
      thumbnailUrl: body.thumbnailUrl || null,
      sortOrder: body.sortOrder ?? 0,
    })
    .returning();

  return Response.json(result[0]);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = await db
    .update(mediaLinks)
    .set({
      category: body.category,
      title: body.title,
      url: body.url,
      thumbnailUrl: body.thumbnailUrl || null,
      sortOrder: body.sortOrder ?? 0,
    })
    .where(eq(mediaLinks.id, body.id))
    .returning();

  return Response.json(result[0]);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  await db.delete(mediaLinks).where(eq(mediaLinks.id, id));
  return Response.json({ success: true });
}
