import React, { useState, useRef, useEffect, useId } from 'react';
import emailjs from '@emailjs/browser';
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  X, 
  Check, 
  MapPin, 
  Mail, 
  Camera,
  Star,
  ArrowDown,
  Shield,
  Crown,
  AlertTriangle,
  Trash2,
  Zap,
  Clock,
  Sparkles as SparkleIcon,
  CircleDollarSign,
  Plus,
  Home,
  Phone,
  CheckCircle2,
  ThumbsUp,
  Image as ImageIcon,
  Search,
  UserCheck,
  BellRing,
  ChevronLeft,
  Award,
  Upload,
  HelpCircle,
  MessageCircle,
  FileText,
  Gift,
  Coins,
  Timer,
  User,
  Building,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { TESTIMONIALS, FAQS, REASONS, MERITS, FLOW_STEPS } from './constants';
import { FORM_AREAS, FORM_AGES, FormData } from './types';

// --- Assets ---
const SOTOPIKA_LOGO_TEXT = "https://placehold.co/300x80/transparent/1A3678?text=SOTOPIKA+Logo";
const HERO_BEFORE = "https://placehold.co/600x600/333333/FFFFFF?text=Before:+Dirty";
const HERO_AFTER = "https://placehold.co/600x600/1A3678/FFFFFF?text=After:+Clean";
const SOTOPIKA_CHAR = "https://placehold.co/400x400/transparent/1A3678?text=Sotopika+Dog";
const DIRTY_WALL_BG = "https://placehold.co/800x400/333333/666666?text=Dirty+Wall+Texture";
const STAFF_IMAGE = "https://placehold.co/150x150/1A3678/FFFFFF?text=Staff";
const MOSS_IMG = "https://placehold.co/400x300/5c6b45/ffffff?text=苔汚れ";
const STAIN_IMG = "https://placehold.co/400x300/444444/ffffff?text=黒ずみ";
const CLEAN_HOUSE_BG = "https://placehold.co/1920x1080/e0f2fe/1e3a8a?text=Beautiful+Clean+Home+Background";

// --- Audio Effect ---
const playPopSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Ignore audio errors
  }
};

// --- Helper Components ---

// 4. Scroll Progress Bar
const ScrollProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setWidth(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1.5 bg-gray-200 z-[60]">
      <div 
        className="h-full bg-sotopika-yellow transition-all duration-150 ease-out shadow-[0_0_10px_rgba(253,184,19,0.7)]" 
        style={{ width: `${width}%` }} 
      />
    </div>
  );
};

// Privacy Policy Modal
const PrivacyModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in-up">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="bg-white rounded-2xl p-6 md:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-sotopika-navy mb-6 border-b pb-4">プライバシーポリシー</h2>
        
        <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed">
          <p>
            外壁洗浄専門店 ソトピカ（以下、「当店」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </p>

          <section>
            <h3 className="font-bold text-lg text-sotopika-navy mb-2">第1条（個人情報）</h3>
            <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg text-sotopika-navy mb-2">第2条（個人情報の収集方法）</h3>
            <p>当店は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレスなどの個人情報をお尋ねすることがあります。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg text-sotopika-navy mb-2">第3条（個人情報の利用目的）</h3>
            <p>当店が個人情報を利用する目的は、以下のとおりです。</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>当店サービスの提供・運営のため</li>
              <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
              <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
              <li>不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
              <li>上記の利用目的に付随する目的</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg text-sotopika-navy mb-2">第4条（利用目的の変更）</h3>
            <p>当店は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg text-sotopika-navy mb-2">第5条（個人情報の第三者提供）</h3>
            <p>当店は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg text-sotopika-navy mb-2">第6条（お問い合わせ窓口）</h3>
            <p>本ポリシーに関するお問い合わせは、お問い合わせフォームよりお願いいたします。</p>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={onClose} 
            className="bg-sotopika-navy text-white font-bold py-3 px-8 rounded-full hover:bg-blue-900 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

// 1. Thanks Modal
const ThanksModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-fade-in-up">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-md w-full relative z-10 text-center shadow-2xl border-4 border-sotopika-yellow transform scale-100">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="mb-6 relative inline-block">
          <div className="absolute -inset-4 bg-yellow-100 rounded-full animate-pulse opacity-50"></div>
          <img 
            src={SOTOPIKA_CHAR} 
            alt="Success" 
            width="400" 
            height="400"
            className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-lg mx-auto" 
          />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-rounded font-extrabold text-sotopika-navy mb-4">
          送信いたしました！
        </h3>
        <p className="text-gray-600 mb-8 leading-relaxed font-medium">
          お問い合わせありがとうございます。<br/>
          担当者より<span className="text-sotopika-navy font-bold">24時間以内</span>にご連絡いたします。<br/>
          今しばらくお待ちください。
        </p>
        
        <button 
          onClick={onClose} 
          className="bg-sotopika-navy text-white font-bold py-4 px-10 rounded-full hover:bg-blue-900 hover:scale-105 transition-all shadow-lg"
        >
          トップページへ戻る
        </button>
      </div>
    </div>
  );
};

// Common CTA Text Component to ensure consistency
const CTAText = () => (
  <div className="flex flex-col items-center justify-center leading-none text-center">
     <span className="text-xs md:text-base font-bold mb-1 tracking-wide">写真で簡単 24時間いつでも</span>
     <span className="text-xl md:text-3xl font-extrabold tracking-tight">オンライン見積もり</span>
  </div>
);

// 2. Mobile Menu
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-white shadow-2xl p-6 animate-fade-in-up">
        <div className="flex justify-end mb-8">
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <nav className="flex flex-col gap-6">
          <div className="text-sotopika-navy font-rounded font-extrabold text-2xl border-b border-gray-100 pb-4">MENU</div>
          {[
            { label: "選ばれる理由", href: "#reasons" },
            { label: "施工の流れ", href: "#flow" },
            { label: "施工事例", href: "#cases" },
            { label: "よくある質問", href: "#faq" },
          ].map((item, i) => (
            <a 
              key={i} 
              href={item.href} 
              onClick={onClose}
              className="text-lg font-bold text-gray-700 hover:text-sotopika-yellow flex items-center justify-between group"
            >
              {item.label}
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-sotopika-yellow" />
            </a>
          ))}
          <div className="mt-8">
             <CTAButton fullWidth onClick={onClose}>
               <CTAText />
             </CTAButton>
          </div>
        </nav>
      </div>
    </div>
  );
};

