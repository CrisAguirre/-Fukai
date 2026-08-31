import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useOrderStore from '../store/useOrderStore';
import SpeechBubble from './SpeechBubble';
import Aurora from '../components/reactbits/Aurora';

export default function SequenceOrchestrator({ children }) {
  const { currentOrder, animationStep, currentMessage, isAnimating, showSpeechBubble, getStepIndex } = useOrderStore();
  const [currentLayer, setCurrentLayer] = useState(0);

  useEffect(() => {
    if (animationStep) {
      const stepIdx = getStepIndex(animationStep);
      setCurrentLayer(stepIdx);
    }
  }, [animationStep, getStepIndex]);

  // Determine which background effect to show based on step
  const getAuroraColors = () => {
    switch (animationStep) {
      case 'awakening': return { colorOne: 'hsla(36, 60%, 95%, 0.3)' }; // Soft morning
      case 'baking': return { colorOne: 'hsla(350, 65%, 78%, 0.4)', colorTwo: 'hsla(30, 70%, 50%, 0.4)' }; // Warm
      case 'decorating': return { colorOne: 'hsla(340, 80%, 85%, 0.4)' }; // Sweet
      case 'shipping': return { colorOne: 'hsla(200, 70%, 80%, 0.4)' }; // Sky
      default: return {}; // Default colors
    }
  };

  if (!currentOrder) return null;

  return (
    <div className="sequence-orchestrator relative w-full h-screen overflow-hidden bg-[var(--fukai-deep)]">
      {/* Background Layer: React Bits Aurora */}
      <Aurora className="z-[var(--z-bg)]" {...getAuroraColors()} />

      {/* 3D Canvas Layer: Passed as children to be handled by R3F */}
      <div className="absolute inset-0 z-[var(--z-canvas3d)] pointer-events-none">
        {children}
      </div>

      {/* UI Overlay Layer: Messages and Animations */}
      <AnimatePresence>
        {showSpeechBubble && currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-[var(--z-speech)]"
          >
            <SpeechBubble message={currentMessage} cooker={currentOrder.cocinero} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2D Cooker Animation Layer (fallback/overlay if 3D is not fully covering it) */}
      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-[var(--z-cooker)] transition-all duration-1000 ${animationStep === 'shipping' ? 'translate-x-[100vw]' : ''}`}>
         {/* We will rely on 3D models primarily, but this is here for 2D character sprites if needed */}
      </div>
      
      {/* Visual Effects Layer (CSS Particles, etc.) */}
      <div className="absolute inset-0 z-[var(--z-parallax)] pointer-events-none">
         {animationStep === 'baking' && <div className="steam-container"></div>}
         {animationStep === 'decorating' && <div className="sparkles-container"></div>}
      </div>
    </div>
  );
}
