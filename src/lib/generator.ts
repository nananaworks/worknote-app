import type { PortfolioFormData, GeneratedContent, WorkType } from '@/types';

const DEFAULT_SCOPES: Record<WorkType, string> = {
  チラシ: 'デザイン企画・レイアウト構成・タイポグラフィ・入稿データ作成',
  メニュー表: 'デザイン企画・レイアウト構成・写真選定・入稿データ作成',
  LP: 'ページ構成設計・UIデザイン・レスポンシブ対応・HTML/CSSコーディング',
  Webサイト: 'サイト設計・UIデザイン・ページ制作・レスポンシブ対応',
  Amazon商品画像: '商品画像レタッチ・テキストレイアウト・サムネイル・バナー画像作成',
  YouTubeサムネイル: 'サムネイルデザイン・テキストレイアウト・画像加工',
  ロゴ: 'コンセプト設計・ロゴデザイン・カラーバリエーション・ガイドライン策定',
  バナー: 'バナーデザイン・テキストレイアウト・サイズバリエーション対応',
  カタログ: 'デザイン企画・ページレイアウト・写真加工・印刷入稿データ作成',
  名刺: '名刺デザイン・レイアウト構成・入稿データ作成',
};

const CATEGORIES: Record<WorkType, string[]> = {
  チラシ: ['グラフィックデザイン', 'チラシ・フライヤー制作', '印刷物デザイン'],
  メニュー表: ['グラフィックデザイン', 'メニュー表・POP制作', '印刷物デザイン'],
  LP: ['Webデザイン', 'ランディングページ制作', 'コーディング'],
  Webサイト: ['Webデザイン', 'Webサイト制作', 'コーディング'],
  Amazon商品画像: ['グラフィックデザイン', 'Amazon商品画像制作', '画像加工・編集'],
  YouTubeサムネイル: ['グラフィックデザイン', 'サムネイル制作', '動画関連デザイン'],
  ロゴ: ['ロゴ・アイコン作成', 'ブランドデザイン', 'グラフィックデザイン'],
  バナー: ['バナー制作', 'Webデザイン', 'グラフィックデザイン'],
  カタログ: ['グラフィックデザイン', 'カタログ・パンフレット制作', '印刷物デザイン'],
  名刺: ['名刺・ショップカード制作', 'グラフィックデザイン', '印刷物デザイン'],
};

const BASE_TAGS: Record<WorkType, string[]> = {
  チラシ: ['チラシデザイン', 'フライヤー', 'DTPデザイン', 'Illustrator', 'グラフィックデザイン'],
  メニュー表: ['メニュー表デザイン', 'DTPデザイン', 'Illustrator', 'グラフィックデザイン'],
  LP: ['LPデザイン', 'ランディングページ', 'Webデザイン', 'HTML', 'CSS', 'レスポンシブデザイン'],
  Webサイト: ['Webデザイン', 'ホームページ制作', 'HTML', 'CSS', 'レスポンシブデザイン'],
  Amazon商品画像: ['Amazon商品画像', '商品画像制作', 'Photoshop', 'ECデザイン'],
  YouTubeサムネイル: ['YouTubeサムネイル', 'サムネイルデザイン', 'Photoshop', 'バナーデザイン'],
  ロゴ: ['ロゴデザイン', 'ブランディング', 'Illustrator', 'CI・VIデザイン'],
  バナー: ['バナーデザイン', 'Webバナー', 'Photoshop', 'Illustrator', '広告デザイン'],
  カタログ: ['カタログデザイン', 'パンフレット', 'DTPデザイン', 'Illustrator'],
  名刺: ['名刺デザイン', 'ショップカード', 'DTPデザイン', 'Illustrator'],
};

function buildTitle(data: PortfolioFormData): string {
  const { workType, industry, designFeature } = data;

  if (industry && designFeature) {
    return `${industry}向け${workType} ｜ ${designFeature}`;
  }
  if (industry) return `${industry}向け${workType}`;
  if (designFeature) return `${workType} ｜ ${designFeature}`;
  return `${workType}デザイン`;
}

function buildDescription(data: PortfolioFormData): string {
  const { workType, productionType, industry, target, designFeature, purpose, memo } = data;

  let opening: string;
  switch (productionType) {
    case '依頼を受けて制作':
      opening = industry
        ? `${industry}のクライアント様よりご依頼をいただき、${workType}を制作いたしました。`
        : `クライアント様よりご依頼をいただき、${workType}を制作いたしました。`;
      break;
    case 'サンプル制作':
      opening = industry
        ? `${industry}を想定したサンプル作品として、${workType}を制作しました。`
        : `ポートフォリオ用のサンプル作品として、${workType}を制作しました。`;
      break;
    case '架空案件':
      opening = industry
        ? `${industry}の架空クライアントを想定して、${workType}を制作しました。`
        : `架空の案件を想定して、${workType}を制作しました。`;
      break;
  }

  const contextParts: string[] = [];
  if (target) contextParts.push(`${target}をメインターゲットに`);
  if (purpose) contextParts.push(`${purpose}を目的として`);

  let body: string;
  if (contextParts.length > 0 && designFeature) {
    body = `${contextParts.join('、')}、${designFeature}を意識したデザインに仕上げました。`;
  } else if (contextParts.length > 0) {
    body = `${contextParts.join('、')}、視認性とデザイン性のバランスを意識して仕上げました。`;
  } else if (designFeature) {
    body = `${designFeature}を意識し、全体のまとまりを大切にデザインしました。`;
  } else {
    body = '視認性と訴求力のバランスを意識して、丁寧にデザインしました。';
  }

  const main = opening + body;
  return memo ? `${main}\n\n${memo}` : main;
}

function buildScope(data: PortfolioFormData): string {
  return data.scope.trim() || DEFAULT_SCOPES[data.workType];
}

function buildTags(data: PortfolioFormData): string[] {
  const tags = [...BASE_TAGS[data.workType]];
  const feature = data.designFeature.toLowerCase();

  if (feature.includes('シンプル') || feature.includes('ミニマル')) {
    tags.push('シンプルデザイン');
  }
  if (feature.includes('かわいい') || feature.includes('ポップ')) {
    tags.push('かわいいデザイン');
  }
  if (feature.includes('高級') || feature.includes('エレガント') || feature.includes('上品')) {
    tags.push('高級感');
  }
  if (feature.includes('プロ') || feature.includes('ビジネス') || feature.includes('信頼')) {
    tags.push('ビジネスデザイン');
  }
  if (feature.includes('和') || feature.includes('和風') || feature.includes('和モダン')) {
    tags.push('和風デザイン');
  }

  if (data.industry) tags.push(data.industry);

  return [...new Set(tags)];
}

function buildShareNote(
  data: PortfolioFormData,
  title: string,
  categories: string[]
): string {
  const typeLabel =
    data.productionType === '依頼を受けて制作' ? '受注制作' : data.productionType;
  return [
    `【ポートフォリオ掲載用】${title}`,
    `制作区分：${typeLabel}`,
    `カテゴリ：${categories[0]}`,
  ].join('\n');
}

export function generateContent(data: PortfolioFormData): GeneratedContent {
  const title = buildTitle(data);
  const categories = CATEGORIES[data.workType];
  const description = buildDescription(data);
  const scope = buildScope(data);
  const tags = buildTags(data);
  const shareNote = buildShareNote(data, title, categories);

  return { title, description, scope, categories, tags, shareNote };
}
