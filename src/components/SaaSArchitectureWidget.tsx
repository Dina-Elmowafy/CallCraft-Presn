import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Server, Users, MessageSquare, ClipboardCheck, ArrowUpRight, Check, AlertTriangle, ShieldCheck, Database, Bell } from 'lucide-react';

export const SaaSArchitectureWidget: React.FC = () => {
  const [role, setRole] = useState<'admin' | 'owner'>('admin');

  return (
    <div className="w-full max-w-5xl flex flex-col gap-6 h-auto min-h-[55vh]">
      
      {/* Role Switcher tabs */}
      <div className="flex justify-center shrink-0">
        <div className="bg-white/90 surface-3d p-1 rounded-2xl flex gap-1 border border-slate-200">
          <button
            onClick={() => setRole('admin')}
            className={`px-8 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              role === 'admin' 
                ? 'bg-blue-600 text-white shadow-lg font-black' 
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            <ShieldCheck size={16} />
            <span>لوحة تحكم الشركة (Admin)</span>
          </button>
          
          <button
            onClick={() => setRole('owner')}
            className={`px-8 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              role === 'owner' 
                ? 'bg-blue-600 text-white shadow-lg font-black' 
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            <Database size={16} />
            <span>لوحة مالك المنصة (SaaS Owner)</span>
          </button>
        </div>
      </div>

      {/* Dynamic Content Panel */}
      <div className="flex-1 bg-white/80 surface-3d p-8 md:p-10 border border-slate-200 rounded-3xl backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          {role === 'admin' ? (
            <motion.div
              key="admin-role"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <span className="px-3 py-1 bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/20 font-bold text-[9px] rounded-full uppercase tracking-wider">
                    إدارة فرع أو شركة كاملة
                  </span>
                  <h3 className="text-3xl font-serif font-black text-slate-950 mt-2">لوحة المشرف - Call Center Portal</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1.5 bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20 text-xs rounded-xl font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                    <span>تكامل واتساب: نشط</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed max-w-4xl">
                توفر لمدير المبيعات أو مشرف الجودة رؤية فورية وشاملة لأداء جميع الوكلاء (Agents)، فحص درجات الجودة الإجمالية لكل اتصال ومعدل الالتزام بالسيناريوهات والسكريبتات المحددة سلفاً.
              </p>

              {/* Grid of Interactive Admin Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 bg-white/80 rounded-2xl border border-slate-200">
                  <Bell size={24} className="text-[#C5A059] mb-3" />
                  <h4 className="font-bold text-slate-950 text-sm mb-1">تقارير واتساب الذكية</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    إرسال ملخصات مآلات الاتصال فوراً للوكيل والمشرف لضمان الاستمرارية والتعلم من الأخطاء.
                  </p>
                </div>
                <div className="p-5 bg-white/80 rounded-2xl border border-slate-200">
                  <Users size={24} className="text-[#C5A059] mb-3" />
                  <h4 className="font-bold text-slate-950 text-sm mb-1">تتبع مستويات الوكلاء</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    تصنيف وتصعيد الموظفين الذين يعانون من مشاكل إغلاق أو مهارات تواصل ضعيفة لمعونتهم تدريبياً.
                  </p>
                </div>
                <div className="p-5 bg-white/80 rounded-2xl border border-slate-200">
                  <ClipboardCheck size={24} className="text-[#C5A059] mb-3" />
                  <h4 className="font-bold text-slate-950 text-sm mb-1">تصدير التقارير المتنوعة</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    صياغة وتحميل تقارير ذكية بنقرة واحدة بصيغ PDF لمكالمات منفردة أو جداول CSV لجميع المكالمات.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="owner-role"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <span className="px-3 py-1 bg-[#DBBE83]/15 text-[#DBBE83] border border-[#DBBE83]/20 font-bold text-[9px] rounded-full uppercase tracking-wider">
                    السلطة العليا للمنصة (SaaS Master)
                  </span>
                  <h3 className="text-3xl font-serif font-black text-slate-950 mt-2">لوحة مالك منصة كول كرافت السحابية</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs font-mono font-bold border border-slate-200 px-3 py-1 rounded-full bg-white/80">باقة الشركات (Multi-Tenancy)</span>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed max-w-4xl">
                تمنح مالك المشروع (Owner) نظرة فوقية على كامل الشركات والعملاء المشتركين في المنصة، والتحكم في حدود الخطط اليومية وحصص استدعاء الـ APIs، ومتابعة الفواتير وحالات الاشتراك.
              </p>

              {/* Grid of Interactive Owner Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 bg-white/80 rounded-2xl border border-slate-200">
                  <Server size={24} className="text-[#C5A059] mb-3" />
                  <h4 className="font-bold text-slate-950 text-sm mb-1">إدارة حدود وباقات المؤسسات</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    تعديل وتحديد سقف الاستهلاك (عدد الدقائق المخصصة، عدد المبيعات، ومعدل الاستدلال) لكل مالك شركة.
                  </p>
                </div>
                <div className="p-5 bg-white/80 rounded-2xl border border-slate-200">
                  <ArrowUpRight size={24} className="text-[#C5A059] mb-3" />
                  <h4 className="font-bold text-slate-950 text-sm mb-1">النمو اللانهائي كـ SaaS</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    قابلية بيع الخدمة والاشتراكات لمئات الشركات في وقت واحد عبر خادم ربط سحابي ومعزول البيانات.
                  </p>
                </div>
                <div className="p-5 bg-white/80 rounded-2xl border border-slate-200">
                  <AlertTriangle size={24} className="text-[#C5A059] mb-3" />
                  <h4 className="font-bold text-slate-950 text-sm mb-1">إنذارات تخطي الحدود</h4>
                  <p className="text-slate-500 text-[10px] leading-relaxed">
                    إرسال تنبيهات تلقائية للشركات عند اقتراب انتهاء اشتراكهم أو نفاد السعة التخزينية لإثارة الترقية.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-500 tracking-wider">
          <span>CALLCRAFT SaaS Stack</span>
          <span>تطوير وإيجاز احترافي</span>
        </div>

      </div>
    </div>
  );
};
