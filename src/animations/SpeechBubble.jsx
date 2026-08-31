import React from 'react';

const COLORS = {
  kitty:  'var(--fukai-sakura-deep)',
  kato:   'var(--fukai-matcha-soft)',
  chiwi:  'var(--fukai-caramel-soft)',
};

export default function SpeechBubble({ message, cooker }) {
  const bgColor = COLORS[cooker] || 'var(--fukai-cream)';
  
  return (
    <div 
      className="glass px-6 py-4 max-w-md text-center text-[var(--fukai-deep)] font-display font-medium text-lg relative"
      style={{ backgroundColor: bgColor }}
    >
      <p>{message}</p>
      {/* Triangle pointer */}
      <div 
        className="absolute w-4 h-4 rotate-45 -bottom-2 left-1/2 -translate-x-1/2"
        style={{ backgroundColor: bgColor }}
      />
    </div>
  );
}
