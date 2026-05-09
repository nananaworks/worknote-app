'use client';

import { useState } from 'react';

interface Props {
  text: string;
  size?: 'sm' | 'md';
}

export default function CopyButton({ text, size = 'sm' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const base =
    size === 'md'
      ? 'px-4 py-1.5 text-sm rounded-lg font-medium'
      : 'px-2.5 py-1 text-xs rounded-md';

  return (
    <button
      onClick={handleCopy}
      className={`${base} transition-colors flex items-center gap-1 ${
        copied
          ? 'bg-green-100 text-green-700 border border-green-200'
          : 'bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300'
      }`}
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          コピー済み
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          コピー
        </>
      )}
    </button>
  );
}
