import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Play, Server, Users, Award, Shield, 
  ChevronRight, ChevronLeft, Maximize, Minimize, HelpCircle, Sparkles, CheckSquare, 
  TrendingUp, PhoneCall, AlertCircle, PhoneMissed, Volume2, Briefcase, BarChart3, Database, MessageCircle, Brain
} from 'lucide-react';
import { Slide } from './types';
import { GlowBackground } from './components/GlowBackground';
import { AudioWaveformVisualizer } from './components/AudioWaveformVisualizer';
import { ProblemCards } from './components/ProblemCards';
import { AiPipeline } from './components/AiPipeline';
import { AudioTranscriptionPlayer } from './components/AudioTranscriptionPlayer';
import { QaScoreGauge } from './components/QaScoreGauge';
import { SaaSArchitectureWidget } from './components/SaaSArchitectureWidget';
import { CallcraftLogo } from './components/CallcraftLogo';

export default function App() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle standard full-screen API
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch((err) => {
        console.error(`Error entering full screen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  const slides: Slide[] = [
    {
      id: 0,
      speaker: 'دينا (Team Leader & AI)',
      title: 'CALLCRAFT',
      subtitle: 'نظام SaaS ذكي متكامل لتحليل وتقييم مكالمات فرق المبيعات وخدمة العملاء',
      type: 'hero',
      bgPreset: 'cosmic'
    },
    {
      id: 1,
      speaker: 'دينا (Team Leader & AI)',
      title: 'المشكلة الإدارية التي يحلها CALLCRAFT',
      subtitle: 'الفجوة الكبيرة في مراجعة مكالمات مراكز الاتصال والدعم يدوياً',
      type: 'problem',
      bgPreset: 'waves'
    },
    {
      id: 2,
      speaker: 'يوسف (Frontend Developer)',
      title: 'كيف يعمل نظام كول كرافت؟',
      subtitle: 'سير بيانات متماسك وأتمتة ذكية تفوق القدرة البشرية',
      type: 'solution',
      bgPreset: 'grid'
    },
    {
      id: 3,
      speaker: 'يوسف (Frontend Developer)',
      title: 'التحليل وتحويل الصوت إلى نصوص مجزية',
      subtitle: 'تفريغ فوري رائد يتيح لك سماع ورؤية ما يعتمل بالمكالمة بثوانٍ معدودة',
      type: 'feature',
      bgPreset: 'none'
    },
    {
      id: 4,
      speaker: 'نانسي (Backend Developer)',
      title: 'التقييم التلقائي الموحد (QA Score)',
      subtitle: 'تقييم معايير الالتزام والتجاوب الفطري دون تمييز عاطفي',
      type: 'feature',
      bgPreset: 'none'
    },
    {
      id: 5,
      speaker: 'نانسي (Backend Developer)',
      title: 'التشخيص الذكي (Diagnostic Brain)',
      subtitle: 'تفريد المشاكل وتوجيه جهود الحملة التسويقية أو المهارات البيعية',
      type: 'neural',
      bgPreset: 'network'
    },
    {
      id: 6,
      speaker: 'أحمد (Backend Developer)',
      title: 'لوحة تحكم معبرة وإدارة متعددة الباقات',
      subtitle: 'منصة SaaS مصممة لتستوعب شركات متعددة بنماذج فوترة متينة',
      type: 'feature',
      bgPreset: 'none'
    },
    {
      id: 8,
      speaker: 'دينا (Team Leader & AI)',
      title: 'الفوائد العملية والقيمة المضافة لشركتك',
      subtitle: 'ما الذي يوفره الاستثمار في CALLCRAFT مقارنة بالمراجعة التقليدية؟',
      type: 'feature',
      bgPreset: 'none'
    },
    {
      id: 9,
      speaker: 'فريق كول كرافت',
      title: 'الخلاصة والأسئلة الشائعة Q&A',
      subtitle: 'تحويل المكالمات من تسجيلات مهملة بمهب الريح إلى كنز من البيانات والقرارات',
      type: 'conclusion',
      bgPreset: 'network'
    }
  ];

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        // Since RTL directory is active, ArrowLeft is logically back and ArrowRight is next
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  const currentSlide = slides[currentIdx];

  // Specific slide rendering logic based on index/type
  const renderSlideContent = () => {
    switch (currentIdx) {
      case 0: // Hero Introduction
        return (
          <div className="text-center relative z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="inline-flex items-center gap-2 mb-8 px-6 py-2.5 bg-indigo-600 text-white text-xs tracking-widest uppercase font-bold rounded-full shadow-2xl lift-3d border border-indigo-500"
            >
              <PhoneCall size={14} className="animate-pulse" />
              <span>عرض تقديمي تفاعلي لعام 2026</span>
            </motion.div>

            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-6xl md:text-8xl font-black leading-none mb-8 text-slate-900 tracking-tight"
            >
              CALLCRAFT
              <span className="block mt-4 italic font-normal text-indigo-600 text-4xl md:text-5xl">
                هندسة وصناعة المكالمة الناجحة
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
            >
              تحويل تسجيلات مكالمات شركتك المهدرة بمستودعات الصوت إلى تقارير تقييم ذكية (QA) وتشخيصات تسويقية وتوصيات تدريب مخصصة خلال دقيقة واحدة!
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center w-full"
            >
              <AudioWaveformVisualizer count={18} isActive={true} color="bg-indigo-600" />
            </motion.div>
          </div>
        );

      case 1: // Problems
        return <ProblemCards />;

      case 2: // AI Pipeline
        return <AiPipeline />;

      case 3: // Audio Player / Transcript synced
        return <AudioTranscriptionPlayer />;

      case 4: // QA Score widget
        return <QaScoreGauge />;

      case 5: // Diagnostics & Classification
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl h-auto items-center z-10">
            {/* Visual breakdown cards */}
            <div className="p-8 bg-white/85 backdrop-blur-2xl rounded-[40px] border border-slate-200 text-slate-950 shadow-xl lift-3d flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                  <BarChart3 size={24} />
                </div>
                <h3 className="font-serif text-2xl font-black">تشخيص غلق الفرص بالمكالمات</h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 font-light">
                يبادر كول كرافت بتصنيف المكالمات الضعيفة وغير الناجحة بدقة متناهية إلى أسباب حقيقية ملموسة، لتحديد إذا كان الخطأ مبيعاتي مهاراتي أم تسويقي إعلاني.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-2xl border border-red-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <PhoneMissed size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-red-700 text-xs">مشكلة تسويق (Marketing Problem)</h5>
                    <p className="text-[10px] text-slate-600 leading-normal mt-0.5">
                      الحملة الإعلانية تجذب فئات تبحث عن مسجلات شخصية مجانية أو غير مهتمين بالدفع، وليس لديهم شركة أو حاجة فعلية للـ SaaS.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <h5 className="font-bold text-amber-700 text-xs">مشكلة مبيعات (Sales Problem)</h5>
                    <p className="text-[10px] text-slate-600 leading-normal mt-0.5">
                      العميل مستهدف ولديه ميزانية، لكن الموظف ألقى اللوم على الآخرين، قاطع العميل، أو لم يلتزم بالترويج لعروض الخصومات لتسهيل الإغلاق.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explanatory cards */}
            <div className="p-8 bg-blue-600 rounded-[40px] text-white shadow-2xl lift-3d flex flex-col justify-center">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Sparkles size={28} className="animate-pulse" />
                <span>عائد اتخاذ القرار السريع</span>
              </h3>
              <p className="text-blue-50 text-base leading-relaxed mb-6">
                هذا التشخيص يحمي فريق المبيعات من لوم التسويق، ويوجه الإدارة مباشرة لتعديل فئة استهداف الإعلانات أو صياغة حملات توعوية أفضل، بدلاً من إهدار ميزانيات ضخمة دون جدوى.
              </p>
              
              <div className="bg-white/10 p-5 rounded-2xl border border-white/20">
                <h5 className="font-bold text-xs mb-1 text-emerald-100">أثر القرار:</h5>
                <p className="text-[11px] leading-relaxed text-blue-50">
                  كول كرافت يجمع البيانات طوال الأسبوع ليعطيك ملخصاً إحصائياً دقيقاً لإهدار الموارد بقسمي الإعلان والمبيعات.
                </p>
              </div>
            </div>
          </div>
        );

      case 6: // SaaS / Admin vs Owner dashboards
        return <SaaSArchitectureWidget />;

      case 7: // Value Propositions
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl items-stretch">
            {/* Left Box - Legacy approach */}
            <div className="p-8 bg-white border border-slate-100 rounded-[40px] flex flex-col justify-between shadow-sm">
              <div>
                <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold tracking-widest uppercase rounded-full">
                  الطرق التقليدية والمراجعة البشرية
                </span>
                <h3 className="text-3xl font-serif font-black text-slate-900 mt-4 mb-6">بطيئة، مكلفة ومتحيزة</h3>
                
                <div className="space-y-4">
                  {[
                    'مراجعة عشوائية تغطي أقل من 1-2% من مجمل الاتصالات اليومية.',
                    'انتقاء غير عادل للموظفين بناء على انطباع مكالمة واحدة سيئة فقط.',
                    'جهد بشري بطيء يستغرق ساعات طويلة جداً لكتابة تقارير يدوية أولية.',
                    'غياب التوصيات التدريبية المخصصة والموثقة بالأقوال الفعلية للمكالمة.'
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✕</div>
                      <p className="text-xs text-slate-500 leading-normal">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                هدير هائل للقدرات والمكتسبات الإعلانية
              </div>
            </div>

            {/* Right Box - CallCraft value */}
            <div className="p-8 bg-slate-900 text-white rounded-[40px] flex flex-col justify-between border border-slate-800">
              <div>
                <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                  المستقبل مع CALLCRAFT الذكية
                </span>
                <h3 className="text-3xl font-serif font-black text-slate-100 mt-4 mb-6">مؤتمتة، منصفة ولحظية 🚀</h3>
                
                <div className="space-y-4">
                  {[
                    'تحليل وتقييم 100% من جميع المكالمات دون استثناء أو إغفال أي اتصال.',
                    'تقييم موحد وموثق تماماً على قواعد عدالة واضحة للمبيعات والتواصل.',
                    'تقارير وتفريغات فورية جاهزة وسهلة القراءة بمجرد وضع سماعة الهاتف.',
                    'تقديم خطة توصيات تدريبية آلية بالذكاء الاصطناعي مخصصة ومبنية على أقوال الموظف والعميل.'
                  ].map((text, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                      <p className="text-xs text-slate-300 leading-normal">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                تحويل المكالمات من تكلفة مادية مستمرة إلى عائد استثمار بيعي
              </div>
            </div>
          </div>
        );

      case 8: // Conclusion Q&A
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full max-w-6xl items-stretch">
            {/* Left summary pitch */}
            <div className="md:col-span-6 p-10 bg-slate-900 rounded-[50px] text-white flex flex-col justify-between shadow-2xl lift-3d relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                <Brain size={400} />
              </div>
              <div className="space-y-6">
                <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-bold tracking-widest uppercase rounded-full">
                  الشركاء والنجاح الطويل
                </span>
                <h3 className="text-4xl font-serif font-bold italic leading-tight">
                  كول كرافت ليست مجرد أداة لتوليد النصوص، بل هي نظام تشغيلي متكامل لنمو وبقاء شركتك مبيعاتياً ودعماً.
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  دعنا نوفر على شركتك آلاف الساعات الضائعة، ونبدأ بتحقيق عائد حقيقي بناء على أدوات وقواعد منصفة وعادلة مدعومة بأقوى تقنيات الذكاء الاصطناعي لعام 2026.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 pt-10 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <Users className="text-indigo-400" size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider">فرق مبيعات ذكية</span>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="text-indigo-400" size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider">توصيات مخصصة</span>
                </div>
              </div>
            </div>

            {/* Right Q&A list */}
            <div className="md:col-span-6 bg-white surface-3d p-8 md:p-10 rounded-[50px] border border-slate-100 shadow-xl lift-3d flex flex-col justify-between">
              <div className="space-y-6">
                <h4 className="text-xl font-serif font-bold text-slate-900">الأسئلة الشائعة Q&A</h4>
                
                {/* Simulated Expandable Q&A accordion list */}
                <div className="space-y-3">
                  {[
                    { q: 'هل يمكن ربط كول كرافت هاتفياً؟', a: 'نعم، المنصة سحابية بالكامل وتوفر ربط مستقر لتوصيل المكالمات فوراً بالتكامل والـ APIs.' },
                    { q: 'ماذا عن الخصوصية وأمان التسجيلات؟', a: 'يتم تشفير وتعمية جميع هوية وعناوين العملاء والملفات الصوتية بمجرد إجراء الفحص والتحليل.' },
                    { q: 'كيف يفهم الذكي اللهجات المتباينة؟', a: 'تم تطوير النمذجة اللغوية بـ كول كرافت لتستوعب اللهجات المحلية بدقة، بدعم معجمي لغوي كامل.' }
                  ].map((faq, fIdx) => (
                    <div key={fIdx} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 text-right">
                      <h5 className="font-bold text-slate-800 text-xs mb-1">■ {faq.q}</h5>
                      <p className="text-slate-500 text-[10px] leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-400 text-center select-none pt-4 border-t border-slate-50">
                شكرًا جزيلاً لحضوركم ومتابعتكم
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`h-screen w-screen relative overflow-hidden flex flex-col font-sans transition-all duration-700 bg-[#F7FAFF] scene-3d text-slate-800 selection:bg-indigo-600 selection:text-white ${
        isFullScreen ? 'p-0' : ''
      }`}
    >
      {/* Organic Glowing Dynamic Background */}
      <GlowBackground currentSlideType={currentSlide.type} />

      {/* Main Top Header - Floating panel */}
      <nav dir="ltr" className={`fixed top-0 left-0 right-0 z-[60] p-6 md:p-10 flex justify-between items-center transition-all ${
        isFullScreen ? 'opacity-30 hover:opacity-100' : 'opacity-100'
      }`}>
        {/* LOGO area */}
        <div 
          className="flex items-center gap-4 cursor-pointer outline-none select-none"
          onClick={() => {
            setDirection(-1);
            setCurrentIdx(0);
          }}
        >
          <CallcraftLogo />
        </div>

        {/* Status badges & Controls */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Current Page Numerator */}
          <div className="px-5 py-2.5 bg-white/70 backdrop-blur-xl rounded-full text-xs font-black tracking-[0.2em] text-slate-900 border border-slate-200/40 button-3d flex items-center gap-1.5 font-mono select-none">
            <span>{currentIdx + 1}</span>
            <span className="text-slate-300">/</span>
            <span>{slides.length}</span>
          </div>

          <button
            onClick={toggleFullScreen}
            className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-600 transition-all outline-none button-3d"
            title="Toggle fullscreen presentation"
          >
            {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </nav>

      {/* Main Slide Carousel Screen */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-8 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: direction > 0 ? 90 : -90, y: 18, rotateY: direction > 0 ? -8 : 8, scale: 0.97, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -90 : 90, y: -14, rotateY: direction > 0 ? 8 : -8, scale: 0.97, filter: 'blur(10px)' }}
            transition={{ type: "spring", stiffness: 120, damping: 24, mass: 0.95 }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className={`w-full h-full flex flex-col items-center px-6 md:px-12 overflow-visible ${
              'justify-center'
            } ${
              currentIdx === 1 ? 'pt-24 md:pt-28 pb-20' : 'pt-32 md:pt-36 pb-24'
            }`}>
              {/* Slide Title block for non-hero slides */}
              {currentIdx > 0 && (
                <div className={`text-center max-w-4xl shrink-0 ${currentIdx === 1 ? 'mb-6' : 'mb-10'}`}>
                  <motion.h2 
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`font-serif font-black mb-3 leading-tight transition-colors duration-500 text-slate-950 ${
                      currentIdx === 1 ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
                    }`}
                  >
                    {currentSlide.title}
                  </motion.h2>
                  
                  {currentSlide.subtitle && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-base font-light transition-colors duration-500 text-slate-500"
                    >
                      {currentSlide.subtitle}
                    </motion.p>
                  )}
                  
                  {/* Decorative modern indicator bar */}
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3 }}
                    className="h-1 w-24 mx-auto mt-4 rounded-full bg-indigo-600"
                  />
                </div>
              )}

              {/* Sub-component contents */}
              <div className="w-full flex justify-center items-center overflow-visible min-h-0">
                {renderSlideContent()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigation Deck */}
      <footer className={`fixed bottom-0 left-0 right-0 z-50 p-6 md:p-10 flex justify-between items-end pointer-events-none transition-all ${
        isFullScreen ? 'opacity-30 hover:opacity-100' : 'opacity-100'
      }`}>
        <div className="flex gap-4 pointer-events-auto select-none">
          <button
            onClick={goPrev}
            disabled={currentIdx === 0}
            className={`w-14 h-14 rounded-[22px] flex items-center justify-center transition-all button-3d ${
              currentIdx === 0 
                ? 'bg-slate-100/10 text-slate-500 cursor-not-allowed' 
                : 'bg-white text-slate-800 shadow-lg border border-slate-200/50 hover:bg-indigo-600 hover:text-white hover:scale-105 active:scale-95'
            }`}
            title="المكالمة السابقة"
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
            title="المكالمة التالية"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Next transition preview block */}
        {currentIdx < slides.length - 1 && currentIdx !== 1 && (
          <div className="hidden md:flex flex-col gap-3 pointer-events-auto select-none">
            <div className="p-4 bg-white/70 backdrop-blur-2xl rounded-[30px] border border-slate-200/40 shadow-xl lift-3d flex items-center gap-5 hover:scale-102 transition-transform duration-300">
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">المحور التالي</span>
                <span className="text-xs font-bold text-slate-800 truncate max-w-[150px] block mt-0.5">
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

      {/* Progress timeline bar at the very bottom */}
      <div className="fixed bottom-0 left-0 h-1.5 bg-slate-200/40 w-full z-[60] opacity-80">
        <motion.div 
          initial={false}
          animate={{ width: `${((currentIdx + 1) / slides.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="h-full bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,1)]" 
        />
      </div>
    </div>
  );
}
