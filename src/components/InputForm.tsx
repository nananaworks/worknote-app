'use client';

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

type StringFieldKey = 'industry' | 'target' | 'designFeature' | 'purpose' | 'scope' | 'memo';

const TEXT_FIELDS: {
  key: StringFieldKey;
  label: string;
  placeholder: string;
  hint?: string;
  multiline?: boolean;
}[] = [
  {
    key: 'industry',
    label: '業種',
    placeholder: '例：飲食店、美容院、IT企業、アパレル',
    hint: '制作したポートフォリオの業種を入力してください',
  },
  {
    key: 'target',
    label: 'ターゲット',
    placeholder: '例：20〜30代の女性、中小企業の経営者',
  },
  {
    key: 'designFeature',
    label: 'デザインの特徴',
    placeholder: '例：シンプルで清潔感のある、温かみがあって親しみやすい',
  },
  {
    key: 'purpose',
    label: '使用目的',
    placeholder: '例：集客・販促、ブランドイメージ向上、新商品のPR',
  },
  {
    key: 'scope',
    label: '担当範囲',
    placeholder: '例：デザイン・レイアウト・入稿データ作成（空欄で自動生成）',
    hint: '空欄の場合、制作物タイプに合わせて自動で生成されます',
  },
  {
    key: 'memo',
    label: '補足メモ',
    placeholder: '例：Photoshop / Illustratorで制作。印刷入稿まで対応。',
    multiline: true,
  },
];

interface Props {
  formData: PortfolioFormData;
  onChange: (data: PortfolioFormData) => void;
  onGenerate: () => void;
}

export default function InputForm({ formData, onChange, onGenerate }: Props) {
  const setWorkType = (value: WorkType) => onChange({ ...formData, workType: value });
  const setProductionType = (value: ProductionType) =>
    onChange({ ...formData, productionType: value });
  const handleTextChange = (key: StringFieldKey, value: string) =>
    onChange({ ...formData, [key]: value } as PortfolioFormData);

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Panel header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-sm font-semibold text-slate-800">制作情報を入力</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          各項目を入力してポートフォリオ文章を生成します
        </p>
      </div>

      <div className="px-6 py-5 space-y-6 flex-1 overflow-auto">
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

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Text fields */}
        <div className="space-y-4">
          {TEXT_FIELDS.map(({ key, label, placeholder, hint, multiline }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
              {multiline ? (
                <textarea
                  value={formData[key]}
                  onChange={(e) => handleTextChange(key, e.target.value)}
                  placeholder={placeholder}
                  rows={2}
                  className="w-full px-3 py-2 text-sm text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-slate-300 resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={formData[key]}
                  onChange={(e) => handleTextChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 text-sm text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder:text-slate-300"
                />
              )}
              {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
            </div>
          ))}
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