// FadeIn component with scroll animation removed
const FadeIn: React.FC<{ children?: React.ReactNode; delay?: number; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Floating CTA Component - Smart Logic
const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverForm, setIsOverForm] = useState(false);

  useEffect(() => {
    // Scroll detection
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Contact form intersection detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverForm(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const contactSection = document.getElementById('contact');
    if (contactSection) observer.observe(contactSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!isVisible || isOverForm) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur shadow-[0_-4px_6px_rgba(0,0,0,0.1)] border-t border-gray-100 p-2 animate-fade-in-up">
      <Container className="flex items-center justify-center">
        {/* Adjusted size: Smaller vertical padding (py-2), larger text (text-lg md:text-2xl) */}
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full max-w-md bg-gradient-to-r from-sotopika-yellow to-yellow-400 hover:from-yellow-400 hover:to-sotopika-yellow text-sotopika-navy font-rounded font-extrabold py-2 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all"
        >
          <Mail className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
          <CTAText />
        </button>
      </Container>
    </div>
  );
};

// EFO Helper Component
const ValidCheck = ({ isValid }: { isValid: boolean }) => (
  <span className={`transition-all duration-300 transform ${isValid ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} absolute right-3 top-1/2 -translate-y-1/2`}>
    <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-100" />
  </span>
);

const WaveDivider = ({ position = "bottom", color = "pale" }: { position?: "top" | "bottom", color?: "white" | "pale" | "navy" | "gray" }) => {
  const fillColors = {
    white: "#ffffff",
    pale: "#F0F8FF",
    navy: "#1A3678",
    gray: "#f3f4f6"
  };

  return (
    <div className={`absolute left-0 w-full overflow-hidden leading-[0] z-10 ${position === "top" ? "top-0 rotate-180" : "bottom-0"}`}>
      <svg className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill={fillColors[color]}></path>
      </svg>
    </div>
  );
};

// [POINT 5] Design/Spacing: Reduced vertical padding for mobile, increased for desktop
const Section = ({ 
  children, 
  className = "", 
  variant = "white", 
  id = "",
  waveTop,
  waveBottom,
  bubbles = false
}: { 
  children?: React.ReactNode, 
  className?: string, 
  variant?: "white" | "pale" | "navy" | "yellow" | "gold",
  id?: string,
  waveTop?: boolean,
  waveBottom?: boolean,
  bubbles?: boolean
}) => {
  const bgColors = {
    white: "bg-white",
    pale: "bg-sotopika-pale",
    navy: "bg-sotopika-navy text-white",
    yellow: "bg-sotopika-yellow",
    gold: "bg-gradient-to-br from-yellow-50 to-white border-y-4 border-sotopika-gold"
  };
  
  // Adjusted padding: py-12/16 for mobile, py-24/32 for desktop
  return (
    <section id={id} className={`py-12 md:py-24 lg:py-32 relative ${bgColors[variant]} ${className}`}>
      {waveTop && <WaveDivider position="top" color={variant === "pale" ? "white" : "pale"} />}
      <div className="relative z-10">
        {children}
      </div>
      {waveBottom && <WaveDivider position="bottom" color={variant === "white" ? "pale" : "white"} />}
    </section>
  );
};

const Container = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`container mx-auto px-4 md:px-6 max-w-6xl ${className}`}>
    {children}
  </div>
);

const Heading = ({ 
  children, 
  className = "", 
  center = true, 
  color = "navy" 
}: { 
  children?: React.ReactNode, 
  className?: string, 
  center?: boolean,
  color?: "navy" | "white" | "gold"
}) => {
  const colors = {
    navy: "text-sotopika-navy",
    white: "text-white",
    gold: "text-sotopika-navy"
  };
  return (
    <FadeIn>
      {/* Mobile: text-2xl, Desktop: text-4xl. Tighter margin on mobile. */}
      <h2 className={`font-rounded font-bold text-2xl md:text-4xl mb-8 md:mb-16 tracking-tight leading-snug ${center ? 'text-center' : ''} ${colors[color]} ${className}`}>
        {children}
      </h2>
    </FadeIn>
  );
};

