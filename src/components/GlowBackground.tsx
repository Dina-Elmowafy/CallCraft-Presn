import React from 'react';

interface GlowBackgroundProps {
  currentSlideType?: string;
}

export const GlowBackground: React.FC<GlowBackgroundProps> = ({ currentSlideType }) => {
  const isNetwork =
    currentSlideType === 'network' ||
    currentSlideType === 'neural' ||
    currentSlideType === 'conclusion';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background:
            'radial-gradient(circle at 18% 12%, rgba(59,130,246,0.16), transparent 28%), radial-gradient(circle at 84% 18%, rgba(14,165,233,0.10), transparent 26%), linear-gradient(135deg, #F9FCFF 0%, #EEF7FF 46%, #F7F8FF 100%)',
        }}
      />

      <div className="absolute inset-x-[7%] top-[16%] h-[74%] rounded-[4rem] bg-white/30 opacity-70" />
      <div
        className="absolute left-[12%] right-[12%] bottom-[-24%] h-[34%] opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.18), transparent 68%)',
          transform: 'perspective(900px) rotateX(64deg)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage: 'radial-gradient(#B8C7E8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="absolute top-[20%] left-[8%] w-[55rem] h-[24rem] rounded-[45%_55%_48%_52%] bg-white/32 opacity-65" />
      <div className="absolute bottom-[10%] right-[10%] w-[46rem] h-[18rem] rounded-[60%_40%_56%_44%] bg-blue-100/35 opacity-70" />

      {isNetwork && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[18%] left-[20%] w-[26rem] h-[26rem] rounded-full bg-sky-200/45" />
          <div className="absolute bottom-[8%] right-[12%] w-[22rem] h-[22rem] rounded-full bg-indigo-200/35" />
        </div>
      )}

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[2px] h-[30px] bg-gradient-to-b from-sky-400/40 to-transparent" />
        <div className="absolute top-2/3 right-1/4 w-[30px] h-[2px] bg-gradient-to-r from-transparent to-indigo-400/40" />
        <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-sky-500 rounded-full" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
      </div>

      <div className="absolute top-0 right-12 w-[1px] h-full bg-slate-900/5" />
      <div className="absolute top-0 left-12 w-[1px] h-full bg-slate-900/5" />
    </div>
  );
};
