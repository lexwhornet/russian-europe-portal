import { db } from "@/db";
import { adminUsers, posts, siteContent, mediaLinks, blogArticles, presentations } from "@/db/schema";
import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

let seeded = false;

export async function seedDatabase() {
  if (seeded) return;

  try {
    // Ensure tables exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        telegram_link TEXT,
        published BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS presentations (
        id SERIAL PRIMARY KEY,
        project_slug TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        file_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blog_articles (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        image_url TEXT,
        published BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        section_key TEXT NOT NULL UNIQUE,
        title TEXT,
        content TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS media_links (
        id SERIAL PRIMARY KEY,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        thumbnail_url TEXT,
        sort_order INTEGER DEFAULT 0 NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    // Check if already seeded
    const result = await db.execute(sql`SELECT count(*) as cnt FROM admin_users`);
    const count = Number((result.rows[0] as { cnt: string }).cnt);
    if (count > 0) {
      seeded = true;
      return;
    }

    console.log("Seeding database...");

    const hash = await bcrypt.hash("RussEurope2024!", 10);
    await db.insert(adminUsers).values({ username: "admin", passwordHash: hash });

    await db.insert(posts).values([
      { title: "Семейная ипотека от 5,5%", content: "Семейная ипотека доступна для семей с одним ребёнком. Минимальный первоначальный взнос 20%, ставка от 5,5% на весь срок кредитования.", imageUrl: "/images/project-re.jpg", telegramLink: "https://max.ru/c/-76476343384803/AZ87eO_uTME", published: true },
      { title: "Ход строительства", content: "Актуальные фото и видео со строительных площадок наших жилых комплексов. Следите за прогрессом в реальном времени.", imageUrl: "/images/project-sloboda.png", telegramLink: "https://max.ru/c/-76476343384803/AZ82NA2vaV8", published: true },
      { title: "Акция на квартиры", content: "Специальные условия на покупку квартир в наших проектах. Успейте забронировать лучшие варианты по выгодной цене.", imageUrl: "/images/re-1.jpg", telegramLink: "https://max.ru/c/-76476343384803/AZ8iycHXPWo", published: true },
    ]);

    await db.insert(siteContent).values([
      {
        sectionKey: "buying_conditions",
        title: "Условия покупки для клиентов",
        content: '<h3>Ипотека</h3><p>Ипотека от всех ведущих банков-партнёров. Эксклюзивное предложение: ипотека от банка ДОМ.РФ под ставку от 12%.</p><h3>Семейная и IT ипотеки</h3><p>Специальные ставки от банка ДОМ.РФ: семейная ипотека и IT-ипотека под 3.5% годовых.</p><h3>Рассрочка</h3><p>Беспроцентная рассрочка на весь срок строительства. Первоначальный взнос — от 20%.</p><h3>Материнский капитал</h3><p>Принимаем материнский капитал в качестве первоначального взноса или частичной оплаты.</p><h3>100% оплата</h3><p>При полной оплате предоставляется скидка до 5% от стоимости квартиры.</p>',
      },
      {
        sectionKey: "partner_conditions",
        title: "Условия для партнёров",
        content: '<h3>Преимущества партнёрства</h3><ul><li>Быстрая фиксация клиентов через бота</li><li>Персональный менеджер для каждого партнёра</li><li>Обучающие материалы и презентации</li><li>Регулярные обновления по наличию квартир</li><li>Приоритетное бронирование для партнёров</li><li>Совместные рекламные акции</li></ul>',
      },
    ]);

    await db.insert(mediaLinks).values([
      { category: "photo", title: "Фото ЖК «Русская Слобода» (Ярославль)", url: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Фото%20проектов/Русская%20слобода%20(Ярославль)", sortOrder: 1 },
      { category: "photo", title: "Фото ЖК «Русская Европа» (Калининград)", url: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Фото%20проектов/Русская%20Европа%20(Калининград)", sortOrder: 2 },
      { category: "photo", title: "Фото ЖК «Золотое Сечение»", url: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Фото%20проектов", sortOrder: 3 },
      { category: "video", title: "Видео ЖК «Русская Слобода»", url: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Видео/Русская%20слобода", sortOrder: 1 },
      { category: "video", title: "Видео ЖК «Русская Европа»", url: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Видео/Русская%20Европа", sortOrder: 2 },
      { category: "video", title: "Видео ЖК «Золотое Сечение»", url: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Видео/Золотое%20Сечение", sortOrder: 3 },
    ]);

    await db.insert(blogArticles).values({
      title: "Как эффективно продавать новостройки",
      slug: "how-to-sell",
      content: "<p>Рынок новостроек постоянно меняется. В этой статье — ключевые стратегии продаж.</p>",
      excerpt: "Ключевые стратегии продаж новостроек для риэлторов",
      published: true,
    });

    await db.insert(presentations).values([
      { projectSlug: "sloboda", title: "Презентация ЖК «Русская Слобода»", description: "Полная презентация проекта", fileUrl: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Презентации" },
      { projectSlug: "re", title: "Презентация ЖК «Русская Европа»", description: "Полная презентация проекта", fileUrl: "https://disk.yandex.ru/d/ozkSyJJs5rCZng/Презентации" },
    ]);

    seeded = true;
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seed error:", error);
  }
}
