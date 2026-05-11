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
  categoryOption: string;
  industryOption: string;
  memo: string;
  imageName: string;
}

export interface GeneratedContent {
  title: string;
  subtitle: string;
  description: string;
  keywords: string;
}

export interface HistoryEntry {
  id: string;
  createdAt: string;
  formData: PortfolioFormData;
  generatedContent: GeneratedContent;
}
