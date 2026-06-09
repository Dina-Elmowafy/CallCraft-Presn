import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, EyeOff, Ban, Frown, Sparkles, CheckCircle2 } from 'lucide-react';

interface Problem {
  id: string;
  icon: any;
  title: string;
  desc: string;
  pain: string; // The painful legacy behavior
  solution: string; // How CallCraft automates it
}

export const ProblemCards: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('1');

  const problems: Problem[] = [
    {
      id: '1',
      icon: AlertCircle,
      title: 'التقييم العشوائي البطيء',
      desc: 'الشركات تغطي أقل من 1-2% فقط من مكالماتها يدوياً بسبب غلاء تكلفة وقت مدراء الجودة والـ QA.',
      pain: 'مدير جودة يستمع عشوائياً لمكالمتين شهرياً لكل موظف ويغفل عن 98% من الأخطاء المتكررة.',
      solution: 'تحليل آلي فوري لـ 100% من المكالمات فور انتهائها وتوليد تقييم QA دقيق بدون أي تدخل بشري.'
    },
    {
      id: '2',
      icon: EyeOff,
      title: 'ضياع ثروة التفاصيل',
      desc: 'تفاصيل هامة واعتراضات العميل الحقيقية تضيع داخل التسجيلات المتراكمة دون توثيق حقيقي.',
      pain: 'الاعتماد على انطباعات الموظف الشخصية وكتابة ملاحظات مبهمة مثل "العميل يفكر بالعرّض".',
      solution: 'تفريغ نصي كامل، استخراج نية العميل، تصنيف مخاوفه ونقاط ألمه بدقة بالغة بالذكاء الاصطناعي.'
    },
    {
      id: '3',
      icon: Ban,
      title: 'خسارة الصفقات الغامضة',
      desc: 'الإدارة لا تعرف السبب الفعلي لانسحاب العميل، هل المشكلة من سوء العرض، أم التسعير، أم التسويق؟',
      pain: 'تبادل اللوم بين التسويق والمبيعات: المبيعات تشتكي جودة العملاء، والتسويق يتهم أداء الموظفين.',
      solution: 'تصنيف ذكي فوري للمشكلة: (Marketing Problem / Sales Problem) لوضع الإصبع على موضع الخلل بدقة.'
    },
    {
      id: '4',
      icon: Frown,
      title: 'سكريبت غير منضبط',
      desc: 'ضعف التزام الموظفين بالسكريبت البيعي، طريقة ترحيب باردة، أو إغفال التذكير بأكواد الخصم لتسريع الشراء.',
      pain: 'خسارة مبيعات مؤكدة بسبب نسيان الموظف الميزات التنافسية أو التعامل غير المهذب مع الاعتراض.',
      solution: 'مراقبة آلية لجميع قواعد الجودة والتحقق من التزام الموظف بالخطوات مع تقديم نصائح تدريبية مخصصة للحال.'
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl items-stretch">
      {/* Selector Side */}
      <div className="lg:w-1/2 flex flex-col gap-2.5 justify-center">
        {problems.map((prob) => {
          const Icon = prob.icon;
          const isActive = activeId === prob.id;
          return (
            <button
              key={prob.id}
              onClick={() => setActiveId(prob.id)}
              className={`p-4 rounded-2xl border text-right transition-all duration-300 flex items-center gap-4 w-full ${
                isActive 
                  ? 'bg-white border-blue-300 shadow-xl lift-3d text-slate-950' 
                  : 'bg-white/70 border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-white'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isActive ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'
              }`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm md:text-base leading-tight mb-1">{prob.title}</h4>
                <p className={`text-xs ${isActive ? 'text-blue-700' : 'text-slate-500'} line-clamp-1`}>{prob.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Comparison Detail Side */}
      <div className="lg:w-1/2 flex items-center">
        <AnimatePresence mode="wait">
          {problems.map((prob) => {
            if (prob.id !== activeId) return null;
            return (
              <motion.div
                key={prob.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white/85 surface-3d p-5 md:p-6 rounded-3xl border border-slate-200 shadow-xl lift-3d backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-black text-slate-950 mb-3">{prob.title}</h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4">{prob.desc}</p>
                  
                  <div className="space-y-3">
                    {/* Pain Legacy */}
                    <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                      <div className="flex items-center gap-3 mb-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                        <AlertCircle size={16} className="text-amber-600" />
                        <span>ما يحدث تقليدياً (المظهر المؤلم)</span>
                      </div>
                      <p className="text-amber-950/75 text-xs leading-relaxed font-medium">{prob.pain}</p>
                    </div>

                    {/* Solution CallCraft */}
                    <div className="p-3.5 bg-blue-600 text-white rounded-2xl transform hover:scale-[1.01] transition-transform shadow-lg shadow-blue-600/20">
                      <div className="flex items-center gap-3 mb-2 text-white font-black text-xs uppercase tracking-wider">
                        <Sparkles size={16} className="animate-spin [animation-duration:15s]" />
                        <span>كيف يحلها CALLCRAFT الذكي؟</span>
                      </div>
                      <p className="text-white/95 text-xs leading-relaxed font-bold">{prob.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-500 tracking-wider">
                  <span>تم الفهم والتشخيص</span>
                  <div className="flex items-center gap-2 text-blue-700">
                    <CheckCircle2 size={14} />
                    <span>جاهز للأتمتة</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
