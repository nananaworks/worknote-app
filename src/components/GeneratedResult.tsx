'use client';

import { useEffect, useState } from 'react';
import type { GeneratedContent } from '@/types';
import CopyButton from './CopyButton';

interface FieldRowProps {
  label: string;
  children: React.ReactNode;
  copyText: string;
}

function FieldRow({ label, children, copyText }: FieldRowProps) {
  return (
    <div className="border border-slate-100 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <CopyButton text={copyText} />
      </div>
      <div className="px-3 py-2.5">{children}</div>
    </div>
  );
}

const INPUT_CLASS =
  'w-full text-sm text-slate-700 border-0 focus:outline-none focus:ring-0 bg-transparent p-0 placeholder:text-slate-300';
const TEXTAREA_CLASS =
  'w-full text-sm text-slate-700 border-0 focus:outline-none focus:ring-0 bg-transparent p-0 placeholder:text-slate-300 resize-none';

interface Props {
  content: GeneratedContent | null;
}

export default function GeneratedResult({ content }: Props) {
  const [edited, setEdited] = useState<GeneratedContent | null>(null);

  useEffect(() => {
    setEdited(content);
  }, [content]);

  const set = (key: keyof GeneratedContent, value: string) => {
    if (!edited) return;
    setEdited({ ...edited, [key]: value });
  };

  const allText = edited
    ? [
        `【タイトル】\n${edited.title}`,
        `【サブタイトル】\n${edited.subtitle}`,
        `【説明文】\n${edited.description}`,
        `【検索キーワード】\n${edited.keywords}`,
        `【カテゴリー候補】\n${edited.categories}`,
        `【業種】\n${edited.industry}`,
        `【担当範囲】\n${edited.scope}`,
        `【制作ポイント】\n${edited.productionPoint}`,
        `【上司・社内確認用メモ】\n${edited.shareNote}`,
      ].join('\n\n')
    : '';

  if (!content || !edited) {
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
        <p className="text-sm font-medium text-slate-400">左のフォームで制作物を選択して</p>
        <p className="text-sm text-slate-400 mt-0.5">「生成する」ボタンを押してください</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Panel header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">ランサーズ貼り付け用テキスト</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            各項目を直接編集できます。コピーして貼り付けてください。
          </p>
        </div>
        <CopyButton text={allText} size="md" />
      </div>

      <div className="px-6 py-5 space-y-3">
        {/* タイトル */}
        <FieldRow label="タイトル" copyText={edited.title}>
          <input
            type="text"
            value={edited.title}
            onChange={(e) => set('title', e.target.value)}
            className={INPUT_CLASS}
          />
        </FieldRow>

        {/* サブタイトル */}
        <FieldRow label="サブタイトル" copyText={edited.subtitle}>
          <input
            type="text"
            value={edited.subtitle}
            onChange={(e) => set('subtitle', e.target.value)}
            className={INPUT_CLASS}
          />
        </FieldRow>

        {/* 説明文 */}
        <FieldRow label="説明文" copyText={edited.description}>
          <textarea
            value={edited.description}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
            className={TEXTAREA_CLASS}
          />
        </FieldRow>

        {/* 検索キーワード */}
        <FieldRow label="検索キーワード" copyText={edited.keywords}>
          <input
            type="text"
            value={edited.keywords}
            onChange={(e) => set('keywords', e.target.value)}
            className={INPUT_CLASS}
          />
        </FieldRow>

        {/* カテゴリー候補 */}
        <FieldRow label="カテゴリー候補" copyText={edited.categories}>
          <input
            type="text"
            value={edited.categories}
            onChange={(e) => set('categories', e.target.value)}
            className={INPUT_CLASS}
          />
        </FieldRow>

        {/* 業種 */}
        <FieldRow label="業種" copyText={edited.industry}>
          <input
            type="text"
            value={edited.industry}
            onChange={(e) => set('industry', e.target.value)}
            className={INPUT_CLASS}
          />
        </FieldRow>

        {/* 担当範囲 */}
        <FieldRow label="担当範囲" copyText={edited.scope}>
          <input
            type="text"
            value={edited.scope}
            onChange={(e) => set('scope', e.target.value)}
            className={INPUT_CLASS}
          />
        </FieldRow>

        {/* 制作ポイント */}
        <FieldRow label="制作ポイント" copyText={edited.productionPoint}>
          <textarea
            value={edited.productionPoint}
            onChange={(e) => set('productionPoint', e.target.value)}
            rows={3}
            className={TEXTAREA_CLASS}
          />
        </FieldRow>

        {/* 上司・社内確認用メモ */}
        <FieldRow label="上司・社内確認用メモ" copyText={edited.shareNote}>
          <textarea
            value={edited.shareNote}
            onChange={(e) => set('shareNote', e.target.value)}
            rows={3}
            className={`${TEXTAREA_CLASS} font-mono text-xs`}
          />
        </FieldRow>
      </div>
    </div>
  );
}
