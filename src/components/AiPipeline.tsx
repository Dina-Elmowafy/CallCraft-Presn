import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UploadCloud, MessageSquare, Brain, Key, Award, Send, Check } from 'lucide-react';

interface Step {
  id: number;
  icon: any;
  label: string;
  title: string;
  details: string;
  color: string;
  bullet: string;
}

export const AiPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsActive] = useState<boolean>(true);

  const steps: Step[] = [
    {
      id: 0,
      icon: UploadCloud,
      label: 'رفع الملف',
      title: 'رفع الملف وحساب البصمة (Audio Hash)',
      details: 'يرفع المشرف ملف الصوت، ويحلل النظام بصمة الصوت الرقمية لمنع تحليل نفس الملف مرتين، وتوفير تكاليف استهلاك الـ API.',
      color: 'bg-[#C5A059]',
      bullet: 'منع هدر التكاليف'
    },
    {
      id: 1,
      icon: MessageSquare,
      label: 'تفريغ الصوت',
      title: ' تحويل الصوت إلى نص بدقة (STT)',
      details: 'تفريع المكالمة لكلام منسق ومقروء يسهل البحث داخله وفلترة نصوص الحوار بلهجات عربية وثقافات عمل حقيقية.',
      color: 'bg-[#DBBE83]',
      bullet: 'فهم تام للنقاش'
    },
    {
      id: 2,
      icon: Brain,
      label: 'تحليل الذكاء الاصطناعي',
      title: 'محاكاة نية العميل ومصدر المشكلة',
      details: 'استخلاص نقاط الألم، مخاوف العميل، وتحديد هل الفشل تسويقي (سوء Lead) أم مبيعاتي (ضعف مهارة إغلاق).',
      color: 'bg-[#C5A059]',
      bullet: 'ذكاء تشخيصي'
    },
    {
      id: 3,
      icon: Award,
      label: 'تقييم الجودة (QA)',
      title: 'توليد الدرجة الكلية وتوصيات التدريب',
      details: 'حساب نقاط الجودة من 100 بناء على مهارات التواصل والالتزام؛ وتوليد توصيات عملية فورية لتطوير الموظف.',
      color: 'bg-[#DBBE83]',
      bullet: 'رقابة عادلة دقيقة'
    },
    {
      id: 4,
      icon: Send,
      label: 'تنبيهات فورية',
      title: 'إرسال التقارير الفورية عبر الواتساب',
      details: 'توصيل خلاصة التقييم والتوصية وجرس التنبيه للمكالمات الضعيفة بشكل مباشر للإدارة والوكيل عبر الواتساب.',
      color: 'bg-[#C5A059]',
      bullet: 'متابعة عن بُعد'
    }
  ];

  // Auto-play steps simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6">
      {/* Step Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => {
                setActiveStep(step.id);
                setIsActive(false); // pause auto play
              }}
              className={`p-4 rounded-2xl border text-center transition-all duration-500 relative flex flex-col items-center justify-center gap-2 ${
                isActive 
                  ? 'bg-white border-blue-300 text-slate-950 shadow-xl lift-3d scale-[1.03]' 
                  : 'bg-white/80 border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-white'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isActive ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'
              }`}>
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-bold tracking-tight">{step.label}</span>
              {isActive && (
                <motion.div 
                  layoutId="activeDot"
                  className="absolute -bottom-1 w-2 h-2 rounded-full bg-blue-600 shadow-lg" 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Bento Grid Area displaying current pipeline stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Main Details Panel */}
        <div className="md:col-span-8 bg-white/80 surface-3d p-8 md:p-10 border border-slate-200 rounded-3xl backdrop-blur-sm flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-[9px] font-bold bg-blue-50 text-blue-700 rounded-full uppercase tracking-wider border border-blue-200">
                  {steps[activeStep].bullet}
                </span>
                <span className="text-slate-500 font-mono text-xs">المرحلة {activeStep + 1} من 5</span>
              </div>
              <h3 className="font-serif text-3xl font-black text-slate-950 leading-tight">
                {steps[activeStep].title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed pt-2">
                {steps[activeStep].details}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between border-t border-slate-200 mt-8 pt-4">
            <button
              onClick={() => setIsActive(!isPlaying)}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors flex items-center gap-2"
            >
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-blue-600 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isPlaying ? 'إيقاف مؤقت للمحاكاة تلقائياً' : 'تشغيل المحاكاة تلقائياً'}</span>
            </button>
            <span className="text-[10px] text-slate-500 font-mono">سير البيانات الذكي (Pipeline)</span>
          </div>
        </div>

        {/* Pipeline Progress / Live Flow Panel */}
        <div className="md:col-span-4 bg-white/80 surface-3d p-8 rounded-3xl text-slate-950 flex flex-col justify-between border border-slate-200 backdrop-blur-sm">
          <div>
            <h4 className="font-serif text-base mb-4 text-slate-700">مراقبة سيل التقييم</h4>
            <div className="space-y-4">
              {steps.map((st, i) => (
                <div key={st.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors duration-300 ${
                    activeStep >= i ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}>
                    {activeStep > i ? <Check size={12} /> : i + 1}
                  </div>
                  <span className={`text-xs font-semibold transition-colors duration-300 ${
                    activeStep === i 
                      ? 'text-blue-700 font-bold' 
                      : activeStep > i 
                        ? 'text-slate-600' 
                        : 'text-slate-400'
                  }`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <div className="p-3 bg-white/80 rounded-xl border border-slate-200">
              <span className="text-[9px] font-mono text-blue-700 uppercase tracking-widest block mb-1">الربط التنافسي</span>
              <p className="text-[10px] text-slate-500 leading-normal">
                كل مكالمة تمر بهذه المراحل تلقائياً خلال أقل من دقيقة، لتظهر لوحة تحكم فورية للإدارة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
