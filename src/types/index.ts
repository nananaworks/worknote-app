export type WorkType =
  | 'チラシ'
  | 'メニュー表'
  | 'LP'
  | 'Webサイト'
  | 'Amazon商品画像'
  | 'YouTubeサムネイル'
  | 'ロゴ'
  | 'バナー'
  | 'カタログ'
  | '名刺';

export type ProductionType = '依頼を受けて制作' | 'サンプル制作' | '架空案件';

export interface PortfolioFormData {
  workType: WorkType;
  productionType: ProductionType;
  industry: string;
  target: string;
  designFeature: string;
  purpose: string;
  scope: string;
  memo: string;
}

export interface GeneratedContent {
  title: string;
  description: string;
  scope: string;
  categories: string[];
  tags: string[];
  shareNote: string;
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  formData: PortfolioFormData;
  generatedContent: GeneratedContent;
}
