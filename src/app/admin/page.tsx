"use client";

import { useState, useEffect, useCallback } from "react";

type Tab = "posts" | "presentations" | "blog" | "content" | "media";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  telegramLink: string | null;
  published: boolean;
}

interface Presentation {
  id: number;
  projectSlug: string;
  title: string;
  description: string | null;
  fileUrl: string;
}

interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  published: boolean;
}

interface ContentSection {
  id: number;
  sectionKey: string;
  title: string | null;
  content: string;
}

interface MediaLink {
  id: number;
  category: string;
  title: string;
  url: string;
  thumbnailUrl: string | null;
  sortOrder: number;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("posts");

  // Data states
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [presentationsData, setPresentationsData] = useState<Presentation[]>([]);
  const [blogData, setBlogData] = useState<BlogArticle[]>([]);
  const [contentData, setContentData] = useState<ContentSection[]>([]);
  const [mediaData, setMediaData] = useState<MediaLink[]>([]);

  // Edit modals
  const [editPost, setEditPost] = useState<Partial<Post> | null>(null);
  const [editPresentation, setEditPresentation] = useState<Partial<Presentation> | null>(null);
  const [editBlog, setEditBlog] = useState<Partial<BlogArticle> | null>(null);
  const [editContent, setEditContent] = useState<Partial<ContentSection> | null>(null);
  const [editMedia, setEditMedia] = useState<Partial<MediaLink> | null>(null);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => {
        if (r.ok) setAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const loadData = useCallback(async (tab: Tab) => {
    const endpoints: Record<Tab, string> = {
      posts: "/api/admin/posts",
      presentations: "/api/admin/presentations",
      blog: "/api/admin/blog",
      content: "/api/admin/content",
      media: "/api/admin/media",
    };
    const res = await fetch(endpoints[tab]);
    if (res.ok) {
      const data = await res.json();
      switch (tab) {
        case "posts": setPostsData(data); break;
        case "presentations": setPresentationsData(data); break;
        case "blog": setBlogData(data); break;
        case "content": setContentData(data); break;
        case "media": setMediaData(data); break;
      }
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadData(activeTab);
  }, [authenticated, activeTab, loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setAuthenticated(true);
    } else {
      const data = await res.json();
      setLoginError(data.error || "Ошибка авторизации");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
  };

  // CRUD helpers
  const savePost = async () => {
    if (!editPost) return;
    const method = editPost.id ? "PUT" : "POST";
    await fetch("/api/admin/posts", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editPost),
    });
    setEditPost(null);
    loadData("posts");
  };

  const deletePost = async (id: number) => {
    if (!confirm("Удалить пост?")) return;
    await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE" });
    loadData("posts");
  };

  const savePresentation = async () => {
    if (!editPresentation) return;
    const method = editPresentation.id ? "PUT" : "POST";
    await fetch("/api/admin/presentations", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editPresentation),
    });
    setEditPresentation(null);
    loadData("presentations");
  };

  const deletePresentation = async (id: number) => {
    if (!confirm("Удалить презентацию?")) return;
    await fetch(`/api/admin/presentations?id=${id}`, { method: "DELETE" });
    loadData("presentations");
  };

  const saveBlog = async () => {
    if (!editBlog) return;
    const method = editBlog.id ? "PUT" : "POST";
    await fetch("/api/admin/blog", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editBlog),
    });
    setEditBlog(null);
    loadData("blog");
  };

  const deleteBlog = async (id: number) => {
    if (!confirm("Удалить статью?")) return;
    await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    loadData("blog");
  };

  const saveContent = async () => {
    if (!editContent) return;
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editContent),
    });
    setEditContent(null);
    loadData("content");
  };

  const saveMedia = async () => {
    if (!editMedia) return;
    const method = editMedia.id ? "PUT" : "POST";
    await fetch("/api/admin/media", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editMedia),
    });
    setEditMedia(null);
    loadData("media");
  };

  const deleteMedia = async (id: number) => {
    if (!confirm("Удалить ссылку?")) return;
    await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    loadData("media");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-950 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-navy-900 text-gold-400 rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              РЕ
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Админ-панель</h1>
            <p className="text-gray-500 text-sm mt-1">Партнёрский портал «Русская Европа»</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Логин</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-navy-500 focus:border-navy-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "posts", label: "Посты", icon: "📝" },
    { key: "presentations", label: "Презентации", icon: "📊" },
    { key: "blog", label: "Блог", icon: "📰" },
    { key: "content", label: "Тексты", icon: "📄" },
    { key: "media", label: "Медиа", icon: "🖼" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-900 text-gold-400 rounded-xl flex items-center justify-center font-bold">
              РЕ
            </div>
            <div>
              <h1 className="font-bold text-navy-900">Админ-панель</h1>
              <p className="text-xs text-gray-500">Русская Европа</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-navy-600 hover:text-navy-900 transition-colors">← На сайт</a>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.key
                  ? "bg-navy-900 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts tab */}
        {activeTab === "posts" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">Посты для соцсетей</h2>
              <button
                onClick={() => setEditPost({ title: "", content: "", imageUrl: "", telegramLink: "", published: true })}
                className="bg-navy-900 hover:bg-navy-800 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors"
              >
                + Добавить пост
              </button>
            </div>
            <div className="space-y-3">
              {postsData.map((post) => (
                <div key={post.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 truncate">{post.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{post.content}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {post.published ? "Опубл." : "Черновик"}
                  </span>
                  <button onClick={() => setEditPost(post)} className="text-sm text-navy-600 hover:text-navy-900">Ред.</button>
                  <button onClick={() => deletePost(post.id)} className="text-sm text-red-500 hover:text-red-700">Удалить</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Presentations tab */}
        {activeTab === "presentations" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">Презентации</h2>
              <button
                onClick={() => setEditPresentation({ projectSlug: "sloboda", title: "", description: "", fileUrl: "" })}
                className="bg-navy-900 hover:bg-navy-800 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors"
              >
                + Добавить
              </button>
            </div>
            <div className="space-y-3">
              {presentationsData.map((pres) => (
                <div key={pres.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 truncate">{pres.title}</h3>
                    <p className="text-sm text-gray-500">{pres.projectSlug} — {pres.fileUrl}</p>
                  </div>
                  <button onClick={() => setEditPresentation(pres)} className="text-sm text-navy-600 hover:text-navy-900">Ред.</button>
                  <button onClick={() => deletePresentation(pres.id)} className="text-sm text-red-500 hover:text-red-700">Удалить</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog tab */}
        {activeTab === "blog" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">Блог</h2>
              <button
                onClick={() => setEditBlog({ title: "", slug: "", content: "", excerpt: "", imageUrl: "", published: true })}
                className="bg-navy-900 hover:bg-navy-800 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors"
              >
                + Добавить статью
              </button>
            </div>
            <div className="space-y-3">
              {blogData.map((article) => (
                <div key={article.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 truncate">{article.title}</h3>
                    <p className="text-sm text-gray-500">/{article.slug}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${article.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {article.published ? "Опубл." : "Черновик"}
                  </span>
                  <button onClick={() => setEditBlog(article)} className="text-sm text-navy-600 hover:text-navy-900">Ред.</button>
                  <button onClick={() => deleteBlog(article.id)} className="text-sm text-red-500 hover:text-red-700">Удалить</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content tab */}
        {activeTab === "content" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">Тексты разделов</h2>
            </div>
            <div className="space-y-3">
              {contentData.map((section) => (
                <div key={section.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900">{section.title || section.sectionKey}</h3>
                    <p className="text-sm text-gray-500">Ключ: {section.sectionKey}</p>
                  </div>
                  <button onClick={() => setEditContent(section)} className="text-sm text-navy-600 hover:text-navy-900">Редактировать</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media tab */}
        {activeTab === "media" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-navy-900">Медиа-ссылки</h2>
              <button
                onClick={() => setEditMedia({ category: "photo", title: "", url: "", thumbnailUrl: "", sortOrder: 0 })}
                className="bg-navy-900 hover:bg-navy-800 text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors"
              >
                + Добавить
              </button>
            </div>
            <div className="space-y-3">
              {mediaData.map((link) => (
                <div key={link.id} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-4">
                  <span className="text-lg">{link.category === "photo" ? "🖼" : "🎬"}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy-900 truncate">{link.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{link.url}</p>
                  </div>
                  <button onClick={() => setEditMedia(link)} className="text-sm text-navy-600 hover:text-navy-900">Ред.</button>
                  <button onClick={() => deleteMedia(link.id)} className="text-sm text-red-500 hover:text-red-700">Удалить</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Post Modal */}
      {editPost !== null && (
        <Modal title={editPost.id ? "Редактировать пост" : "Новый пост"} onClose={() => setEditPost(null)} onSave={savePost}>
          <FormField label="Заголовок">
            <input type="text" value={editPost.title || ""} onChange={(e) => setEditPost({ ...editPost, title: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Содержание">
            <textarea rows={4} value={editPost.content || ""} onChange={(e) => setEditPost({ ...editPost, content: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="URL картинки">
            <input type="text" value={editPost.imageUrl || ""} onChange={(e) => setEditPost({ ...editPost, imageUrl: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Ссылка на Telegram">
            <input type="text" value={editPost.telegramLink || ""} onChange={(e) => setEditPost({ ...editPost, telegramLink: e.target.value })} className="form-input" />
          </FormField>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={editPost.published ?? true} onChange={(e) => setEditPost({ ...editPost, published: e.target.checked })} className="rounded border-gray-300" />
            Опубликовано
          </label>
        </Modal>
      )}

      {/* Edit Presentation Modal */}
      {editPresentation !== null && (
        <Modal title={editPresentation.id ? "Редактировать презентацию" : "Новая презентация"} onClose={() => setEditPresentation(null)} onSave={savePresentation}>
          <FormField label="Проект">
            <select value={editPresentation.projectSlug || "sloboda"} onChange={(e) => setEditPresentation({ ...editPresentation, projectSlug: e.target.value })} className="form-input">
              <option value="sloboda">Русская Слобода</option>
              <option value="zolotoe">Золотое Сечение</option>
              <option value="re">Русская Европа</option>
            </select>
          </FormField>
          <FormField label="Название">
            <input type="text" value={editPresentation.title || ""} onChange={(e) => setEditPresentation({ ...editPresentation, title: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Описание">
            <input type="text" value={editPresentation.description || ""} onChange={(e) => setEditPresentation({ ...editPresentation, description: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="URL файла">
            <input type="text" value={editPresentation.fileUrl || ""} onChange={(e) => setEditPresentation({ ...editPresentation, fileUrl: e.target.value })} className="form-input" />
          </FormField>
        </Modal>
      )}

      {/* Edit Blog Modal */}
      {editBlog !== null && (
        <Modal title={editBlog.id ? "Редактировать статью" : "Новая статья"} onClose={() => setEditBlog(null)} onSave={saveBlog}>
          <FormField label="Заголовок">
            <input type="text" value={editBlog.title || ""} onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Slug (URL)">
            <input type="text" value={editBlog.slug || ""} onChange={(e) => setEditBlog({ ...editBlog, slug: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Краткое описание">
            <input type="text" value={editBlog.excerpt || ""} onChange={(e) => setEditBlog({ ...editBlog, excerpt: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Содержание (HTML)">
            <textarea rows={8} value={editBlog.content || ""} onChange={(e) => setEditBlog({ ...editBlog, content: e.target.value })} className="form-input font-mono text-sm" />
          </FormField>
          <FormField label="URL картинки">
            <input type="text" value={editBlog.imageUrl || ""} onChange={(e) => setEditBlog({ ...editBlog, imageUrl: e.target.value })} className="form-input" />
          </FormField>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={editBlog.published ?? true} onChange={(e) => setEditBlog({ ...editBlog, published: e.target.checked })} className="rounded border-gray-300" />
            Опубликовано
          </label>
        </Modal>
      )}

      {/* Edit Content Modal */}
      {editContent !== null && (
        <Modal title="Редактировать текст" onClose={() => setEditContent(null)} onSave={saveContent}>
          <FormField label="Ключ раздела">
            <input type="text" value={editContent.sectionKey || ""} readOnly className="form-input bg-gray-50" />
          </FormField>
          <FormField label="Заголовок">
            <input type="text" value={editContent.title || ""} onChange={(e) => setEditContent({ ...editContent, title: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Содержание (HTML)">
            <textarea rows={12} value={editContent.content || ""} onChange={(e) => setEditContent({ ...editContent, content: e.target.value })} className="form-input font-mono text-sm" />
          </FormField>
        </Modal>
      )}

      {/* Edit Media Modal */}
      {editMedia !== null && (
        <Modal title={editMedia.id ? "Редактировать ссылку" : "Новая ссылка"} onClose={() => setEditMedia(null)} onSave={saveMedia}>
          <FormField label="Категория">
            <select value={editMedia.category || "photo"} onChange={(e) => setEditMedia({ ...editMedia, category: e.target.value })} className="form-input">
              <option value="photo">Фото</option>
              <option value="video">Видео</option>
            </select>
          </FormField>
          <FormField label="Название">
            <input type="text" value={editMedia.title || ""} onChange={(e) => setEditMedia({ ...editMedia, title: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="URL">
            <input type="text" value={editMedia.url || ""} onChange={(e) => setEditMedia({ ...editMedia, url: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="URL превью">
            <input type="text" value={editMedia.thumbnailUrl || ""} onChange={(e) => setEditMedia({ ...editMedia, thumbnailUrl: e.target.value })} className="form-input" />
          </FormField>
          <FormField label="Порядок сортировки">
            <input type="number" value={editMedia.sortOrder ?? 0} onChange={(e) => setEditMedia({ ...editMedia, sortOrder: Number(e.target.value) })} className="form-input" />
          </FormField>
        </Modal>
      )}
    </div>
  );
}

function Modal({
  title,
  onClose,
  onSave,
  children,
}: {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-bold text-navy-900">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          {children}
        </div>
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-sm">
            Отмена
          </button>
          <button onClick={onSave} className="px-6 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl font-medium text-sm transition-colors">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
