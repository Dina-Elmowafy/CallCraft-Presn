import React from 'react';
import { motion } from 'motion/react';

interface GlowBackgroundProps {
  currentSlideType?: string;
}

export const GlowBackground: React.FC<GlowBackgroundProps> = ({ currentSlideType }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Light presentation canvas */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{
          background:
            'radial-gradient(circle at 18% 12%, rgba(59,130,246,0.18), transparent 28%), radial-gradient(circle at 84% 18%, rgba(14,165,233,0.12), transparent 26%), linear-gradient(135deg, #F9FCFF 0%, #EEF7FF 46%, #F7F8FF 100%)'
        }}
      />

      <div className="absolute inset-x-[7%] top-[16%] h-[74%] rounded-[4rem] bg-white/22 blur-3xl opacity-70" />
      <div
        className="absolute left-[12%] right-[12%] bottom-[-24%] h-[34%] opacity-45"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.20), transparent 68%)',
          transform: 'perspective(900px) rotateX(64deg)'
        }}
      />

      {/* Soft dot matrix */}
      <motion.div 
        animate={{
          backgroundPosition: ['0px 0px', '32px 32px', '0px 64px']
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `radial-gradient(#B8C7E8 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <motion.div
        animate={{
          x: ['-10%', '8%', '-10%'],
          y: ['0%', '5%', '0%'],
          rotate: [0, 4, 0]
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[8%] w-[55rem] h-[24rem] rounded-[45%_55%_48%_52%] bg-white/28 blur-2xl opacity-70"
      />

      <motion.div
        animate={{
          x: ['8%', '-8%', '8%'],
          y: ['4%', '-3%', '4%'],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[10%] right-[10%] w-[46rem] h-[18rem] rounded-[60%_40%_56%_44%] bg-blue-100/35 blur-2xl opacity-75"
      />

      {/* Soft blue light fields */}
      <div className="absolute inset-0 filter blur-[120px] opacity-45">
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-15%] left-[20%] w-[40rem] h-[40rem] rounded-full bg-sky-200/60"
        />

        <motion.div
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-10%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-indigo-200/55"
        />

        <motion.div
          animate={{
            scale: [1, 1.25, 0.85, 1],
            opacity: [0.2, 0.4, 0.2, 0.2]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[35%] left-[30%] w-[20rem] h-[20rem] rounded-full bg-cyan-100/70"
        />
      </div>

      {/* Floating clean accents */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[2px] h-[30px] bg-gradient-to-b from-sky-400/40 to-transparent" />
        <div className="absolute top-2/3 right-1/4 w-[30px] h-[2px] bg-gradient-to-r from-transparent to-indigo-400/40" />
        <div className="absolute top-1/3 left-2/3 w-1 h-1 bg-sky-500 rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* Decorative vertical editorial line */}
      <div className="absolute top-0 right-12 w-[1px] h-full bg-slate-900/5" />
      <div className="absolute top-0 left-12 w-[1px] h-full bg-slate-900/5" />
    </div>
  );
};
