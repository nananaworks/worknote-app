'use client';

import type { HistoryEntry } from '@/types';

interface Props {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const mo = d.getMonth() + 1;
  const da = d.getDate();
  const hh = d.getHours();
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${mo}/${da} ${hh}:${mm}`;
}

export default function HistoryPanel({ history, onSelect, onDelete, onClose }: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">生成履歴</h2>
          <p className="text-xs text-slate-500 mt-0.5">{history.length}件の履歴</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
          aria-label="閉じる"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {history.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-slate-400">生成履歴がありません</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors"
            >
              <button
                type="button"
                onClick={() => onSelect(entry)}
                className="flex-1 text-left min-w-0"
              >
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-medium flex-shrink-0">
                    {entry.formData.workType}
                  </span>
                  <span className="text-xs text-slate-400 flex-shrink-0">
                    {formatDate(entry.createdAt)}
                  </span>
                  <span className="text-xs text-slate-300 flex-shrink-0">
                    {entry.formData.productionType}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700 truncate">
                  {entry.generatedContent.title}
                </p>
                {entry.formData.imageName && (
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    📎 {entry.formData.imageName}
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-0.5 truncate leading-relaxed">
                  {entry.generatedContent.description}
                </p>
              </button>

              <button
                type="button"
                onClick={() => onDelete(entry.id)}
                className="flex-shrink-0 text-slate-300 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-50"
                aria-label="削除"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
