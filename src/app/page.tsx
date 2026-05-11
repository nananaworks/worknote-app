'use client';

import { useState } from 'react';
import type { PortfolioFormData, GeneratedContent, HistoryEntry } from '@/types';
import { generateContent } from '@/lib/generator';
import InputForm from '@/components/InputForm';
import GeneratedResult from '@/components/GeneratedResult';
import HistoryPanel from '@/components/HistoryPanel';

const STORAGE_KEY = 'worknote_history';
const MAX_HISTORY = 20;

const INITIAL_FORM: PortfolioFormData = {
  workType: 'チラシ',
  productionType: '依頼を受けて制作',
  memo: '',
  imageName: '',
};

function loadHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export default function Home() {
  const [formData, setFormData] = useState<PortfolioFormData>(INITIAL_FORM);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const [showHistory, setShowHistory] = useState(false);

  const handleGenerate = () => {
    const content = generateContent(formData);
    setGeneratedContent(content);

    const entry: HistoryEntry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      formData: { ...formData },
      generatedContent: content,
    };

    const next = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleSelectHistory = (entry: HistoryEntry) => {
    setFormData(entry.formData);
    setGeneratedContent(entry.generatedContent);
    setShowHistory(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHistory = (id: string) => {
    const next = history.filter((e) => e.id !== id);
    setHistory(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#1e3a5f] text-white sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold tracking-tight">
              WorkNote Portfolio Writer
            </h1>
            <p className="text-xs text-blue-200 mt-0.5 hidden sm:block">
              ランサーズ・クラウドワークス向けポートフォリオ文章生成ツール
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowHistory((v) => !v)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>生成履歴</span>
            {history.length > 0 && (
              <span
                suppressHydrationWarning
                className="bg-blue-400 text-white text-xs px-1.5 py-0.5 rounded-full leading-none"
              >
                {history.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Usage hint */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
          <svg
            className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-blue-700 leading-relaxed">
            制作物タイプ・制作区分を選択し、制作した画像をアップロードして「生成する」を押すと、ランサーズ・クラウドワークスに貼り付けられるポートフォリオ文章が自動で生成されます。
          </p>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <InputForm
            formData={formData}
            onChange={setFormData}
            onGenerate={handleGenerate}
          />
          <GeneratedResult content={generatedContent} />
        </div>

        {/* History panel */}
        {showHistory && (
          <HistoryPanel
            history={history}
            onSelect={handleSelectHistory}
            onDelete={handleDeleteHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs text-slate-400 text-center tracking-wide">
            powered by Toku
          </p>
        </div>
      </footer>
    </div>
  );
}