const CTAButton = ({ 
  children, 
  className = "", 
  fullWidth = false,
  onClick,
  animated = false,
  disabled = false
}: { 
  children?: React.ReactNode, 
  className?: string, 
  fullWidth?: boolean,
  onClick?: () => void,
  animated?: boolean,
  disabled?: boolean
}) => (
  <button 
    type="button" 
    disabled={disabled}
    onClick={(e) => {
      if (!disabled) {
        if (onClick) {
           onClick();
        } else {
           playPopSound();
           document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }}
    className={`
      relative overflow-hidden
      /* Adjusted: Compact vertical padding (py-2 md:py-3), larger text (text-lg md:text-2xl) */
      bg-gradient-to-b from-yellow-300 to-sotopika-yellow text-sotopika-navy font-rounded font-extrabold text-lg md:text-2xl
      py-2 md:py-3 px-8 md:px-10 rounded-full shadow-[0_3px_0_0_rgba(217,156,0,1)] 
      flex items-center justify-center gap-2 group tracking-wide
      ${fullWidth ? 'w-full' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed shadow-none grayscale' : 'hover:shadow-[0_2px_0_0_rgba(217,156,0,1)] hover:translate-y-0.5 active:shadow-none active:translate-y-1'}
      /* NEW: Inner highlight for 3D glassy feel */
      after:absolute after:inset-0 after:rounded-full after:border-2 after:border-white/40 after:pointer-events-none
      transition-all duration-150
      ${className}
    `}
  >
    {animated && !disabled && (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
        <div className="w-1/2 h-full bg-white/30 -skew-x-12 absolute top-0 left-0 animate-shimmer blur-md"></div>
      </div>
    )}
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {!disabled && <ChevronRight className="w-5 h-5 md:w-8 md:h-8 stroke-[3] group-hover:translate-x-1 transition-transform shrink-0" />}
    </span>
  </button>
);

// 新しいバッジデザイン (Gold Seal with Blue Ribbons & Laurel)
const BenefitBadge = ({ title, sub }: { title: React.ReactNode, sub: string }) => {
  // Fix: Generate unique ID for the gradient to prevent conflicts in multiple SVG instances
  const id = useId();
  const gradientId = `goldGradient-${id.replace(/:/g, '')}`;

  return (
    // Adjusted size for horizontal fit: w-28 (112px) mobile, w-44 (176px) desktop
    <div className="shrink-0 relative w-28 h-28 md:w-44 md:h-44 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 mx-0 snap-center">
      {/* Ribbons (Background) - Adjusted size */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[15%] w-24 h-12 md:w-40 md:h-20 z-0">
        <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md">
           {/* Left Ribbon */}
           <path d="M100,20 L40,80 L70,85 L60,100 L100,60 Z" fill="#1A3678" />
           <path d="M40,80 L60,100 L70,85 Z" fill="#0f2252" /> {/* Darker fold */}
           
           {/* Right Ribbon */}
           <path d="M100,20 L160,80 L130,85 L140,100 L100,60 Z" fill="#1A3678" />
           <path d="M160,80 L140,100 L130,85 Z" fill="#0f2252" /> {/* Darker fold */}
        </svg>
      </div>

      {/* Seal Body */}
      <div className="relative z-10 w-full h-full drop-shadow-xl">
        <svg viewBox="0 0 120 120" className="w-full h-full">
           <defs>
             <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#FFE066" />
               <stop offset="40%" stopColor="#FFC107" />
               <stop offset="100%" stopColor="#B8860B" />
             </linearGradient>
           </defs>
           
           {/* Serrated Edge (30 points) */}
           <path d="M60,0 L66,8 L76,8 L79,16 L88,18 L89,27 L97,31 L96,40 L103,46 L100,55 L106,62 L100,69 L103,78 L96,82 L97,91 L89,93 L88,102 L79,102 L76,110 L66,110 L60,118 L54,110 L44,110 L41,102 L32,102 L31,93 L23,91 L24,82 L17,78 L20,69 L14,62 L20,55 L17,46 L24,40 L23,31 L31,27 L32,18 L41,16 L44,8 L54,8 Z" 
                 fill={`url(#${gradientId})`} stroke="#DAA520" strokeWidth="1" />
           
           {/* Inner White Circle */}
           <circle cx="60" cy="60" r="44" fill="white" />
           
           {/* Inner Dashed Ring */}
           <circle cx="60" cy="60" r="38" fill="none" stroke="#FDB813" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>

        {/* Text Content - Resized for fit */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1 pt-1">
           <span className="text-[9px] md:text-sm font-bold text-gray-500 bg-white/80 px-1 rounded mb-0.5 md:mb-1 whitespace-nowrap">{sub}</span>
           <span className="text-base md:text-2xl font-black text-sotopika-navy leading-none tracking-tight">
             {title}
           </span>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', postalCode: '', address: '',
    roofColor: '', wallColor: '', features: '',
    areas: [], age: '', message: ''
  });
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null, null, null, null]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanksModal, setShowThanksModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [formStep, setFormStep] = useState(1);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      // Dynamically calculate scroll width based on the first card width + gap
      const firstCard = carouselRef.current.firstElementChild as HTMLElement;
      // Use clientWidth to ensure we scroll exactly one visible card width
      const cardWidth = firstCard ? firstCard.clientWidth : 350;
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollAmount = cardWidth + gap;
      
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // File Upload Handlers
  const handleFileSelect = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFiles = [...imageFiles];
      newFiles[index] = file;
      setImageFiles(newFiles);

      const reader = new FileReader();
      reader.onload = (ev) => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = ev.target?.result as string;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFiles = [...imageFiles];
    newFiles[index] = null;
    setImageFiles(newFiles);
    
    const newPreviews = [...imagePreviews];
    newPreviews[index] = null;
    setImagePreviews(newPreviews);
    
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = '';
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'postalCode') {
       // Allow visual typing but clean for processing
       const cleanValue = value.replace(/[^\d]/g, '').slice(0, 7);
       setFormData(prev => ({ ...prev, postalCode: cleanValue }));

       if (cleanValue.length === 7) {
         setIsSearchingAddress(true);
         try {
           // Using Zipcloud API which handles standard Japanese postal codes robustly
           const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanValue}`);
           const data = await response.json();
           
           if (data.status === 200 && data.results && data.results.length > 0) {
             const result = data.results[0];
             // Combine address1 (Pref), address2 (City), address3 (Town)
             const fullAddress = `${result.address1}${result.address2}${result.address3}`;
             setFormData(prev => ({
               ...prev,
               postalCode: cleanValue,
               address: fullAddress
             }));
           } else {
             console.log("No address found for this postal code");
           }
         } catch (error) {
           console.error("Address lookup failed", error);
         } finally {
           setIsSearchingAddress(false);
         }
       }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const isStep1Valid = formData.name.length > 0 && formData.phone.length > 9 && formData.email.includes('@');
  const isStep2Valid = formData.address.length > 0 && formData.roofColor.length > 0 && formData.wallColor.length > 0 && formData.features.length > 0;

  const nextStep = () => {
    playPopSound();
    if (formStep === 1 && isStep1Valid) {
       setFormStep(2);
       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (formStep === 2 && isStep2Valid) {
       setFormStep(3);
       document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(prev => prev - 1);
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playPopSound();

    // ---------------------------------------------------------
    // ⚠️ 設定: ここをご自身のIDに書き換えてください
    // ---------------------------------------------------------
    // EmailJSのダッシュボード (https://dashboard.emailjs.com/) で取得
    const SERVICE_ID = "YOUR_SERVICE_ID";   // 例: "service_xxxxxxx"
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // 例: "template_xxxxxxx"
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // 例: "user_xxxxxxx" (Account > API Keys)
    // ---------------------------------------------------------

    try {
      // テンプレート変数へのマッピング
      // EmailJSのテンプレート設定画面で、{{name}} や {{email}} などを設定してください
      const templateParams = {
        to_name: "ソトピカ管理者",
        from_name: formData.name,
        phone: formData.phone,
        email: formData.email,
        postal_code: formData.postalCode,
        address: formData.address,
        roof_color: formData.roofColor,
        wall_color: formData.wallColor,
        features: formData.features,
        areas: formData.areas.join(', '), // 配列を文字列に変換
        age: formData.age,
        message: formData.message,
        // ※無料プラン等では大容量の画像添付は難しいため、ここではテキスト情報のみ送信します
      };

      if (SERVICE_ID === "YOUR_SERVICE_ID") {
         // ID未設定時のデモ用挙動
         console.warn("EmailJSのIDが設定されていません。シミュレーションモードで実行します。");
         await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
         // 実際の送信処理
         await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      }

      // 送信成功
      setIsSubmitting(false);
      setShowThanksModal(true);
      
      // リセット
      setFormData({
        name: '', phone: '', email: '', postalCode: '', address: '',
        roofColor: '', wallColor: '', features: '',
        areas: [], age: '', message: ''
      });
      setImageFiles([null, null, null, null]);
      setImagePreviews([null, null, null, null]);
      setFormStep(1);

    } catch (error) {
      console.error('EmailJS Send Error:', error);
      setIsSubmitting(false);
      alert('申し訳ありません。送信に失敗しました。\n時間をおいて再度お試しいただくか、直接お電話にてお問い合わせください。');
    }
  };

  const getMeritIcon = (iconName: string) => {
    switch (iconName) {
      case "¥": return <Coins className="w-12 h-12" />;
      case "Clock": return <Timer className="w-12 h-12" />;
      case "Sparkle": return <SparkleIcon className="w-12 h-12" />;
      default: return null;
    }
  }

  return (
    <div className="font-sans text-gray-800 antialiased overflow-x-hidden w-full pb-16 md:pb-0">
      <ScrollProgressBar />
      <FloatingCTA />
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Thanks Modal */}
      {showThanksModal && <ThanksModal onClose={() => setShowThanksModal(false)} />}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
      
      {/* Header */}
      <header className="fixed w-full z-40 bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100 h-16 md:h-20 top-0">
        <Container className="h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-rounded font-extrabold text-xl md:text-2xl text-sotopika-navy tracking-tight">外壁洗浄専門店<br className="hidden"/> ソトピカ</span>
          </div>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#reasons" className="text-sotopika-navy font-bold hover:text-sotopika-yellow transition-colors">選ばれる理由</a>
            <a href="#flow" className="text-sotopika-navy font-bold hover:text-sotopika-yellow transition-colors">施工の流れ</a>
            <a href="#cases" className="text-sotopika-navy font-bold hover:text-sotopika-yellow transition-colors">施工事例</a>
            <a href="#faq" className="text-sotopika-navy font-bold hover:text-sotopika-yellow transition-colors">よくある質問</a>
            <CTAButton className="text-sm py-2 px-4 shadow-none">24時間無料オンライン見積もり</CTAButton>
          </nav>
          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 text-sotopika-navy"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-8 h-8" />
          </button>
        </Container>
      </header>

      {/* 1. First View (Hero) - [Restored] Full Background Style */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-24 relative overflow-hidden min-h-[550px] md:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
             src={CLEAN_HOUSE_BG} 
             alt="Beautiful Clean House" 
             width="1920"
             height="1080"
             fetchPriority="high"
             className="w-full h-full object-cover" 
           />
           <div className="absolute inset-0 bg-gradient-to-r from-sky-100/95 via-white/90 to-white/40 md:to-transparent"></div>
           <div className="absolute inset-0 bg-[radial-gradient(#FDB813_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.1]"></div>
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left z-10 w-full">
              <FadeIn>
                <h1 className="font-rounded font-extrabold text-sotopika-navy leading-tight mb-6 drop-shadow-sm">
                   <span className="block text-3xl md:text-6xl text-sotopika-yellow drop-shadow-md mb-2 text-shadow-white">
                     たった1日で
                   </span>
                   <span className="text-3xl md:text-5xl lg:text-6xl inline-block">
                     苔と黒ずみで<br/>
                     汚れた我が家を<br/>
                   </span>
                   <span className="relative inline-block mt-2">
                      <span className="text-5xl md:text-7xl text-sotopika-yellow drop-shadow-md z-10 relative font-black">ピカピカ</span>
                      <span className="text-3xl md:text-5xl lg:text-6xl text-sotopika-navy">に</span>
                      <SparkleIcon className="absolute -top-6 -right-8 w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" />
                   </span>
                </h1>

                {/* Redesigned Text Block: Marker Highlight Style */}
                <div className="mb-8 relative inline-block">
                    <p className="text-lg md:text-2xl text-sotopika-navy font-bold leading-relaxed">
                        <span className="relative inline-block px-1 mx-1">
                            <span className="absolute inset-0 bg-yellow-300 -skew-x-12 opacity-60 rounded-sm"></span>
                            <span className="relative z-10 font-black">塗装工事の半分以下の費用</span>
                        </span>
                        で<br/>
                        <span className="font-bold">新築時の輝きを取り戻せます。</span>
                    </p>
                </div>

                {/* Benefits Badges - Fixed & Optimized Size */}
                <div className="flex flex-nowrap justify-center items-center gap-1 md:gap-6 mb-8 md:mb-10 w-full px-0">
                    <BenefitBadge sub="外壁一面" title="1万円〜" />
                    <BenefitBadge sub="安心の" title="90日間保証" />
                    <BenefitBadge sub="まずは" title="無料お試し" />
                </div>

                <div className="max-w-md mx-auto md:mx-0 relative mt-4 md:mt-0">
                  <CTAButton fullWidth animated>
                    <CTAText />
                  </CTAButton>
                </div>
              </FadeIn>
            </div>

            {/* Right Content */}
            <div className="flex-1 relative w-full max-w-lg mx-auto md:max-w-none flex flex-col items-center md:items-end justify-center">
              <FadeIn delay={200} className="relative z-10 text-right w-full">
                   <div className="relative flex flex-col items-center md:items-end">
                      <div className="text-sotopika-navy font-bold text-base md:text-3xl tracking-widest text-center md:text-right bg-white/90 inline-block px-4 md:px-6 py-1 rounded-full backdrop-blur-sm mb-4 shadow-sm whitespace-nowrap">
                        外壁洗浄専門店
                      </div>
                      <div className="text-[13vw] md:text-8xl lg:text-9xl font-rounded font-extrabold text-sotopika-navy leading-none tracking-tighter drop-shadow-xl text-center md:text-right whitespace-nowrap">
                        ソトピカ
                      </div>
                   </div>
                   
                   <div className="flex justify-center md:justify-end -mt-4 md:mt-4">
                     <img 
                       src={SOTOPIKA_CHAR} 
                       alt="ソトピカくん" 
                       width="400"
                       height="400"
                       className="w-32 h-32 md:w-64 md:h-64 object-contain z-20 drop-shadow-2xl animate-bounce-slight" 
                     />
                   </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Empathy - Redesigned for better storytelling */}
      <Section variant="pale" waveBottom className="bg-gradient-to-b from-gray-50 to-blue-50 overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* 導入部 */}
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-3xl font-rounded font-extrabold text-gray-700 leading-relaxed">
                外から見た自分の家。<br/>
                <span className="relative inline-block">
                  <span className="relative z-10">「前より汚れてきたな…」</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-gray-200 -z-10 transform -rotate-1"></span>
                </span>
                <br className="md:hidden"/>と感じたことはありませんか？
              </h2>
            </div>

            {/* 悩み - 3つの吹き出し（思考の雲） + 悩む人イラスト + 背景のモヤ */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto mb-20 relative z-10 px-4 items-end">
               {/* 背景装飾 */}
               <div className="absolute inset-0 -z-10 opacity-30 transform scale-110">
                  <img 
                    src={DIRTY_WALL_BG} 
                    className="w-full h-full object-contain mix-blend-multiply blur-xl"
                    alt="" 
                  />
               </div>

               {/* 悩み1 */}
               <FadeIn delay={100} className="flex flex-col items-center group relative">
                  {/* Thought Bubble - [PRO] Unified Shadow via filter */}
                  <div className="relative w-full filter drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1 z-20">
                     {/* Reduced Padding: p-3 md:p-5 */}
                     <div className="bg-white p-3 md:p-5 rounded-[2rem] text-center border-2 border-transparent group-hover:border-sotopika-yellow transition-colors duration-300 relative z-10">
                        {/* [PRO] Applied font-handwritten (Zen Kurenaido) for emotional connection */}
                        <p className="font-handwritten font-bold text-gray-700 text-xl md:text-2xl leading-relaxed tracking-wide">
                          塗装を勧められたけど、<br/>
                          <span className="text-red-500 font-extrabold bg-red-50 px-1">100万円は高すぎる…</span>
                        </p>
                     </div>
                     {/* Connecting Dots (No individual shadow, relies on parent filter) */}
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10"></div>
                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full z-10"></div>
                  </div>
                  
                  {/* Character & Background Blob [PRO] Animated Morphing Blob */}
                  <div className="relative mt-8 w-40 h-40 md:w-56 md:h-56">
                     <div className="absolute inset-0 bg-gray-200 animate-morph opacity-60 blur-sm group-hover:bg-yellow-100 transition-colors duration-300" style={{ animationDelay: '0s' }}></div>
                     <img src="https://placehold.co/400x400/ffedd5/9a3412?text=Worried+Woman+1" alt="悩む女性イラスト" className="w-full h-full object-contain relative z-10 filter drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
               </FadeIn>

               {/* 悩み2 */}
               <FadeIn delay={200} className="flex flex-col items-center group relative">
                  {/* Thought Bubble - [PRO] Unified Shadow via filter */}
                  <div className="relative w-full filter drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1 z-20">
                     {/* Reduced Padding: p-3 md:p-5 */}
                     <div className="bg-white p-3 md:p-5 rounded-[2rem] text-center border-2 border-transparent group-hover:border-sotopika-yellow transition-colors duration-300 relative z-10">
                        {/* [PRO] Applied font-handwritten */}
                        <p className="font-handwritten font-bold text-gray-700 text-xl md:text-2xl leading-relaxed tracking-wide">
                          自分で高圧洗浄したら、<br/>
                          <span className="text-red-500 font-extrabold bg-red-50 px-1">壁を傷めそうで怖い…</span>
                        </p>
                     </div>
                     {/* Connecting Dots */}
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10"></div>
                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full z-10"></div>
                  </div>
                  
                  {/* Character & Background Blob [PRO] Animated Morphing Blob */}
                  <div className="relative mt-8 w-40 h-40 md:w-56 md:h-56">
                     <div className="absolute inset-0 bg-blue-100 animate-morph opacity-60 blur-sm group-hover:bg-yellow-100 transition-colors duration-300" style={{ animationDelay: '-2s' }}></div>
                     <img src="https://placehold.co/400x400/dbeafe/1e40af?text=Worried+Woman+2" alt="悩む女性イラスト" className="w-full h-full object-contain relative z-10 filter drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
               </FadeIn>

               {/* 悩み3 */}
               <FadeIn delay={300} className="flex flex-col items-center group relative">
                  {/* Thought Bubble - [PRO] Unified Shadow via filter */}
                  <div className="relative w-full filter drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1 z-20">
                     {/* Reduced Padding: p-3 md:p-5 */}
                     <div className="bg-white p-3 md:p-5 rounded-[2rem] text-center border-2 border-transparent group-hover:border-sotopika-yellow transition-colors duration-300 relative z-10">
                        {/* [PRO] Applied font-handwritten */}
                        <p className="font-handwritten font-bold text-gray-700 text-xl md:text-2xl leading-relaxed tracking-wide">
                          苔と黒ずみが目立ってきて<br/>
                          <span className="text-red-500 font-extrabold bg-red-50 px-1">恥ずかしい…</span>
                        </p>
                     </div>
                     {/* Connecting Dots */}
                     <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full z-10"></div>
                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full z-10"></div>
                  </div>
                  
                  {/* Character & Background Blob [PRO] Animated Morphing Blob */}
                  <div className="relative mt-8 w-40 h-40 md:w-56 md:h-56">
                     <div className="absolute inset-0 bg-purple-100 animate-morph opacity-60 blur-sm group-hover:bg-yellow-100 transition-colors duration-300" style={{ animationDelay: '-4s' }}></div>
                     <img src="https://placehold.co/400x400/fce7f3/9d174d?text=Worried+Woman+3" alt="悩む女性イラスト" className="w-full h-full object-contain relative z-10 filter drop-shadow-lg transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
               </FadeIn>
            </div>

            {/* 解決の提案 - [POINT 3] Bright Redesign & New Text */}
            <FadeIn delay={500}>
              <div className="bg-white border-4 border-sotopika-yellow rounded-3xl p-6 md:p-10 text-center relative overflow-hidden shadow-2xl mx-auto max-w-4xl transform hover:scale-[1.02] transition-transform duration-300">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[radial-gradient(#FDB813_2px,transparent_2px)] [background-size:20px_20px]"></div>
                  
                  <div className="relative z-10">
                     <div className="inline-block bg-sotopika-yellow text-sotopika-navy font-extrabold px-4 md:px-6 py-2 rounded-full mb-6 animate-bounce-slight shadow-lg transform -rotate-1 text-base md:text-xl">
                        そのお悩み ソトピカが解決します！
                     </div>
                     <h3 className="text-lg md:text-3xl font-rounded font-bold leading-relaxed mb-4 text-sotopika-navy">
                        「塗装をしないで外壁を綺麗にする方法」として<br/>
                        <span className="text-xl md:text-4xl block mt-4 font-extrabold text-sotopika-navy">外壁洗浄が選ばれています</span>
                     </h3>
                  </div>
                  
                  {/* 装飾: キラキラアイコン (Changed to match bright theme) */}
                   <div className="absolute -bottom-6 -right-6 opacity-20 rotate-12">
                      <SparkleIcon className="w-24 h-24 md:w-40 md:h-40 text-sotopika-yellow" />
                   </div>
                   <div className="absolute -top-6 -left-6 opacity-20 -rotate-12">
                      <SparkleIcon className="w-20 h-20 md:w-32 md:h-32 text-sotopika-navy" />
                   </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* 3. Problem & Solution */}
      <Section variant="white" id="problem">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Problem */}
            <FadeIn className="h-full">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-6 md:p-8 h-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Trash2 className="w-32 h-32" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
                  <br/>その汚れ、実は…
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                  外壁の汚れの多くは、素材の劣化ではなく表面のカビや苔といった付着物です。これらは表面を水で流すだけでは根っこが残り、すぐに復活してしまいます。
                </p>
                {/* Updated Problem Images: Dual Images (Moss & Stains) */}
                <div className="grid grid-cols-2 gap-3 md:gap-4 mt-auto">
                  <div className="relative group/img">
                    <div className="overflow-hidden rounded-xl h-24 md:h-32 border border-gray-200">
                      <img 
                        src={MOSS_IMG} 
                        alt="苔汚れ" 
                        width="400"
                        height="300"
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover/img:scale-110 transition-transform duration-500" 
                      />
                    </div>
                    <p className="text-center text-xs font-bold text-gray-500 mt-2">苔（コケ）</p>
                  </div>
                  <div className="relative group/img">
                     <div className="overflow-hidden rounded-xl h-24 md:h-32 border border-gray-200">
                       <img 
                         src={STAIN_IMG} 
                         alt="黒ずみ" 
                         width="400"
                         height="300"
                         loading="lazy"
                         className="w-full h-full object-cover transform group-hover/img:scale-110 transition-transform duration-500" 
                       />
                     </div>
                     <p className="text-center text-xs font-bold text-gray-500 mt-2">雨だれ・黒ずみ</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Arrow Divider for Mobile */}
            <div className="md:hidden flex justify-center -my-4 z-10">
              <ArrowDown className="w-12 h-12 text-sotopika-navy bg-white rounded-full p-2 shadow-lg" />
            </div>

            {/* Solution */}
            <FadeIn delay={200} className="h-full">
              <div className="bg-sotopika-navy text-white rounded-3xl p-6 md:p-8 h-full relative overflow-hidden shadow-xl ring-4 ring-sotopika-yellow/30">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <SparkleIcon className="w-32 h-32 text-yellow-300" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <br/>ソトピカの解決策
                </h3>
                <p className="text-sm md:text-base text-blue-100 leading-relaxed mb-4">
                  ソトピカは、素材に合わせて汚れを分解するようプロが選定した最適な洗剤と、菌を根絶させるバイオ洗浄を採用。高額な塗装ではなく、外壁洗浄で本来の輝きを取り戻します。
                </p>
                <div className="w-full h-24 md:h-32 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 mt-auto">
                   <span className="text-white font-bold flex items-center gap-2"><SparkleIcon className="text-yellow-400"/> 菌を根絶！</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* 4. Comparison Table - [PRO] Redesigned for Winner Effect */}
      <Section variant="pale">
        <Container>
          <Heading center>塗装工事との比較</Heading>
          <div className="overflow-visible max-w-4xl mx-auto pt-8 pb-4">
             {/* Header Row - Mobile Optimized Grid */}
            <div className="grid grid-cols-[0.8fr_1.3fr_1fr] md:grid-cols-3 items-end mb-2 text-center text-xs md:text-lg font-bold relative z-20">
               <div className="pb-3 text-sotopika-navy opacity-50"></div>
               {/* Popped Up Header */}
               <div className="bg-sotopika-yellow text-sotopika-navy rounded-t-xl py-3 md:py-4 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-20 scale-105 origin-bottom relative border-t border-x border-white/50">
                 <span className="text-sm md:text-xl block font-black">外壁洗浄</span>
                 <span className="text-[10px] md:text-sm block">（ソトピカ）</span>
                 {/* Winner Crown */}
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap animate-bounce-slight">
                   圧倒的コスパ
                 </div>
               </div>
               <div className="pb-3 text-black font-black text-sm md:text-lg">塗装工事</div>
            </div>

            <div className="relative">
               {/* [PRO] Highlight Column Background Layer - Creates the 'Winner' card effect */}
               <div className="absolute top-0 bottom-0 left-[27.6%] right-[32%] bg-white rounded-b-xl shadow-[0_10px_30px_rgba(253,184,19,0.3)] z-0 scale-[1.05] border-x-4 border-b-4 border-sotopika-yellow transform origin-top"></div>

               <div className="bg-white/50 rounded-b-3xl rounded-tl-3xl shadow-sm overflow-hidden border-t-0 z-10 relative">
                 <div className="divide-y divide-gray-200 text-xs md:text-base relative z-20">
                  {[
                    { label: "費用\n(戸建て平均)", pika: "4〜25万円", pikaSub: "塗装の半分以下", paint: "80〜120万円" },
                    { label: "工期", pika: "数時間〜1日", pikaSub: "", paint: "2〜3週間" },
                    { label: "負担", pika: "足場なし。\n生活はそのまま", pikaSub: "", paint: "足場設置で大掛かり" },
                    { label: "即効性", pika: "その日のうちに\nピカピカ", pikaSub: "", paint: "完了まで長期間の我慢" },
                  ].map((row, i) => (
                    <FadeIn key={i} delay={i * 100}>
                      <div className="grid grid-cols-[0.8fr_1.3fr_1fr] md:grid-cols-3 items-center text-center py-5 md:py-7">
                        <div className="font-bold text-gray-600 px-1 md:px-2 whitespace-pre-wrap">{row.label}</div>
                        {/* Winner Cell */}
                        <div className="font-black text-sotopika-navy flex flex-col justify-center px-1 md:px-2 relative">
                          <span className="text-base md:text-2xl text-sotopika-navy">{row.pika}</span>
                          {row.pikaSub && <span className="text-[10px] md:text-xs text-red-500 font-bold block mt-1 bg-red-100/50 rounded px-1 mx-auto">{row.pikaSub}</span>}
                        </div>
                        <div className="text-black font-bold px-1 md:px-2 whitespace-pre-wrap">{row.paint}</div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Reasons - Updated with Trust Visuals (Staff) */}
      <Section variant="white" id="reasons" waveTop>
        <Container>
          <Heading center>ソトピカを選ぶ理由</Heading>
          <p className="text-center mb-12 text-sm md:text-base text-gray-600 font-bold">外壁洗浄の専門店だからこそ、確かな判断と技術で施工します。</p>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {REASONS.map((reason, i) => (
              <FadeIn key={i} delay={i * 100} className="h-full">
                <div className="flex gap-4 p-5 md:p-6 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-shadow h-full relative overflow-hidden">
                  <div className="shrink-0 w-12 h-12 md:w-16 md:h-16 bg-sotopika-navy rounded-full flex items-center justify-center shadow-lg z-10">
                    <span className="scale-75 md:scale-100 flex items-center justify-center">{reason.icon}</span>
                  </div>
                  <div className="z-10 flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-sotopika-navy mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
                  </div>
                  
                  {/* Trust Visual Enhancement for Staff Item */}
                  {i === 3 && (
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-md opacity-20 group-hover:opacity-100 transition-opacity">
                      <img 
                        src={STAFF_IMAGE} 
                        alt="Staff" 
                        width="150"
                        height="150"
                        loading="lazy"
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6. Merits & Areas - Redesigned (Icon Ring / Stamp Style) */}
      <Section variant="pale" waveBottom>
        <Container>
          <Heading center>ソトピカ３つのPOINT</Heading>
          
          {/* Merits - New Clean Icon Ring Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 md:mb-20 max-w-5xl mx-auto">
            {MERITS.map((merit, i) => (
              <FadeIn key={i} delay={i * 150} className="flex flex-col items-center">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-white border-8 border-sotopika-navy flex flex-col items-center justify-center text-center shadow-xl relative group hover:-translate-y-2 transition-transform duration-300 overflow-hidden">
                   {/* Background Icon Opacity */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none text-sotopika-yellow scale-75 md:scale-100">
                      {getMeritIcon(merit.icon)}
                   </div>
                   
                   <div className="text-sotopika-navy font-black text-2xl md:text-4xl mb-3 drop-shadow-sm z-10 relative">
                     {merit.title}
                     <div className="absolute -bottom-1 left-0 w-full h-1 bg-sotopika-yellow rounded-full"></div>
                   </div>
                   <p className="text-xs md:text-sm font-bold text-gray-700 whitespace-pre-line leading-tight z-10">{merit.sub}</p>
                   
                   {/* Number Badge */}
                   <div className="absolute top-0 right-0 bg-sotopika-yellow text-sotopika-navy w-10 h-10 md:w-12 md:h-12 rounded-bl-full flex items-start justify-end pr-2 pt-2 font-black text-base md:text-lg shadow-sm z-20">
                     {i + 1}
                   </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Areas Visualization - [POINT 3] Percentage-based positioning */}
          <FadeIn delay={300}>
            <div className="bg-white rounded-3xl p-6 md:p-12 shadow-inner border border-gray-200">
               <h3 className="text-xl md:text-2xl font-bold text-center text-sotopika-navy mb-8">対応箇所</h3>
               <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="w-full md:w-1/2 relative min-h-[250px] md:min-h-[300px] flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 overflow-hidden">
                    <Home className="w-32 h-32 md:w-48 md:h-48 text-sotopika-navy opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs md:text-sm text-gray-400">（家のイラストで施工可能箇所を説明）</span>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2">
                    <ul className="grid grid-cols-2 gap-2 md:gap-3">
                       {FORM_AREAS.map((area, i) => (
                         <li key={i} className="flex items-center gap-2 text-gray-700 font-bold bg-blue-50 p-2 rounded-lg">
                           <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-sotopika-navy shrink-0" />
                           <span className="text-xs md:text-sm">{area}</span>
                         </li>
                       ))}
                    </ul>
                  </div>
               </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
      
      {/* 7. Buildings & Areas List */}
      <Section variant="white">
        <Container>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeIn className="bg-blue-50 rounded-2xl p-6 md:p-8">
              <h3 className="font-bold text-lg md:text-xl text-sotopika-navy mb-4 border-b-2 border-sotopika-navy/20 pb-2">対応建物</h3>
              <div className="flex flex-wrap gap-2">
                {["戸建て", "アパート", "マンション", "店舗", "施設", "クリニック"].map((item, i) => (
                   <span key={i} className="bg-white text-sotopika-navy text-sm font-bold px-3 py-2 md:px-4 rounded-full shadow-sm border border-blue-100">{item}</span>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={200} className="bg-yellow-50 rounded-2xl p-6 md:p-8">
              <h3 className="font-bold text-lg md:text-xl text-sotopika-navy mb-4 border-b-2 border-sotopika-yellow/50 pb-2">対応エリア</h3>
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2">
                   <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                   <span className="font-bold text-base md:text-lg text-gray-700">神奈川・東京・千葉・埼玉・茨城</span>
                 </div>
                 <p className="text-xs md:text-sm text-gray-500 pl-8">※一部離島などを除く。詳細はお問い合わせください。</p>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* 8. Flow */}
      <Section variant="pale" id="flow" waveTop>
        <Container>
          <Heading center>施工の流れ</Heading>
          <div className="flex flex-col md:flex-row gap-4 relative justify-between max-w-5xl mx-auto">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-200 z-0"></div>
            
            {FLOW_STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 100} className="relative z-10 flex-1 flex flex-col items-center">
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-sotopika-navy text-white flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg mb-4 border-4 border-white">
                   {i + 1}
                 </div>
                 <h4 className="font-bold text-center text-gray-800 text-sm md:text-base bg-white md:bg-transparent p-3 md:p-0 rounded-lg shadow-sm md:shadow-none w-full md:w-auto border md:border-none border-gray-100">
                   {step}
                 </h4>
                 {i < FLOW_STEPS.length - 1 && (
                   <div className="md:hidden h-6 w-1 bg-gray-200 my-1"></div>
                 )}
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* 9. Demo Campaign */}
      <Section variant="yellow" className="text-center overflow-hidden">
        <Container className="relative z-10">
           <FadeIn>
             <div className="inline-block bg-white text-sotopika-navy px-4 py-1 rounded-full font-bold mb-4 shadow-lg animate-bounce text-sm md:text-base">
                今だけの特別オファー
             </div>
             <h2 className="text-2xl md:text-5xl font-rounded font-extrabold text-sotopika-navy mb-6 drop-shadow-sm">
               無料お試し洗浄実施中
             </h2>
             <p className="text-base md:text-xl font-bold text-sotopika-navy mb-8 max-w-2xl mx-auto leading-relaxed">
               「どのくらい綺麗になるの？」という方へ。<br/>
               ご希望箇所の一部分を無料でテスト洗浄いたします。<br/>
               <span className="text-xs md:text-sm mt-2 block font-normal opacity-90">実際の効果を見てから、じっくりご検討ください。期待する効果が見られない場合はお断りいただいて全く問題ございません。</span>
             </p>
             <CTAButton className="bg-white text-sotopika-navy hover:bg-gray-100 shadow-xl border-2 border-sotopika-navy">
                <span className="text-lg md:text-2xl font-extrabold">申し込む</span>
             </CTAButton>
           </FadeIn>
        </Container>
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay"></div>
           <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full mix-blend-overlay"></div>
        </div>
      </Section>

      {/* 10. Testimonials - Carousel [POINT 3] Split Before/After View */}
      <Section variant="white" id="cases" waveBottom>
        <Container>
           <Heading center>施工事例・お客様の声</Heading>
           
           <div className="relative group">
             {/* Navigation Buttons */}
             <button 
               onClick={() => scrollCarousel('left')}
               className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-sotopika-navy hover:scale-110 transition-transform hidden md:flex"
             >
               <ChevronLeft />
             </button>
             <button 
               onClick={() => scrollCarousel('right')}
               className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-sotopika-navy hover:scale-110 transition-transform hidden md:flex"
             >
               <ChevronRight />
             </button>

             {/* Cards Container */}
             <div 
               ref={carouselRef}
               className="flex overflow-x-auto gap-4 md:gap-6 pb-8 px-2 md:px-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
             >
               {TESTIMONIALS.map((item) => (
                 <div key={item.id} className="min-w-[280px] md:min-w-[400px] snap-center bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
                    {/* [POINT 3] Split Before / After Images */}
                    <div className="relative h-40 md:h-48 flex">
                       <div className="w-1/2 relative border-r-2 border-white">
                          <img 
                            src={item.beforeImage} 
                            alt="Before" 
                            width="200"
                            height="192"
                            loading="lazy"
                            className="w-full h-full object-cover grayscale-[30%]" 
                          />
                          <div className="absolute top-2 left-2 bg-gray-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow backdrop-blur-sm">
                            Before
                          </div>
                       </div>
                       <div className="w-1/2 relative">
                          <img 
                            src={item.afterImage} 
                            alt="After" 
                            width="200"
                            height="192"
                            loading="lazy"
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute top-2 left-2 bg-sotopika-navy/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow backdrop-blur-sm">
                            After
                          </div>
                       </div>
                       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-[10px] md:text-xs font-bold px-3 py-1 rounded-full shadow text-sotopika-navy whitespace-nowrap border border-gray-100">
                         {item.location}
                       </div>
                    </div>
                    
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                       <div className="flex gap-1 mb-2 md:mb-3">
                         {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />)}
                       </div>
                       <p className="text-sm md:text-base text-gray-700 font-bold mb-4 leading-relaxed flex-1">"{item.text}"</p>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        </Container>
      </Section>

      {/* 11. Guarantee */}
      <Section variant="gold">
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border-4 border-double border-sotopika-gold text-center">
            <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-l-4 border-sotopika-gold rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-r-4 border-sotopika-gold rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-l-4 border-sotopika-gold rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-r-4 border-sotopika-gold rounded-br-xl"></div>
            
            <Crown className="w-12 h-12 md:w-16 md:h-16 text-sotopika-gold mx-auto mb-4" />
            <h2 className="text-xl md:text-4xl font-rounded font-extrabold text-sotopika-navy mb-6">
              90日間再洗浄保証
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
              施工後も安心していただくために、「90日間の再洗浄保証」を完備。<br/>
              万が一、施工後に汚れの再発や残りが確認された場合は、迅速に無料で再洗浄いたします。
            </p>
            
            <div className="mt-8">
               <div className="inline-block border-2 border-sotopika-gold px-4 py-2 md:px-8 text-xs md:text-base text-sotopika-gold font-serif font-bold tracking-widest">
                 CERTIFICATE OF GUARANTEE
               </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 12. FAQ */}
      <Section variant="pale" id="faq">
        <Container>
          <Heading center>よくある質問</Heading>
          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {FAQS.map((faq, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <button 
                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-800 flex items-start md:items-center gap-3 md:gap-4 text-sm md:text-base">
                      <span className="text-sotopika-yellow font-black text-lg md:text-xl shrink-0">Q.</span>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ml-2 ${activeFAQ === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden bg-gray-50 ${activeFAQ === i ? 'max-h-48' : 'max-h-0'}`}
                  >
                    <div className="p-4 md:p-6 pt-0 text-sm md:text-base text-gray-600 font-medium leading-relaxed border-t border-gray-100 mt-2 pt-4 flex">
                       <span className="text-sotopika-navy font-black text-lg md:text-xl mr-2 md:mr-3 shrink-0">A.</span>
                       {faq.answer}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* 13. Closing & Form (Optimized with EFO Steps - [POINT 2]) */}
      <Section variant="navy" id="contact" waveTop>
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <h2 className="text-xl md:text-4xl font-rounded font-extrabold mb-6">
              まずは無料でお見積もり
            </h2>
            <p className="text-sm md:text-base text-blue-100 leading-relaxed mb-8">
              汚れは放っておくと外壁自体を傷める原因になります。<br/>
              塗装が必要になる前に、まずはプロの洗浄で本来の輝きを取り戻しませんか？<br/><br/>
              現地への訪問・立ち会いは不要です。<br/>
              お問い合わせフォームでいただいた内容からGoogleマップでお家の大きさや状況を拝見し、<br/>
              プロが最適な洗浄プランと概算見積もりを算出いたします。
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-4 md:p-10 shadow-2xl text-gray-800 relative">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-sotopika-yellow to-yellow-300"></div>

             {/* Step Progress Indicator */}
             <div className="mb-6 md:mb-8 mt-2">
                <div className="flex items-center justify-between relative z-10 px-2">
                   <div className={`flex flex-col items-center ${formStep >= 1 ? 'text-sotopika-navy' : 'text-gray-300'}`}>
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold mb-1 transition-colors text-xs md:text-base ${formStep >= 1 ? 'bg-sotopika-navy text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                      <span className="text-[10px] md:text-xs font-bold">お客様情報</span>
                   </div>
                   <div className={`flex flex-col items-center ${formStep >= 2 ? 'text-sotopika-navy' : 'text-gray-300'}`}>
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold mb-1 transition-colors text-xs md:text-base ${formStep >= 2 ? 'bg-sotopika-navy text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                      <span className="text-[10px] md:text-xs font-bold">建物情報</span>
                   </div>
                   <div className={`flex flex-col items-center ${formStep >= 3 ? 'text-sotopika-navy' : 'text-gray-300'}`}>
                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold mb-1 transition-colors text-xs md:text-base ${formStep >= 3 ? 'bg-sotopika-navy text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                      <span className="text-[10px] md:text-xs font-bold">ご希望内容</span>
                   </div>
                </div>
                {/* Progress Bar Background */}
                <div className="absolute left-6 right-6 md:left-10 md:right-10 top-5 md:top-6 h-0.5 bg-gray-200 -mt-2 z-0">
                   <div className="h-full bg-sotopika-yellow transition-all duration-300" style={{ width: formStep === 1 ? '0%' : formStep === 2 ? '50%' : '100%' }}></div>
                </div>
             </div>

             <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                
                {/* Step 1: Customer Info */}
                {formStep === 1 && (
                  <div className="animate-fade-in-up">
                    <div className="bg-blue-50/50 p-4 md:p-6 rounded-2xl border border-blue-100">
                      <h3 className="font-bold text-lg md:text-xl text-sotopika-navy mb-4 md:mb-6 border-b border-blue-200 pb-3">お客様情報</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                          <div className="space-y-2">
                            <label className="font-bold text-sm text-gray-600 flex items-center gap-1">
                              お名前 <span className="text-red-500 bg-red-50 text-xs px-2 py-0.5 rounded">必須</span>
                            </label>
                            <div className="relative">
                                {/* [Smartphone Optimization] text-base to prevent zoom */}
                                <input 
                                  required 
                                  type="text" 
                                  name="name"
                                  autoComplete="name" 
                                  value={formData.name}
                                  onChange={handleChange}
                                  placeholder="山田 太郎"
                                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sotopika-yellow focus:border-transparent outline-none transition-all"
                                />
                                <ValidCheck isValid={formData.name.length > 0} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="font-bold text-sm text-gray-600 flex items-center gap-1">
                              電話番号 <span className="text-red-500 bg-red-50 text-xs px-2 py-0.5 rounded">必須</span>
                            </label>
                            <div className="relative">
                                {/* [EFO] inputMode="numeric" for mobile keypad, text-base */}
                                <input 
                                  required 
                                  type="tel" 
                                  name="phone"
                                  autoComplete="tel"
                                  inputMode="numeric"
                                  value={formData.phone}
                                  onChange={handleChange}
                                  placeholder="090-1234-5678"
                                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sotopika-yellow focus:border-transparent outline-none transition-all"
                                />
                                <ValidCheck isValid={formData.phone.length > 9} />
                            </div>
                          </div>
                      </div>

                      <div className="space-y-2 mb-4 md:mb-6">
                          <label className="font-bold text-sm text-gray-600 flex items-center gap-1">
                            メールアドレス <span className="text-red-500 bg-red-50 text-xs px-2 py-0.5 rounded">必須</span>
                          </label>
                          <div className="relative">
                            <input 
                              required 
                              type="email" 
                              name="email"
                              autoComplete="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="example@email.com"
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sotopika-yellow focus:border-transparent outline-none transition-all"
                            />
                            <ValidCheck isValid={formData.email.includes('@')} />
                          </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                       <CTAButton onClick={nextStep} disabled={!isStep1Valid} fullWidth className="max-w-md">
                         次へ進む
                       </CTAButton>
                    </div>
                  </div>
                )}

                {/* Step 2: Building Info */}
                {formStep === 2 && (
                  <div className="animate-fade-in-up">
                    <div className="bg-blue-50/50 p-4 md:p-6 rounded-2xl border border-blue-100">
                      <div className="flex items-center justify-between mb-4 md:mb-6 border-b border-blue-200 pb-3">
                        <h3 className="font-bold text-lg md:text-xl text-sotopika-navy">建物情報</h3>
                        <span className="text-[10px] md:text-xs text-gray-500 hidden md:block">※Googleマップでお家の形状を確認いたします</span>
                      </div>

                      {/* Postal Code & Auto Address */}
                      <div className="grid md:grid-cols-3 gap-4 mb-4 md:mb-6">
                          <div className="md:col-span-1 space-y-2">
                            <label className="font-bold text-xs text-gray-600">郵便番号</label>
                            <div className="relative">
                                {/* [EFO] inputMode="numeric", text-base */}
                                <input 
                                  type="text" 
                                  name="postalCode"
                                  autoComplete="postal-code"
                                  inputMode="numeric"
                                  value={formData.postalCode}
                                  onChange={handleChange}
                                  placeholder="1234567"
                                  maxLength={7}
                                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sotopika-yellow outline-none"
                                />
                                {isSearchingAddress && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin">
                                    <Search className="w-4 h-4 text-gray-400" />
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="font-bold text-xs text-gray-600 flex items-center gap-1">
                              ご住所 <span className="text-red-500 bg-red-50 text-xs px-2 py-0.5 rounded">必須</span>
                            </label>
                            <input 
                              required 
                              type="text" 
                              name="address"
                              autoComplete="street-address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder="東京都渋谷区..."
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sotopika-yellow outline-none"
                            />
                          </div>
                      </div>

                      {/* Building Details */}
                      <div className="space-y-4">
                          <label className="font-bold text-sm text-gray-600 block">
                            建物の特定に役立つ情報 <span className="text-red-500 bg-red-50 text-xs px-2 py-0.5 rounded ml-1">必須</span>
                          </label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <input 
                                required
                                type="text" 
                                name="roofColor" 
                                value={formData.roofColor}
                                onChange={handleChange}
                                placeholder="屋根の色（例：黒、オレンジ）"
                                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                            />
                            <input 
                                required
                                type="text" 
                                name="wallColor" 
                                value={formData.wallColor}
                                onChange={handleChange}
                                placeholder="外壁の色（例：白、ベージュ）"
                                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-base"
                            />
                          </div>
                          <textarea 
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            placeholder="外観の特徴（例：玄関に赤いポストがある、角から2軒目の家など）"
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base h-20 resize-none"
                          ></textarea>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between gap-4">
                       <button type="button" onClick={prevStep} className="px-6 py-3 font-bold text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center">
                         <ArrowLeft className="w-4 h-4 mr-2" /> 戻る
                       </button>
                       <CTAButton onClick={nextStep} disabled={!isStep2Valid} fullWidth className="max-w-sm">
                         次へ進む
                       </CTAButton>
                    </div>
                  </div>
                )}

                {/* Step 3: Request Details */}
                {formStep === 3 && (
                  <div className="animate-fade-in-up">
                    <div className="bg-blue-50/50 p-4 md:p-6 rounded-2xl border border-blue-100">
                      <h3 className="font-bold text-lg md:text-xl text-sotopika-navy mb-4 md:mb-6 border-b border-blue-200 pb-3">ご希望内容</h3>

                      <div className="space-y-4 mb-6">
                          <label className="font-bold text-sm text-gray-600 block">洗浄希望箇所（複数選択可）</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {FORM_AREAS.map((area) => (
                              <label key={area} className={`
                                flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all select-none
                                ${formData.areas.includes(area) 
                                  ? 'bg-sotopika-navy text-white border-sotopika-navy shadow-md' 
                                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}
                              `}>
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.areas.includes(area) ? 'bg-white border-white' : 'border-gray-400'}`}>
                                    {formData.areas.includes(area) && <Check className="w-3 h-3 text-sotopika-navy" />}
                                  </div>
                                  <input type="checkbox" className="hidden" checked={formData.areas.includes(area)} onChange={() => toggleArea(area)} />
                                  <span className="text-xs md:text-sm font-bold">{area}</span>
                              </label>
                            ))}
                          </div>
                      </div>

                      <div className="space-y-2 mb-6">
                          <label className="font-bold text-sm text-gray-600 block">築年数</label>
                          <select 
                            name="age" 
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-sotopika-yellow outline-none cursor-pointer"
                          >
                            <option value="">選択してください</option>
                            {FORM_AGES.map(age => <option key={age} value={age}>{age}</option>)}
                          </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2 mb-6">
                          <label className="font-bold text-sm text-gray-600 block">ご相談内容</label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 h-32 text-base focus:ring-2 focus:ring-sotopika-yellow outline-none resize-none"
                            placeholder="気になる汚れの状態や、ご希望の日程などご自由にご記入ください。"
                          ></textarea>
                      </div>

                      {/* Image Upload (Optional) */}
                      <div className="space-y-4">
                          <label className="font-bold text-sm text-gray-600 block">
                            洗浄希望箇所の写真（任意）
                            <span className="ml-2 text-[10px] md:text-xs font-normal text-gray-500">※より正確な概算見積もりが欲しい方向け</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {imagePreviews.map((preview, i) => (
                              <div key={i} className="relative aspect-square">
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    ref={el => { fileInputRefs.current[i] = el; }}
                                    onChange={(e) => handleFileChange(i, e)}
                                  />
                                  {preview ? (
                                    <div className="w-full h-full relative rounded-xl overflow-hidden group border border-gray-200">
                                      <img src={preview} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                      <button 
                                        type="button" 
                                        onClick={(e) => removeImage(i, e)}
                                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button 
                                      type="button"
                                      onClick={() => handleFileSelect(i)}
                                      className="w-full h-full flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 transition-colors text-gray-400"
                                    >
                                      <Camera className="w-6 h-6 mb-1" />
                                      <span className="text-xs">追加</span>
                                    </button>
                                  )}
                              </div>
                            ))}
                          </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <button type="button" onClick={prevStep} className="px-6 py-3 font-bold text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center order-2 md:order-1">
                          <ArrowLeft className="w-4 h-4 mr-2" /> 戻る
                        </button>
                        <div className="w-full md:w-auto flex-1 text-center order-1 md:order-2">
                           <CTAButton fullWidth className="py-4 md:py-5 shadow-xl" onClick={() => {}} animated>
                             {isSubmitting ? '送信中...' : <CTAText />}
                           </CTAButton>
                           <p className="text-center text-[10px] md:text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
                             <Shield className="w-3 h-3" />
                             SSL暗号化通信により、個人情報は厳重に保護されます。
                           </p>
                        </div>
                    </div>
                  </div>
                )}
             </form>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="bg-sotopika-navy text-white py-8 md:py-12 border-t border-white/10">
        <Container>
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="text-xl md:text-2xl font-rounded font-extrabold">外壁洗浄専門店 ソトピカ</div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm font-bold text-gray-300 text-center md:text-left">
                 <a href="#" className="hover:text-white transition-colors">運営会社</a>
                 <a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }} className="hover:text-white transition-colors">プライバシーポリシー</a>
                 <a href="#" className="hover:text-white transition-colors">特定商取引法に基づく表記</a>
              </div>
           </div>
           <div className="text-center text-gray-500 text-xs md:text-sm">
             &copy; Sotopika. All Rights Reserved.
           </div>
        </Container>
      </footer>
    </div>
  );
}