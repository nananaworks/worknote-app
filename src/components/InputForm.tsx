'use client';

import { useRef, useState, useCallback } from 'react';
import type { PortfolioFormData, WorkType, ProductionType } from '@/types';

const WORK_TYPES: WorkType[] = [
  'チラシ',
  'メニュー表',
  'LP',
  'Webサイト',
  'Amazon商品画像',
  'YouTubeサムネイル',
  'ロゴ',
  'バナー',
  'カタログ',
  '名刺',
];

const PRODUCTION_TYPES: { value: ProductionType; label: string; desc: string }[] = [
  { value: '依頼を受けて制作', label: '依頼を受けて制作', desc: 'クライアントから受注' },
  { value: 'サンプル制作', label: 'サンプル制作', desc: 'ポートフォリオ用サンプル' },
  { value: '架空案件', label: '架空案件', desc: '架空クライアントを想定' },
];

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface Props {
  formData: PortfolioFormData;
  onChange: (data: PortfolioFormData) => void;
  onGenerate: () => void;
}

export default function InputForm({ formData, onChange, onGenerate }: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setWorkType = (value: WorkType) => onChange({ ...formData, workType: value });
  const setProductionType = (value: ProductionType) =>
    onChange({ ...formData, productionType: value });

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onChange({ ...formData, imageName: file.name });
    },
    [formData, onChange],
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl(null);
    onChange({ ...formData, imageName: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReplaceImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Panel header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-800">制作情報</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          タイプを選択して画像をアップロードしてください
        </p>
      </div>

      <div className="px-6 py-5 space-y-6 flex-1">
        {/* Work Type */}
        <fieldset>
          <legend className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
            制作物タイプ
          </legend>
          <div className="flex flex-wrap gap-2">
            {WORK_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setWorkType(type)}
                className={`px-3 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
                  formData.workType === type
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Production Type */}
        <fieldset>
          <legend className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
            制作区分
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {PRODUCTION_TYPES.map(({ value, label, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setProductionType(value)}
                className={`px-3 py-2.5 text-left rounded-lg border transition-colors ${
                  formData.productionType === value
                    ? 'bg-blue-50 border-blue-400 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-semibold">{label}</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-tight">{desc}</div>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="border-t border-slate-100" />

        {/* Image upload */}
        <div>
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
            制作物画像
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleInputChange}
          />

          {imagePreviewUrl ? (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="relative bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreviewUrl}
                  alt="アップロード画像のプレビュー"
                  className="w-full object-contain max-h-56"
                />
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 bg-white border-t border-slate-100">
                <span className="text-xs text-slate-500 truncate max-w-[60%]">
                  {formData.imageName}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleReplaceImage}
                    className="text-xs text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 px-2.5 py-1 rounded-md transition-colors"
                  >
                    差し替え
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 px-2.5 py-1 rounded-md transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 py-10 px-6 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40'
              }`}
            >
              <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                <svg
                  className="w-6 h-6 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  ここに制作した画像をドラッグ&ドロップ、
                  <br className="hidden sm:block" />
                  またはクリックして選択してください
                </p>
                <p className="text-xs text-slate-400 mt-1">JPG / PNG / WebP 対応</p>
              </div>
            </div>
          )}
        </div>

        {/* Memo */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
            補足メモ{' '}
            <span className="text-slate-400 font-normal normal-case tracking-normal ml-1">
              任意
            </span>
          </label>
          <textarea
            value={formData.memo}
            onChange={(e) => onChange({ ...formData, memo: e.target.value })}
            placeholder="例：美容室のキャンペーンチラシ。春らしい明るい印象で制作。Photoshop / Illustratorで作成。"
            rows={3}
            className="w-full px-3 py-2 text-sm text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-slate-300 resize-none"
          />
        </div>
      </div>

      {/* Generate button */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50">
        <button
          type="button"
          onClick={onGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-sm"
        >
          ポートフォリオ文章を生成する →
        </button>
      </div>
    </div>
  );
}
