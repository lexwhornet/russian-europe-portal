import { db } from "@/db";
import { presentations } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const all = await db.select().from(presentations).orderBy(presentations.projectSlug);
  return Response.json(all);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = await db
    .insert(presentations)
    .values({
      projectSlug: body.projectSlug,
      title: body.title,
      description: body.description || null,
      fileUrl: body.fileUrl,
    })
    .returning();

  return Response.json(result[0]);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const result = await db
    .update(presentations)
    .set({
      projectSlug: body.projectSlug,
      title: body.title,
      description: body.description || null,
      fileUrl: body.fileUrl,
    })
    .where(eq(presentations.id, body.id))
    .returning();

  return Response.json(result[0]);
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  await db.delete(presentations).where(eq(presentations.id, id));
  return Response.json({ success: true });
}
