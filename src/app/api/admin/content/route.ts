import { db } from "@/db";
import { siteContent } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const all = await db.select().from(siteContent).orderBy(siteContent.sectionKey);
  return Response.json(all);
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  const existing = await db
    .select()
    .from(siteContent)
    .where(eq(siteContent.sectionKey, body.sectionKey))
    .then((r) => r[0]);

  if (existing) {
    const result = await db
      .update(siteContent)
      .set({
        title: body.title,
        content: body.content,
        updatedAt: new Date(),
      })
      .where(eq(siteContent.sectionKey, body.sectionKey))
      .returning();
    return Response.json(result[0]);
  } else {
    const result = await db
      .insert(siteContent)
      .values({
        sectionKey: body.sectionKey,
        title: body.title,
        content: body.content,
      })
      .returning();
    return Response.json(result[0]);
  }
}
