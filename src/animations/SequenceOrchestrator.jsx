import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useOrderStore from '../store/useOrderStore';
import SpeechBubble from './SpeechBubble';
import Aurora from '../components/reactbits/Aurora';

const STEP_BG_COLORS = {
  awakening:  { one: 'hsla(36, 60%, 95%, 0.25)', two: 'hsla(270, 40%, 70%, 0.2)' },
  mold:       { one: 'hsla(36, 60%, 95%, 0.2)', two: 'hsla(30, 50%, 60%, 0.2)' },
  mixing:     { one: 'hsla(340, 80%, 85%, 0.3)', two: 'hsla(200, 70%, 80%, 0.2)' },
  pouring:    { one: 'hsla(200, 70%, 80%, 0.3)', two: 'hsla(140, 35%, 55%, 0.2)' },
  baking:     { one: 'hsla(350, 65%, 78%, 0.4)', two: 'hsla(30, 70%, 50%, 0.4)' },
  cooling:    { one: 'hsla(200, 70%, 80%, 0.3)', two: 'hsla(180, 50%, 60%, 0.2)' },
  decorating: { one: 'hsla(340, 80%, 85%, 0.4)', two: 'hsla(140, 35%, 55%, 0.2)' },
  packaging:  { one: 'hsla(200, 70%, 80%, 0.3)', two: 'hsla(280, 40%, 70%, 0.2)' },
  shipping:   { one: 'hsla(200, 70%, 80%, 0.4)', two: 'hsla(160, 50%, 60%, 0.2)' },
  delivered:  { one: 'hsla(42, 85%, 65%, 0.4)', two: 'hsla(340, 80%, 85%, 0.3)' },
};

export default function SequenceOrchestrator() {
  const { currentOrder, animationStep, currentMessage, showSpeechBubble } = useOrderStore();
  const [currentLayer, setCurrentLayer] = useState(0);

  useEffect(() => {
    if (animationStep) {
      const stepIdx = useOrderStore.getState().getStepIndex(animationStep);
      setCurrentLayer(stepIdx);
    }
  }, [animationStep]);

  if (!currentOrder) return null;

  const bgColors = STEP_BG_COLORS[animationStep] || {};

  return (
    <div className="sequence-orchestrator relative w-full h-screen overflow-hidden bg-[var(--fukai-deep)]">
      <Aurora
        className="z-[var(--z-bg)]"
        colorOne={bgColors.one || 'hsla(340, 80%, 85%, 0.3)'}
        colorTwo={bgColors.two || 'hsla(270, 40%, 70%, 0.25)'}
        speed={animationStep === 'baking' ? 0.5 : 1}
      />

      <div className="absolute inset-0 z-[var(--z-parallax)] pointer-events-none">
        {animationStep === 'mold' && (
          <div className="absolute bottom-0 left-1/4 right-1/4 h-24 bg-gradient-to-t from-[var(--fukai-cream)]/10 to-transparent blur-xl" />
        )}
        {animationStep === 'mixing' && (
          <>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[var(--fukai-matcha)]/20"
                style={{
                  width: `${6 + Math.random() * 10}px`,
                  height: `${6 + Math.random() * 10}px`,
                  top: `${15 + Math.random() * 70}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animation: `steamRise ${2 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </>
        )}
        {animationStep === 'pouring' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--fukai-cream)]/5 rounded-full blur-xl animate-[floatGentle_3s_ease-in-out_infinite]" />
        )}
        {animationStep === 'cooling' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--fukai-deep)] via-[var(--fukai-deep)]/80 to-transparent pointer-events-none" />
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[var(--fukai-sakura)]/10"
                style={{
                  width: `${10 + Math.random() * 15}px`,
                  height: `${10 + Math.random() * 15}px`,
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animation: `floatGentle ${4 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </>
        )}
        {animationStep === 'decorating' && (
          <>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[var(--fukai-sakura)]/20"
                style={{
                  width: `${8 + Math.random() * 12}px`,
                  height: `${8 + Math.random() * 12}px`,
                  top: `${20 + Math.random() * 60}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animation: `floatGentle ${3 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </>
        )}
        {animationStep === 'delivered' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl animate-[floatGentle_2s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}>🎉</div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showSpeechBubble && currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-[var(--z-speech)] max-w-md w-[90%]"
          >
            <SpeechBubble message={currentMessage} cooker={currentOrder.cocinero} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-[var(--z-cooker)] transition-all duration-1000 ${animationStep === 'shipping' ? '-translate-x-[100vw]' : ''}`}>
      </div>
    </div>
  );
}