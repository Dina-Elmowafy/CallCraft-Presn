import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Ear,
  Maximize,
  Minimize,
  PhoneCall,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import { Slide } from './types';
import { GlowBackground } from './components/GlowBackground';
import { AudioWaveformVisualizer } from './components/AudioWaveformVisualizer';
import { CallcraftLogo } from './components/CallcraftLogo';

type ContentSlide = Slide & {
  kicker: string;
  body?: string[];
  bullets?: string[];
  closing?: string;
  variant?: 'cover' | 'split' | 'list' | 'compare' | 'closing';
};

const slides: ContentSlide[] = [
  {
    id: 1,
    speaker: 'Call Craft',
    kicker: 'Slide 1 — Cover',
    title: 'CALL CRAFT',
    subtitle: 'فيها حقيقة لازم تتشاف… كل مكالمة بيع',
    body: [
      'منصة ذكية بتحلل مكالمات السيلز وتحوّلها لتقارير واضحة تساعدك تعرف:',
      'ليه البيعة كسبت؟ ليه البيعة ضاعت؟ وإزاي تطوّر أداء فريقك بناءً على بيانات حقيقية.',
    ],
    type: 'hero',
    bgPreset: 'cosmic',
    variant: 'cover',
  },
  {
    id: 2,
    speaker: 'Call Craft',
    kicker: 'Slide 2',
    title: 'المشكلة',
    subtitle: 'البيعة مش بتضيع فجأة',
    body: [
      'في أغلب الشركات، الإدارة بتشوف النتيجة النهائية فقط: العميل اشترى… أو العميل اختفى.',
      'لكن السؤال الأهم غالبًا بيفضل من غير إجابة: إيه اللي حصل جوه المكالمة؟',
    ],
    bullets: [
      'هل المشكلة في السعر؟',
      'في طريقة عرض المنتج؟',
      'في متابعة السيلز؟',
      'في اعتراض ما اتردش عليه صح؟',
      'ولا العميل كان جاهز يشتري واتساب بسبب جملة واحدة؟',
    ],
    type: 'problem',
    bgPreset: 'waves',
    variant: 'split',
  },
  {
    id: 3,
    speaker: 'Call Craft',
    kicker: 'Slide 3',
    title: 'الحقيقة موجودة في المكالمة',
    subtitle: 'كل مكالمة فيها إشارات واضحة',
    body: [
      'نبرة العميل، تردده، اعتراضاته، أسئلته، لحظة اهتمامه، ولحظة فقدانه للثقة… كل ده بيقول للإدارة الحقيقة.',
      'لكن من غير تحليل، المكالمة بتتحول لمجرد تسجيل طويل محدش عنده وقت يسمعه.',
    ],
    closing: 'Call Craft بيحوّل المكالمة من تسجيل عادي إلى تقرير إداري واضح.',
    type: 'solution',
    bgPreset: 'grid',
    variant: 'list',
  },
  {
    id: 4,
    speaker: 'Call Craft',
    kicker: 'Slide 4',
    title: 'ما هو Call Craft؟',
    subtitle: 'Call Craft هو مساعد ذكي للإدارة والسيلز',
    body: [
      'منصة بتحلل مكالمات فريق المبيعات وتطلع Insights عملية تساعدك تفهم أداء الفريق والعميل بوضوح.',
      'بدل ما تعتمد على الانطباعات أو كلام الموظف بعد المكالمة، Call Craft بيديك تحليل مبني على المكالمة نفسها.',
    ],
    closing: 'يعني قرارات أقل عشوائية… وتطوير أسرع… ومبيعات أوضح.',
    type: 'feature',
    bgPreset: 'none',
    variant: 'split',
  },
  {
    id: 5,
    speaker: 'Call Craft',
    kicker: 'Slide 5',
    title: 'ماذا يحلل Call Craft؟',
    subtitle: 'تحليل كامل لأهم تفاصيل المكالمة',
    body: ['Call Craft يساعدك تعرف:'],
    bullets: [
      'أداء موظف السيلز أثناء المكالمة',
      'طريقة تعامله مع اعتراضات العميل',
      'مشاعر العميل وتغيرها خلال الحوار',
      'أهم الأسئلة والطلبات المتكررة',
      'النقطة التي بدأ عندها العميل يفقد الاهتمام',
      'السبب الأقرب لضياع البيعة',
      'هل المكالمة تحتاج تدخل إداري أم لا',
    ],
    closing: 'كل ده في تقرير مختصر وواضح بدل ساعات من الاستماع العشوائي.',
    type: 'feature',
    bgPreset: 'none',
    variant: 'list',
  },
  {
    id: 6,
    speaker: 'Call Craft',
    kicker: 'Slide 6',
    title: 'تقارير تكشف ما لا يظهر في الأرقام',
    subtitle: 'الأرقام بتقول النتيجة… لكن المكالمة بتقول السبب',
    body: [
      'قد يكون لديك موظف يحقق مكالمات كثيرة لكن إغلاقه ضعيف.',
      'وقد يكون هناك موظف يضيع عملاء بسبب نفس الخطأ المتكرر.',
      'وقد تكون هناك اعتراضات متكررة من العملاء لا تصل للإدارة بشكل واضح.',
    ],
    closing: 'Call Craft يكشف هذه التفاصيل ويحوّلها إلى معلومات قابلة للتنفيذ. مش مجرد Dashboard، ده تشخيص حقيقي لأداء البيع.',
    type: 'neural',
    bgPreset: 'network',
    variant: 'split',
  },
  {
    id: 7,
    speaker: 'Call Craft',
    kicker: 'Slide 7',
    title: 'من التخمين إلى القرار',
    subtitle: 'قبل Call Craft وبعده',
    bullets: [
      'ليه العميل ما اشترش؟ قال السعر غالي. كان هيفكر. مش جاهز دلوقتي. هيكلمنا بعدين.',
      'لكن الحقيقة قد تكون مختلفة تمامًا.',
      'بعد Call Craft تقدر تعرف السبب بدقة: هل الاعتراض اتساب من غير رد؟ هل الموظف استعجل في القفل؟ هل العميل كان محتاج متابعة؟ هل العرض ما اتشرحش بشكل مقنع؟ هل المشكلة متكررة مع أكتر من موظف؟',
    ],
    type: 'feature',
    bgPreset: 'grid',
    variant: 'compare',
  },
  {
    id: 8,
    speaker: 'Call Craft',
    kicker: 'Slide 8',
    title: 'القيمة الحقيقية للشركة',
    subtitle: 'Call Craft يساعدك تبيع أفضل، لا تسمع أكثر فقط',
    body: ['الفائدة ليست في تحليل المكالمات فقط، لكن في القرارات التي ستأخذها بعد التحليل.'],
    bullets: [
      'رفع جودة فريق السيلز',
      'تقليل الأخطاء المتكررة',
      'تحسين طريقة الرد على الاعتراضات',
      'تدريب الموظفين بناءً على مواقف حقيقية',
      'فهم احتياجات العملاء المتكررة',
      'اكتشاف أسباب ضياع المبيعات',
      'تنبيه الإدارة للمكالمات المهمة في الوقت المناسب',
      'زيادة فرص إغلاق الصفقات',
    ],
    closing: 'النتيجة: فريق أقوى، قرارات أسرع، ومبيعات أكثر قابلية للتحسين.',
    type: 'feature',
    bgPreset: 'none',
    variant: 'list',
  },
  {
    id: 9,
    speaker: 'Call Craft',
    kicker: 'Slide 9 — Closing',
    title: 'CALL CRAFT',
    subtitle: 'قبل ما تخسر العميل الجاي… اسمع الحقيقة اللي جوه كل مكالمة',
    body: [
      'كل مكالمة بيع تحمل فرصة للتعلم، للتحسين، ولزيادة المبيعات.',
      'Call Craft يساعدك ترى ما كان مخفيًا، وتحوّل كل محادثة مع العميل إلى خطوة أقوى نحو النمو.',
    ],
    closing: 'Call Craft من مكالمات عادية إلى قرارات مبيعات ذكية.',
    type: 'conclusion',
    bgPreset: 'network',
    variant: 'closing',
  },
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentIdx];

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .then(() => setIsFullScreen(true))
        .catch((err) => console.error(`Error entering full screen: ${err.message}`));
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const goNext = () => {
    if (currentIdx < slides.length - 1) {
      setDirection(1);
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setDirection(-1);
      setCurrentIdx((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleFSChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  const renderBullets = (items: string[] = [], accent = 'indigo') => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {items.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 * index }}
          className="flex items-start gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-right shadow-sm backdrop-blur-xl"
        >
          <CheckCircle2 className={`mt-0.5 shrink-0 text-${accent}-600`} size={19} />
          <p className="text-sm leading-7 text-slate-700">{item}</p>
        </motion.div>
      ))}
    </div>
  );

  const renderSlideContent = () => {
    if (currentSlide.variant === 'cover') {
      return (
        <div className="text-center relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 mb-8 px-6 py-2.5 bg-indigo-600 text-white text-xs tracking-widest uppercase font-bold rounded-full shadow-2xl border border-indigo-500"
          >
            <PhoneCall size={14} className="animate-pulse" />
            <span>Presentation Content — Call Craft</span>
          </motion.div>
          <motion.h1
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl font-black leading-none mb-8 text-slate-900 tracking-tight"
          >
            {currentSlide.title}
            <span className="block mt-5 text-3xl md:text-4xl font-bold text-indigo-600">
              {currentSlide.subtitle}
            </span>
          </motion.h1>
          <div className="space-y-4 text-slate-600 text-xl leading-10 max-w-3xl mx-auto">
            {currentSlide.body?.map((line) => <p key={line}>{line}</p>)}
          </div>
          <div className="mt-12 flex justify-center w-full">
            <AudioWaveformVisualizer count={18} isActive color="bg-indigo-600" />
          </div>
        </div>
      );
    }

    if (currentSlide.variant === 'compare') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          <div className="rounded-[32px] border border-red-100 bg-white/85 p-7 shadow-xl">
            <div className="mb-5 flex items-center gap-3 text-red-600">
              <XCircle size={26} />
              <h3 className="font-serif text-3xl font-black text-slate-900">قبل Call Craft</h3>
            </div>
            <p className="text-lg leading-9 text-slate-600">{currentSlide.bullets?.[0]}</p>
            <p className="mt-6 rounded-2xl bg-red-50 p-4 text-base font-bold leading-8 text-red-700">
              {currentSlide.bullets?.[1]}
            </p>
          </div>
          <div className="rounded-[32px] border border-indigo-100 bg-slate-950 p-7 text-white shadow-xl">
            <div className="mb-5 flex items-center gap-3 text-indigo-300">
              <CheckCircle2 size={26} />
              <h3 className="font-serif text-3xl font-black">بعد Call Craft</h3>
            </div>
            <p className="text-lg leading-9 text-slate-200">{currentSlide.bullets?.[2]}</p>
          </div>
        </div>
      );
    }

    if (currentSlide.variant === 'closing') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-6xl items-stretch">
          <div className="md:col-span-7 rounded-[40px] bg-slate-950 p-10 text-white shadow-2xl relative overflow-hidden">
            <Brain className="absolute -left-16 -bottom-16 text-white/5" size={320} />
            <h3 className="font-serif text-4xl md:text-5xl font-black leading-tight mb-8">
              {currentSlide.subtitle}
            </h3>
            <div className="space-y-5 text-lg leading-9 text-slate-200">
              {currentSlide.body?.map((line) => <p key={line}>{line}</p>)}
            </div>
          </div>
          <div className="md:col-span-5 rounded-[40px] border border-indigo-100 bg-white/90 p-10 shadow-xl flex flex-col justify-between">
            <Sparkles className="text-indigo-600" size={42} />
            <p className="font-serif text-4xl font-black leading-tight text-slate-950">
              {currentSlide.closing}
            </p>
            <div className="text-sm font-black uppercase tracking-[0.25em] text-slate-400">Closing</div>
          </div>
        </div>
      );
    }

    if (currentSlide.variant === 'list') {
      return (
        <div className="w-full max-w-6xl space-y-6">
          {currentSlide.body?.map((line) => (
            <p key={line} className="mx-auto max-w-4xl text-center text-lg leading-9 text-slate-600">
              {line}
            </p>
          ))}
          {renderBullets(currentSlide.bullets)}
          {currentSlide.closing && (
            <div className="mx-auto max-w-4xl rounded-[28px] bg-indigo-600 px-8 py-6 text-center text-xl font-bold leading-9 text-white shadow-xl">
              {currentSlide.closing}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl items-stretch">
        <div className="rounded-[36px] border border-slate-200 bg-white/85 p-8 shadow-xl backdrop-blur-xl">
          <div className="mb-7 flex items-center gap-3 text-indigo-600">
            <Target size={30} />
            <h3 className="font-serif text-3xl font-black text-slate-950">الفكرة الأساسية</h3>
          </div>
          <div className="space-y-5 text-lg leading-9 text-slate-650">
            {currentSlide.body?.map((line) => <p key={line}>{line}</p>)}
          </div>
        </div>
        <div className="rounded-[36px] bg-slate-950 p-8 text-white shadow-xl">
          <div className="mb-7 flex items-center gap-3 text-indigo-300">
            {currentSlide.id === 6 ? <BarChart3 size={30} /> : currentSlide.id === 4 ? <Ear size={30} /> : <TrendingUp size={30} />}
            <h3 className="font-serif text-3xl font-black">الخلاصة</h3>
          </div>
          {currentSlide.bullets ? (
            <div className="space-y-3">
              {currentSlide.bullets.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
                  <CheckCircle2 className="mt-1 shrink-0 text-indigo-300" size={18} />
                  <p className="text-sm leading-7 text-slate-100">{item}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xl font-bold leading-10 text-slate-100">{currentSlide.closing}</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className={`h-screen w-screen relative overflow-hidden flex flex-col font-sans transition-all duration-700 bg-[#F7FAFF] scene-3d text-slate-800 selection:bg-indigo-600 selection:text-white ${
        isFullScreen ? 'p-0' : ''
      }`}
    >
      <GlowBackground currentSlideType={currentSlide.type} />

      <nav
        dir="ltr"
        className={`fixed top-0 left-0 right-0 z-[60] p-6 md:p-10 flex justify-between items-center transition-all ${
          isFullScreen ? 'opacity-30 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div
          className="flex items-center gap-4 cursor-pointer outline-none select-none"
          onClick={() => {
            setDirection(-1);
            setCurrentIdx(0);
          }}
        >
          <CallcraftLogo />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="px-5 py-2.5 bg-white/70 backdrop-blur-xl rounded-full text-xs font-black tracking-[0.2em] text-slate-900 border border-slate-200/40 button-3d flex items-center gap-1.5 font-mono select-none">
            <span>{currentIdx + 1}</span>
            <span className="text-slate-300">/</span>
            <span>{slides.length}</span>
          </div>
          <button
            onClick={toggleFullScreen}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-600 transition-all outline-none button-3d"
            title="تكبير العرض"
          >
            {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </nav>

      <main className="flex-1 relative z-10 flex items-center justify-center p-8 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: direction > 0 ? 48 : -48, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction > 0 ? -48 : 48, y: -8, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 180, damping: 28, mass: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-12 pt-28 md:pt-32 pb-24 overflow-visible">
              <div className="text-center max-w-5xl shrink-0 mb-8">
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-white/75 px-5 py-2 text-xs font-black text-indigo-700 shadow-sm border border-indigo-100"
                >
                  <span>{currentSlide.kicker}</span>
                  <span className="text-slate-300">•</span>
                  <span>سلايد {currentIdx + 1} من {slides.length}</span>
                </motion.div>

                {currentIdx > 0 && (
                  <>
                    <motion.h2
                      initial={{ y: -15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="font-serif font-black mb-3 leading-tight transition-colors duration-500 text-slate-950 text-4xl md:text-5xl"
                    >
                      {currentSlide.title}
                    </motion.h2>
                    {currentSlide.subtitle && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-base md:text-lg font-light leading-8 transition-colors duration-500 text-slate-500"
                      >
                        {currentSlide.subtitle}
                      </motion.p>
                    )}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.3 }}
                      className="h-1 w-24 mx-auto mt-4 rounded-full bg-indigo-600"
                    />
                  </>
                )}
              </div>

              <div className="w-full flex justify-center items-center overflow-visible min-h-0">
                {renderSlideContent()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        className={`fixed bottom-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-end pointer-events-none transition-all ${
          isFullScreen ? 'opacity-30 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="flex gap-4 pointer-events-auto select-none">
          <button
            onClick={goPrev}
            disabled={currentIdx === 0}
            className={`w-14 h-14 rounded-[22px] flex items-center justify-center transition-all button-3d ${
              currentIdx === 0
                ? 'bg-slate-100/10 text-slate-500 cursor-not-allowed'
                : 'bg-white text-slate-800 shadow-lg border border-slate-200/50 hover:bg-indigo-600 hover:text-white hover:scale-105 active:scale-95'
            }`}
            title="السلايد السابق"
          >
            <ChevronRight size={24} />
          </button>

          <button
            onClick={goNext}
            disabled={currentIdx === slides.length - 1}
            className={`w-14 h-14 rounded-[22px] flex items-center justify-center transition-all button-3d ${
              currentIdx === slides.length - 1
                ? 'bg-slate-100/10 text-slate-500 cursor-not-allowed'
                : 'bg-slate-900 text-white shadow-lg border border-slate-800 hover:bg-indigo-600 hover:scale-105 active:scale-95'
            }`}
            title="السلايد التالي"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {currentIdx < slides.length - 1 && (
          <div className="hidden md:flex flex-col gap-3 pointer-events-auto select-none">
            <div className="p-4 bg-white/70 backdrop-blur-2xl rounded-[30px] border border-slate-200/40 shadow-xl lift-3d flex items-center gap-5 hover:scale-102 transition-transform duration-300">
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">السلايد التالي</span>
                <span className="text-xs font-bold text-slate-800 truncate max-w-[180px] block mt-0.5">
                  {slides[currentIdx + 1].title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Sparkles size={18} className="animate-spin [animation-duration:15s]" />
              </div>
            </div>
          </div>
        )}
      </footer>

      <div className="fixed bottom-0 left-0 h-1.5 bg-slate-200/40 w-full z-[60] opacity-80">
        <motion.div
          initial={false}
          animate={{ width: `${((currentIdx + 1) / slides.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          className="h-full bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,1)]"
        />
      </div>
    </div>
  );
}
