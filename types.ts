export interface Testimonial {
  id: number;
  text: string;
  location: string;
  beforeImage: string;
  afterImage: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FormData {
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  address: string;
  roofColor: string;
  wallColor: string;
  features: string;
  areas: string[];
  age: string;
  message: string;
}

export const FORM_AREAS = [
  "外壁",
  "屋根",
  "塀／門まわり",
  "玄関タイル",
  "玄関アプローチ",
  "駐車場（土間コンクリート）",
  "カーポート",
  "バルコニー・ベランダ床",
  "ソーラーパネル",
  "窓・サッシ",
  "その他"
];

export const FORM_AGES = [
  "1〜5年",
  "6〜10年",
  "11〜15年",
  "16〜20年",
  "21〜25年",
  "26〜30年",
  "30年以上"
];
