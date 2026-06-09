import React from 'react';

export const CallcraftLogo: React.FC = () => {
  return (
    <div className="flex items-center rounded-3xl bg-white/80 p-2 surface-3d logo-3d" aria-label="CallCraft logo">
      <img
        src="/callcraft-logo.jpeg"
        alt="CallCraft"
        className="w-20 h-20 object-contain rounded-2xl"
      />
    </div>
  );
};
