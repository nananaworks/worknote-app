'use client';

import type { GeneratedContent } from '@/types';
import CopyButton from './CopyButton';

interface ResultSectionProps {
  label: string;
  children: React.ReactNode;
  copyText: string;
}

function ResultSection({ label, children, copyText }: ResultSectionProps) {
  return (
    <div className="border border-slate-100 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </span>
        <CopyButton text={copyText} />
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

interface Props {
  content: GeneratedContent | null;
}

export default function GeneratedResult({ content }: Props) {
  if (!content) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col items-center justify-center min-h-80 py-16 px-8 text-center">
        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <svg
            className="w-7 h-7 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-400">左のフォームに情報を入力して</p>
        <p className="text-sm text-slate-400 mt-0.5">「生成する」ボタンを押してください</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-800">生成結果</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          各項目をコピーしてポートフォリオに貼り付けてください
        </p>
      </div>

      <div className="px-6 py-5 space-y-3">
        {/* Title */}
        <ResultSection label="ポートフォリオタイトル" copyText={content.title}>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">{content.title}</p>
        </ResultSection>

        {/* Description */}
        <ResultSection label="説明文" copyText={content.description}>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {content.description}
          </p>
        </ResultSection>

        {/* Scope */}
        <ResultSection label="担当範囲" copyText={content.scope}>
          <p className="text-sm text-slate-700 leading-relaxed">{content.scope}</p>
        </ResultSection>

        {/* Categories */}
        <ResultSection label="カテゴリ候補" copyText={content.categories.join(' / ')}>
          <div className="flex flex-wrap gap-1.5">
            {content.categories.map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </ResultSection>

        {/* Tags */}
        <ResultSection label="タグ候補" copyText={content.tags.join(' ')}>
          <div className="flex flex-wrap gap-1.5">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-md font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </ResultSection>

        {/* Share note */}
        <ResultSection label="上司確認用の共有文" copyText={content.shareNote}>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-mono text-xs bg-slate-50 rounded p-2">
            {content.shareNote}
          </p>
        </ResultSection>
      </div>
    </div>
  );
}
