import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Activity, CheckSquare, Zap, Shield, HelpCircle } from 'lucide-react';

export const QaScoreGauge: React.FC = () => {
  const [comm, setComm] = useState<number>(85);
  const [empathy, setEmpathy] = useState<number>(90);
  const [efficiency, setEfficiency] = useState<number>(75);
  const [compliance, setCompliance] = useState<number>(92);
  const [qaScore, setQaScore] = useState<number>(85);

  useEffect(() => {
    const average = (comm + empathy + efficiency + compliance) / 4;
    setQaScore(Math.round(average));
  }, [comm, empathy, efficiency, compliance]);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-blue-600 stroke-blue-600';
    if (score >= 65) return 'text-sky-600 stroke-sky-600';
    return 'text-rose-600 stroke-rose-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 border-emerald-200 text-emerald-900';
    if (score >= 65) return 'bg-amber-50 border-amber-200 text-amber-900';
    return 'bg-red-50 border-red-200 text-red-900';
  };

  const getScoreOpinion = (score: number) => {
    if (score >= 85) return 'أداء مكالمة مبيعات ذي جودة فائقة (ممتاز)';
    if (score >= 65) return 'أداء مكالمة متوسط يحتاج لبعض جلسات المتابعة المنفصلة';
    return 'أداء مكالمة ضعيف جداً يتطلب تدريب إلزامي أو تنبيه الإدارة';
  };

  return (
    <div className="w-full max-w-5xl bg-white/90 surface-3d p-5 md:p-7 rounded-3xl border border-slate-200 shadow-xl lift-3d grid grid-cols-1 md:grid-cols-12 gap-6 items-center h-auto md:h-[55vh] backdrop-blur-sm overflow-hidden">
      
      {/* Interactive Sliders (Left Side) */}
      <div className="md:col-span-7 space-y-4">
        <h4 className="font-serif text-slate-950 text-lg font-bold mb-3">تحديث فوري لمعايير التقييم الإداري</h4>
        
        {/* Sliders loop */}
        {[
          { id: 'comm', label: 'مهارات التواصل العالي (Communication)', icon: Activity, val: comm, setVal: setComm, tint: 'accent-blue-600' },
          { id: 'empathy', label: 'التعاطف والذكاء العاطفي (Empathy)', icon: Heart, val: empathy, setVal: setEmpathy, tint: 'accent-blue-600' },
          { id: 'efficiency', label: 'سرعة وكفاءة حل المشكلة (Efficiency)', icon: Zap, val: efficiency, setVal: setEfficiency, tint: 'accent-blue-600' },
          { id: 'compliance', label: 'الالتزام بسكريبت وقواعد الشركة (Compliance)', icon: CheckSquare, val: compliance, setVal: setCompliance, tint: 'accent-blue-600' }
        ].map(item => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="space-y-1 bg-white surface-3d p-3 rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center text-xs font-bold">
                <div className="flex items-center gap-2 text-slate-500">
                  <Icon size={14} className="text-slate-500" />
                  <span>{item.label}</span>
                </div>
                <span className="font-mono text-blue-700">{item.val}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={item.val} 
                onChange={(e) => item.setVal(parseInt(e.target.value))}
                className={`w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer ${item.tint}`}
              />
            </div>
          );
        })}
      </div>

      {/* Dynamic SVG Gauge (Right Side) */}
      <div className="md:col-span-5 flex flex-col items-center justify-center text-center">
        <div className="relative w-44 h-44 flex items-center justify-center mb-4">
          
          {/* SVG Circular Gauge */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              className="stroke-slate-200 fill-none" 
              strokeWidth="6" 
            />
            {/* Progress circle */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="40" 
              className={`fill-none transition-colors duration-500 ${getScoreColor(qaScore)}`} 
              strokeWidth="8" 
              strokeDasharray={`${2 * Math.PI * 40}`}
              animate={{ strokeDashoffset: (2 * Math.PI * 40) * (1 - qaScore / 100) }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Numbers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              key={qaScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-serif font-black text-slate-950 tracking-tight"
            >
              {qaScore}
            </motion.span>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-1">QA Score</span>
          </div>
        </div>

        {/* Dynamic description box */}
        <div className={`p-4 rounded-2xl border text-xs font-semibold leading-normal w-full max-w-sm transition-all duration-500 ${getScoreBg(qaScore)}`}>
          <span>التقييم الذكي التلقائي: </span>
          <span className="font-bold block mt-1">{getScoreOpinion(qaScore)}</span>
        </div>
        
        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <Shield size={12} className="text-blue-600" />
          <span>تقييم موحد وموثق بنسبة 100% لجميع مكالماتك</span>
        </div>
      </div>
      
    </div>
  );
};
