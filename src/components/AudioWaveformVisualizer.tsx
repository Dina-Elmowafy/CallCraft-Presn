import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AudioWaveformVisualizerProps {
  isActive?: boolean;
  color?: string;
  count?: number;
}

export const AudioWaveformVisualizer: React.FC<AudioWaveformVisualizerProps> = ({ 
  isActive = true, 
  color = "bg-indigo-600",
  count = 32
}) => {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Initialize heights
    setHeights(Array.from({ length: count }, () => Math.random() * 60 + 10));
    
    if (!isActive) return;

    const interval = setInterval(() => {
      setHeights(Array.from({ length: count }, () => Math.random() * 60 + 10));
    }, 150);

    return () => clearInterval(interval);
  }, [isActive, count]);

  return (
    <div className="flex items-center justify-center gap-1.5 h-24 px-4 w-full">
      {heights.map((height, i) => (
        <motion.div
          key={i}
          animate={{ height: isActive ? height : 10 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={`w-1 rounded-full ${color} opacity-80`}
        />
      ))}
    </div>
  );
};
