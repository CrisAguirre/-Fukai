import { motion } from 'motion/react';

const STEPS = [
  { key: 'pending',    label: 'Pendiente',    icon: '⏳' },
  { key: 'awakening',  label: 'Confirmar',    icon: '💬' },
  { key: 'mold',       label: 'Puesta a Punto', icon: '🧰' },
  { key: 'mixing',     label: 'Mezcla',       icon: '🥣' },
  { key: 'pouring',    label: 'Vertido',      icon: '🫗' },
  { key: 'baking',     label: 'Horneado',     icon: '🔥' },
  { key: 'cooling',    label: 'Enfriar',      icon: '❄️' },
  { key: 'decorating', label: 'Decorar',      icon: '🎨' },
  { key: 'packaging',  label: 'Empaque',      icon: '📦' },
  { key: 'shipping',   label: 'Entrega',      icon: '🏍️' },
  { key: 'delivered',  label: 'Entregado',    icon: '🎉' },
];

export default function ProgressSteps({ 
  currentStep, 
  compact = false,
  showLabels = true,
  className = ''
}) {
  const currentIndex = STEPS.findIndex(s => s.key === currentStep);
  const totalSteps = STEPS.length - 1; // exclude cancelled

  return (
    <div className={`progress-steps flex items-center ${className}`} role="progressbar" aria-valuenow={currentIndex} aria-valuemin={0} aria-valuemax={totalSteps}>
      <div className="relative flex items-center w-full">
        {/* Progress line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-white/10 z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--fukai-sakura)] to-[var(--fukai-gold)]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (currentIndex / (totalSteps - 1)) * 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between items-center relative z-10">
          {STEPS.slice(0, -1).map((step, index) => {
            const isActive = index === currentIndex;
            const isCompleted = index < currentIndex;
            const isLast = index === STEPS.length - 2;

            return (
              <motion.div
                key={step.key}
                className="flex flex-col items-center gap-1.5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
              >
                <div 
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    compact ? 'w-10 h-10' : 'w-12 h-12'
                  } rounded-full ${
                    isActive 
                      ? 'bg-gradient-to-br from-[var(--fukai-sakura)] to-[var(--fukai-gold)] shadow-[0_0_20px_rgba(255,182,193,0.5)] ring-4 ring-[var(--fukai-sakura)]/30'
                      : isCompleted
                        ? 'bg-[var(--fukai-sakura)]/20 border-2 border-[var(--fukai-sakura)]'
                        : 'bg-white/5 border border-white/10'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5 text-[var(--fukai-sakura)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={`text-2xl ${compact ? 'text-xl' : ''}`}>{step.icon}</span>
                  )}
                  
                  {isActive && !compact && (
                    <motion.span
                      className="absolute -top-2 -right-2 w-3 h-3 bg-[var(--fukai-gold)] rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                </div>

                {showLabels && !compact && (
                  <span className={`text-xs font-medium text-center w-24 leading-tight ${
                    isActive ? 'text-[var(--fukai-sakura)]' : 'text-[var(--fukai-cream)]/50'
                  }`}>
                    {step.label}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}