import React from 'react';
import { FAQItem, Testimonial } from './types';
import { Shield, Zap, Sparkles, Home, CheckCircle2 } from 'lucide-react';

// Using placeholder images for demo. In production, these would be real case photos.
const BEFORE_IMG = "https://placehold.co/400x300/555555/aaaaaa?text=Before";
const AFTER_IMG = "https://placehold.co/400x300/ffffff/1A3678?text=After";

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, text: "近所に『新築にした？』と聞かれました", location: "神奈川県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 2, text: "塗装の費用が浮いて大満足です。家族も喜んでいます", location: "東京都", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 3, text: "北側のひどい苔が数時間で消えて驚きました", location: "千葉県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 4, text: "対応が丁寧で、追加のオーダーにもすぐ応じてくれました", location: "埼玉県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 5, text: "もっと早く頼めばよかった！新築時の白さが戻りました", location: "茨城県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 6, text: "塗装までは考えていなかったので、洗浄という選択肢は正解でした", location: "神奈川県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 7, text: "隣の林のせいで酷かった苔がスッキリしました", location: "東京都", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 8, text: "主人の大掃除の手間が減って助かりました", location: "千葉県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 9, text: "費用も抑えられ、接客も明るく丁寧で信頼できました", location: "埼玉県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG },
  { id: 10, text: "外観が明るくなり毎日気分がいいです。作業も丁寧で安心でした", location: "神奈川県", beforeImage: BEFORE_IMG, afterImage: AFTER_IMG }
];

export const FAQS: FAQItem[] = [
  { question: "洗浄時間はどのくらい？", answer: "1〜5時間程度で終わる場合が多いです。" },
  { question: "洗濯物はどうすればいい？", answer: "水を使用するため、作業中は室内干しをお願いしています。" },
  { question: "作業中の在宅は必要？", answer: "屋外作業ですので、必ずしも在宅いただく必要はありません。" },
  { question: "使用する洗剤は安全ですか？", answer: "外壁材を傷めないよう、プロが最適な洗剤を選定して使用します。周囲の植栽などへは、必要に応じて事前にお水を撒く、養生（カバー）をするなどの配慮を行い、丁寧に作業いたします。" },
  { question: "市販の高圧洗浄機と何が違うの？", answer: "適切な水圧と、壁を傷めないプロの技術・機材で洗浄します。市販機は水圧で壁を傷めるリスクがあるため注意が必要です。" },
  { question: "見積り用の写真はどのように撮ればいいですか？", answer: "「建物全体の引き」と「汚れ箇所のアップ」をスマートフォンで撮影してください。より正確なお見積りをお出しできます。" }
];

export const REASONS = [
  {
    title: "プロが素材に合わせて最適な洗剤を選定",
    desc: "国内で信頼性の高い洗剤の中から、外壁材にダメージを与えないよう、プロが素材の状態に合わせて最適なものを選定します。",
    icon: <Shield className="w-8 h-8 text-white" />
  },
  {
    title: "菌を根絶するバイオ洗浄",
    desc: "頑固な菌汚れには、プロが選定するバイオ洗浄を実施。汚れの元を分解し、美しさを長続きさせます。",
    icon: <Zap className="w-8 h-8 text-white" />
  },
  {
    title: "足場なしのスピード施工",
    desc: "伸縮ポールを使用し地上から作業するため、足場費用がかからず、最短即日の対応も可能です。",
    icon: <Sparkles className="w-8 h-8 text-white" />
  },
  {
    title: "専門家による仕上げ",
    desc: "洗浄後には、プロが選定したケア剤で仕上げ、外壁の美しさをガードします。",
    icon: <CheckCircle2 className="w-8 h-8 text-white" />
  }
];

export const MERITS = [
  { title: "安い", sub: "外壁一面\n1万円〜", icon: "¥" },
  { title: "早い", sub: "見積もりから\n最短3日で着工可能", icon: "Clock" },
  { title: "キレイ", sub: "汚れを一掃し\n家全体が明るく", icon: "Sparkle" },
];

export const FLOW_STEPS = [
  "24時間無料オンライン見積もり",
  "最適な洗剤・プランのご提案",
  "プロによる洗浄作業",
  "ケア剤による仕上げ施工",
  "完了・ご確認"
];
