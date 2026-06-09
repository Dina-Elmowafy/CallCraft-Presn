import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Check, AlertCircle, Sparkles, RefreshCw, Star, Heart, TrendingUp, Sliders, Play, Pause, ChevronLeft } from 'lucide-react';
import { PresetCall } from '../types';
import { presetCalls } from '../data/presetCalls';

export const LiveSandboxDemo: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('1');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [activeCallReport, setActiveCallReport] = useState<PresetCall | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [playingSegment, setPlayingSegment] = useState<number | null>(null);

  // Trigger analysis simulation
  const startAnalysis = (call: PresetCall) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setActiveCallReport(null);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setActiveCallReport(call);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  // Run initial call report on mount
  useEffect(() => {
    const defaultCall = presetCalls.find(c => c.id === selectedPresetId);
    if (defaultCall) {
      setActiveCallReport(defaultCall);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    setUploadedFileName(file.name);
    // Dynamically generate a custom call report for the uploaded file!
    const customCall: PresetCall = {
      id: 'custom',
      title: `ملف مرفوع: ${file.name}`,
      description: 'تحليل مخصص للملف الصوتي المرفوع من قبلك',
      audioDuration: '2:30',
      agentName: 'الوكيل السحابي',
      type: 'sale',
      qaScore: 88,
      sentiment: 'positive',
      classifiedAs: 'No Clear Problem',
      strengths: [
        'الالتزام بالترحيب والتحية الافتتاحية طبقاً لسياسة المتجر في الثانية 04.',
        'نبرة هادئة ومتعاطفة ساعدت في توثيق العلاقة مع العميل.',
        'فهم الاحتياج الأساسي وتقدير المخاوف المتعلقة بالشحن والمواعيد.'
      ],
      weaknesses: [
        'لم يتم التذكير بأكواد الخصم لتسريع إتمام صفقة البيع.'
      ],
      recommendation: 'أداء العام جيد وواعد جداً. يوصى فقط بحث الوكيل على الالتزام بالتذكير بأكواد الخصم والبدائل السريعة لزيادة دقة الإغلاق الكلي للمكالمات البيعية.',
      transcript: [
        { speaker: 'Agent', time: '00:03', text: 'أهلاً بك ممتنون لاتصالك، معك الدعم الذكي كيف يمكنني مساعدتك؟' },
        { speaker: 'Customer', time: '00:15', text: 'أهلاً، واجهتني مشكلة أثناء تفعيل باقة مبيعات SaaS وأريد حلاً لمشكلة الربط.' },
        { speaker: 'Agent', time: '00:32', text: 'أتفهمك تماماً. سأقوم بإرسال كود التفعيل الذكي فوراً ونبدأ دمج النظام مع خدماتكم اليوم.' }
      ]
    };
    startAnalysis(customCall);
  };

  return (
    <div className="w-full max-w-6xl flex flex-col gap-3 text-right text-[0.86rem]" dir="rtl">
      
      {/* Upper Control Grid (Preset selection & File uploader) */}
      {!isAnalyzing && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch shrink-0">
          
          {/* Preset Buttons */}
          <div className="lg:col-span-7 bg-white/80 p-4 rounded-3xl border border-slate-200 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <h4 className="font-serif text-slate-950 text-sm font-bold mb-3 flex items-center gap-2">
                <Sliders size={18} className="text-[#C5A059]" />
                <span>اختر مكالمة مسجلة مسبقاً وتفحص تحليلها</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {presetCalls.map((call) => {
                  const isSelected = selectedPresetId === call.id && !uploadedFileName;
                  return (
                    <button
                      key={call.id}
                      onClick={() => {
                        setUploadedFileName(null);
                        setSelectedPresetId(call.id);
                        startAnalysis(call);
                      }}
                      className={`p-3 rounded-2xl border text-right transition-all duration-300 flex flex-col justify-between h-24 cursor-pointer ${
                        isSelected 
                          ? 'bg-white border-blue-300 text-slate-950 shadow-lg shadow-blue-200/60' 
                          : 'bg-white/80 border-slate-200 text-slate-600 hover:border-slate-200 hover:bg-white'
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-tight block truncate mb-1">{call.title}</span>
                      <span className={`text-[8px] uppercase tracking-wider font-semibold block mb-2 ${
                        isSelected ? 'text-blue-700' : 'text-slate-500'
                      }`}>
                        الموظف: {call.agentName} | المدة: {call.audioDuration}
                      </span>
                      <span className="text-[9px] font-bold text-blue-700 flex items-center gap-1 mt-auto">
                        <span>ابدأ التحليل</span>
                        <ChevronLeft size={10} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Drag and Drop File Uploader */}
          <div className="lg:col-span-5">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`h-full p-6 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer relative ${
                dragOver 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 bg-white/80 hover:border-blue-300 hover:bg-white'
              }`}
            >
              <input 
                type="file" 
                id="file-upload" 
                accept="audio/*" 
                onChange={handleFileInput}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload size={30} className={`${dragOver ? 'text-blue-600 animate-bounce' : 'text-slate-500'} mb-2`} />
              <h5 className="font-bold text-slate-950 text-xs mb-1">اسحب ملف مكالمة صوتية أو انقر هنا</h5>
              <p className="text-[9px] text-slate-500 max-w-xs leading-normal">
                ندعم جميع صيغ الصوت: MP3, WAV, M4A, OGG وغيرها. النظام يتعرف فوراً على الموظف ويبدأ التحليل.
              </p>
              {uploadedFileName && (
                <div className="mt-3 px-3 py-1 bg-blue-50 border border-blue-200 rounded-lg text-[10px] text-blue-700 font-bold block">
                  {uploadedFileName}
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Analyzing Progress Loader Screen */}
      <AnimatePresence mode="wait">
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full bg-white/80 border border-slate-200 text-slate-950 rounded-3xl p-16 flex flex-col items-center justify-center text-center shadow-xl min-h-[45vh] backdrop-blur-sm"
          >
            <RefreshCw size={48} className="text-blue-600 animate-spin mb-6" />
            <h3 className="font-serif text-3xl font-black mb-2">جاري استجماع وفك تشفير المكالمة...</h3>
            <p className="text-slate-500 text-[10px] tracking-wider uppercase mb-8 font-mono">
              FastAPI AI Engine is analyzing audio vectors & hash matching
            </p>
            <div className="w-full max-w-md h-1.5 bg-white rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.55)]"
                animate={{ width: `${analysisProgress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-blue-700 mt-3">{analysisProgress}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Dissected Report View */}
      {!isAnalyzing && activeCallReport && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch backdrop-blur-sm max-h-[44vh]"
        >
          {/* Detailed Transcript & QA parameters (Left Side) */}
          <div className="lg:col-span-8 p-5 md:p-6 flex flex-col justify-between border-l border-slate-200 bg-sky-50/85 overflow-hidden">
            <div>
              {/* Header Title */}
              <div className="flex justify-between items-start pb-4 border-b border-slate-200 mb-4">
                <div>
                  <h3 className="text-2xl font-serif font-black text-slate-950 mb-1">{activeCallReport.title}</h3>
                  <p className="text-xs text-slate-500">{activeCallReport.description}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  activeCallReport.classifiedAs === 'No Clear Problem' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : activeCallReport.classifiedAs === 'Sales Problem'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  تصنيف المشكلة الكلي: {activeCallReport.classifiedAs === 'No Clear Problem' ? 'مكالمة ناجحة ومثالية' : activeCallReport.classifiedAs}
                </span>
              </div>

              {/* Chat Transcript Area */}
              <div className="space-y-2 max-h-[17vh] overflow-y-auto pr-3 mb-3">
                <h4 className="font-serif text-slate-700 text-sm font-bold mb-2">التفريغ النصي الذكي والمنسق:</h4>
                {activeCallReport.transcript.map((lines, i) => {
                  const isAgent = lines.speaker === 'Agent';
                  const isPlayingThis = playingSegment === i;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setPlayingSegment(isPlayingThis ? null : i)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isPlayingThis 
                          ? 'bg-blue-50 border-blue-200 shadow-sm' 
                          : 'bg-white/80 border-transparent hover:border-slate-200 hover:bg-white'
                      } flex flex-col gap-1.5`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className={`px-2 py-0.5 rounded ${
                          isAgent ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}>
                          {isAgent ? `الوكيل ${activeCallReport.agentName}` : 'العميل المستفسر'}
                        </span>
                        <div className="flex items-center gap-2">
                          {isPlayingThis ? <Pause size={10} className="text-blue-600 animate-pulse" /> : <Play size={10} className="text-slate-500" />}
                          <span className="font-mono text-slate-500">{lines.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">{lines.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* Strengths & Weaknesses block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                {/* Strengths */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                    <Check size={16} className="text-emerald-400" />
                    <span>نقاط قوة موظفك بالمكالمة:</span>
                  </h5>
                  <div className="space-y-1.5">
                    {activeCallReport.strengths.map((str, sIdx) => (
                      <div key={sIdx} className="text-[11px] text-slate-600 leading-normal flex gap-2">
                        <span className="text-blue-600 shrink-0">•</span>
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weaknesses */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-amber-700 flex items-center gap-2">
                    <AlertCircle size={16} className="text-amber-600" />
                    <span>نقاط الضعف الفورية بالمكالمة:</span>
                  </h5>
                  <div className="space-y-1.5">
                    {activeCallReport.weaknesses.map((weak, wIdx) => (
                      <div key={wIdx} className="text-[11px] text-slate-600 leading-normal flex gap-2">
                        <span className="text-amber-600 shrink-0">•</span>
                        <span>{weak}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[9px] font-mono text-slate-500 mt-6 select-none uppercase tracking-widest text-left">
              CallCraft Dissected Intelligence Report
            </div>
          </div>

          {/* AI Trainer Coach Recommendations (Right Side) */}
          <div className="lg:col-span-4 bg-white/80 text-slate-950 p-5 md:p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-r border-slate-200 font-sans overflow-hidden">
            <div className="space-y-3">
              
              {/* QA Rating badge */}
              <div className="text-center p-4 bg-white/80 rounded-3xl border border-slate-200">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-2">الدرجة النهائية الكلية</span>
                <div className="text-6xl font-serif font-black text-blue-700 mb-2">{activeCallReport.qaScore}%</div>
                <div className="flex justify-center text-blue-600 gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIdx) => {
                    const stars = Math.round(activeCallReport.qaScore / 20);
                    return <Star key={starIdx} size={14} fill={starIdx < stars ? "currentColor" : "none"} className={starIdx < stars ? "text-blue-600" : "text-slate-950/10"} />;
                  })}
                </div>
              </div>

              {/* Sentiment Block */}
              <div className="space-y-2 font-black">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">نبرة مشاعر العميل الكلية:</span>
                <div className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-2xl border border-slate-200">
                  <Heart size={16} className={
                    activeCallReport.sentiment === 'positive' 
                      ? 'text-emerald-500 fill-emerald-500' 
                      : activeCallReport.sentiment === 'negative'
                        ? 'text-red-400 fill-red-400'
                        : 'text-amber-400 fill-amber-400'
                  } />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-950">
                    {activeCallReport.sentiment === 'positive' ? 'إيجابي وراضٍ' : activeCallReport.sentiment === 'negative' ? 'غاضب ومتذمر' : 'محايد'}
                  </span>
                </div>
              </div>

              {/* Recommendation Coach */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-600" />
                  <span>توصية مدرب كول كرافت الـ AI:</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-blue-50 p-4 rounded-2xl border border-blue-200 font-sans">
                  {activeCallReport.recommendation}
                </p>
              </div>

            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="text-[10px] font-bold text-blue-700 flex items-center gap-2 justify-center">
                <TrendingUp size={14} />
                <span>تعيين أثر التدريب التلقائي</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
};
