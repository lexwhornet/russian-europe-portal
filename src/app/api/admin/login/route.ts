import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return Response.json({ error: "Заполните все поля" }, { status: 400 });
    }

    const user = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username))
      .then((r) => r[0]);

    if (!user) {
      return Response.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return Response.json({ error: "Неверный логин или пароль" }, { status: 401 });
    }

    const token = await createToken(user.id, user.username);
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
