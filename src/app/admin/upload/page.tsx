"use client";

import { useState } from "react";
import Link from "next/link";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (formData: FormData) => {
    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.url);
      } else {
        setError(data.error || "Ошибка загрузки");
      }
    } catch (err) {
      setError("Ошибка сети");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    handleUpload(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin" className="text-navy-600 hover:text-navy-900 text-sm">
            ← Вернуться в админ-панель
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
          <h1 className="text-2xl font-bold text-navy-900 mb-6">Загрузка файлов</h1>
          <p className="text-navy-600 mb-8">
            Загрузите фото, видео или презентации для публикации на портале
          </p>

          <form onSubmit={(e) => {
            e.preventDefault();
          }} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Выберите файл</label>
              <input
                type="file"
                required
                accept="image/*,video/*,.pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 file:cursor-pointer file:rounded-xl file:border-0 file:bg-gold-500 file:text-white file:px-4 file:py-2 file:font-medium file:hover:file:bg-gold-600 cursor-pointer"
              />
            </div>

            {uploading && (
              <div className="text-center py-4">
                <div className="animate-spin w-8 h-8 border-4 border-navy-900 border-t-transparent rounded-full mx-auto" />
                <p className="text-navy-600 mt-2">Загружаем файл...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            {result && (
              <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100">
                <h4 className="font-medium mb-2">Файл загружен!</h4>
                <p className="text-sm break-all">
                  <a 
                    href={result} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-navy-600 hover:text-navy-800"
                  >
                    {result}
                  </a>
                </p>
                <p className="text-xs mt-2">
                  Скопируйте эту ссылку для использования в админ-панели
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export async function GET() {
  return null;
}