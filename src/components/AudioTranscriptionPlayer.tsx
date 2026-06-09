import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, Search, FileText, Sparkles, BookOpen } from 'lucide-react';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer';

export const AudioTranscriptionPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'transcript' | 'summary'>('transcript');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalDuration = 70; // 70 seconds simulated

  const transcript = [
    { id: 1, speaker: 'Agent', name: 'أحمد', time: 2, text: 'أهلاً بك في كول كرافت للحلول الذكية، معكم أحمد من قسم المبيعات. كيف يمكنني مساعدتك وسماع احتياجك اليوم م. خالد؟' },
    { id: 2, speaker: 'Customer', name: 'م. خالد', time: 10, text: 'أهلاً أحمد، شكراً لك. تصفحت موقعكم وجذبني نظام تحليل المكالمات. لكن سؤالي الأهم: هل تدعمون اللغة العربية وبأدق المصطلحات واللهجات المحلية؟ لأن أغلب وكلائي يتحدثون بلهجات مختلطة.' },
    { id: 3, speaker: 'Agent', name: 'أحمد', time: 25, text: 'سؤال ممتاز وفي محله تماماً م. خالد! نظامنا كول كرافت مصمم خصيصاً ومطور لدعم العربية الفصحى اللهجات الخليجية والمصري والشامي بدقة متناهية تتخطى 95%. ولن نقوم فقط بتفريغ الكلام، بل بمتابعة نبرة الصوت والمشاعر وتصنيف اعتراضات العملاء تلقائياً.' },
    { id: 4, speaker: 'Customer', name: 'م. خالد', time: 42, text: 'رائع جداً ومبشر! لكن عندما رأيت أسعار الباقة المتقدمة وجدتها مكلفة بعض الشيء بالنسبة لشركتنا في الوقت الحالي. هل لديكم أي مرونة أو خصم؟' },
    { id: 5, speaker: 'Agent', name: 'أحمد', time: 54, text: 'أتفهم مخاوفك م. خالد وصغر حجم الميزانية في البداية. لكن فكر في الأمر كاستثمار: كول كرافت تمنع ضياع الصفقات وتجلب مبيعات مضاعفة بتحليل 100% من اتصالاتكم. وتقديراً لشركتكم التقنية الرائدة، يمكنني تفعيل عرض خاص لك اليوم: شهرين مجاناً بالكامل مع باقة الـ 20 موظف وبدء التهيئة وجلسة التدريب اليوم.' },
    { id: 6, speaker: 'Customer', name: 'م. خالد', time: 66, text: 'عرض ممتاز وعملي جداً يا أحمد! بصراحة هذا يحل قلقنا المادي ويجعلنا متحمسين جداً لبدء التجربة.' }
  ];

  // Play simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const filteredTranscript = transcript.filter(item => 
    item.text.includes(searchQuery) || item.name.includes(searchQuery)
  );

  return (
    <div className="w-full max-w-5xl bg-white/80 rounded-3xl border border-slate-200 shadow-xl lift-3d overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch h-[65vh] backdrop-blur-sm">
      
      {/* Player & Transcription Area (Left Side) */}
      <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between bg-sky-50/85 border-l border-slate-200">
        
        {/* Call Panel Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-[#C5A059] border border-slate-200">
              <BookOpen size={20} />
            </div>
            <div>
              <h4 className="font-bold text-slate-950 text-sm">تسجيل رقم #1093-مبيعات</h4>
              <p className="text-[10px] text-slate-500 font-mono">الموظف: أحمد بقسم مبيعات SaaS</p>
            </div>
          </div>
          
          {/* Quick Search */}
          <div className="relative max-w-[160px]">
            <input 
              type="text" 
              placeholder="بحث في الحوار..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white/80 border border-slate-200 text-xs rounded-xl focus:outline-none focus:border-[#C5A059] font-sans text-right text-slate-950"
            />
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        {/* Scrollable Chat Transcript */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[35vh]">
          {filteredTranscript.map((item, idx) => {
            const isAgent = item.speaker === 'Agent';
            const isHighlight = isPlaying && currentTime >= item.time && (idx === transcript.length - 1 || currentTime < transcript[idx + 1].time);
            
            return (
              <motion.div
                key={item.id}
                animate={{ 
                  scale: isHighlight ? 1.01 : 1,
                  backgroundColor: isHighlight ? 'rgba(197, 160, 89, 0.1)' : 'transparent',
                }}
                className={`p-3 rounded-2xl border transition-all duration-300 ${
                  isHighlight 
                    ? 'border-[#C5A059]/40 shadow-sm' 
                    : 'border-transparent'
                } flex flex-col gap-1.5`}
              >
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className={`px-2.5 py-0.5 rounded-full ${
                    isAgent ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {item.name} ({isAgent ? 'الموظف' : 'العميل'})
                  </span>
                  <span className="text-slate-500 font-mono">{formatTime(item.time)}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{item.text}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Call Progress Control Bar */}
        <div className="bg-white/80 surface-3d p-4 rounded-2xl border border-slate-200 shadow-sm mt-4 shrink-0">
          <AudioWaveformVisualizer count={24} isActive={isPlaying} color="bg-[#C5A059]" />
          
          <div className="flex items-center justify-between gap-4 mt-4">
            <span className="text-[10px] text-slate-500 font-mono">{formatTime(currentTime)}</span>
            
            {/* Input Slider */}
            <input 
              type="range" 
              min="0" 
              max={totalDuration} 
              value={currentTime}
              onChange={(e) => setCurrentTime(parseInt(e.target.value))}
              className="flex-1 h-1 bg-white rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
            />
            
            <span className="text-[10px] text-slate-500 font-mono">{formatTime(totalDuration)}</span>
          </div>

          <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-200">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-md font-bold"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <div className="flex items-center gap-2 text-slate-500">
              <Volume2 size={16} />
              <div className="w-16 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>

      </div>

      {/* Switchable Sidebar (Right Side - Summary & Insights) */}
      <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-white/80 text-slate-950 relative">
        <div className="space-y-6">
          {/* Tabs header */}
          <div className="grid grid-cols-2 p-1 bg-white/80 rounded-2xl mb-2 border border-slate-200">
            <button
              onClick={() => setActiveTab('transcript')}
              className={`py-2 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest ${
                activeTab === 'transcript' ? 'bg-blue-600 text-white shadow font-black' : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              تحويل الصوت لنص
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`py-2 text-[10px] font-bold rounded-xl transition-all uppercase tracking-widest ${
                activeTab === 'summary' ? 'bg-blue-600 text-white shadow font-black' : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              ملخص ذكي رائد
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'transcript' ? (
              <motion.div
                key="tab-transcript"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <FileText size={18} />
                  <h4 className="font-serif text-sm font-black uppercase tracking-wider">ميزات تحويل الصوت</h4>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-sans list-disc list-inside pr-1">
                  <li><strong>تفريع كامل منسق</strong> يوضح بدقة أي الموظفين والعملاء تحدث في أي اللحظات.</li>
                  <li><strong>قابل للبحث النصّي</strong> لتسهيل فلترة الكلمات الدلالية مثل الأسعار أو المنافسين.</li>
                  <li><strong>توثيق دائم</strong> لحفظ حقوق الشركة والتعجيل برفع جودة التقييم.</li>
                  <li><strong>تقليل وقت المراجعة</strong> من ساعات مسموعة إلى ثوانٍ مقروءة بتمحيص.</li>
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="tab-summary"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Sparkles size={18} className="animate-pulse" />
                  <h4 className="font-serif text-sm font-black uppercase tracking-wider">ملخص الإيجاز بالـ AI</h4>
                </div>
                
                <div className="space-y-3 text-xs leading-relaxed font-sans text-slate-600">
                  <div className="p-3 bg-white/80 rounded-xl border border-slate-200">
                    <span className="font-bold text-[#C5A059] block mb-1 text-[10px]">موضوع المكالمة الأساسي:</span>
                    <span>طلب استعلام عن تفعيل نظام كول كرافت وإبداء اعتراض حول سعر بعض الباقات المتقدمة.</span>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-slate-200">
                    <span className="font-bold text-[#C5A059] block mb-1 text-[10px]">احتياج العميل:</span>
                    <span>دعم اللهجة المحلية العربية، وتوفير تجربة آمنة لـ 20 موظف بأسعار مشجعة.</span>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-slate-200">
                    <span className="font-bold text-[#C5A059] block mb-1 text-[10px]">النتيجة النهائية:</span>
                    <span>إغلاق ناجح بتحديد موعد تفعيل باقة مبيعات مخصصة مع المبيعات اليوم.</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-6 border-t border-slate-200 text-[9px] font-mono text-slate-500 uppercase tracking-widest text-center">
          تفاعل آلي كامل بخلفية السيرفر
        </div>
      </div>
    </div>
  );
};
