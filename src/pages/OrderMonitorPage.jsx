import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import { subscribeToOrder, unsubscribeFromOrder, getSocket } from '../services/socket';
import SequenceOrchestrator from '../animations/SequenceOrchestrator';
import ProgressSteps from '../components/ProgressSteps';
import { motion } from 'motion/react';

export default function OrderMonitorPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const {
    currentOrder,
    fetchOrder,
    handleStatusUpdate,
    getStepLabel,
    getStepLibreto,
    getProgress,
    animationStep,
    setShowSpeechBubble,
    STEP_EMOJIS,
  } = useOrderStore();

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId).catch(() => navigate('/'));
      subscribeToOrder(orderId);

      const socket = getSocket();
      const onStatusUpdate = (data) => {
        if (data.orderId === orderId) {
          handleStatusUpdate(data);
          setTimeout(() => setShowSpeechBubble(false), 5000);
        }
      };

      socket.on('order:statusUpdate', onStatusUpdate);

      return () => {
        unsubscribeFromOrder(orderId);
        socket.off('order:statusUpdate', onStatusUpdate);
      };
    }
  }, [orderId, fetchOrder, handleStatusUpdate, navigate, setShowSpeechBubble]);

  if (!currentOrder) {
    return (
      <div className="h-screen w-full bg-[var(--fukai-deep)] text-[var(--fukai-cream)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-[floatGentle_2s_ease-in-out_infinite]">🍰</div>
          <p className="text-xl font-display">Cargando tu experiencia...</p>
        </div>
      </div>
    );
  }

  const progress = getProgress();
  const stepLibreto = getStepLibreto(currentOrder.estado);
  const stepEmoji = STEP_EMOJIS[currentOrder.estado] || '';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--fukai-deep)]">
      <SequenceOrchestrator />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full z-[var(--z-ui)] pointer-events-none">
        <div className="flex justify-between items-start p-4 md:p-6">
          <div className="glass-light p-3 rounded-xl backdrop-blur-md">
            <p className="text-xs text-[var(--fukai-cream)]/50 font-mono">Pedido #{currentOrder._id.slice(-6)}</p>
            <p className="text-sm font-display font-semibold text-[var(--fukai-cream)] capitalize">{currentOrder.cocinero}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary text-xs px-3 py-1 pointer-events-auto"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="absolute top-20 left-4 right-4 z-[var(--z-ui)] pointer-events-none">
        <ProgressSteps currentStep={currentOrder.estado} compact />
      </div>

      {/* Step Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-[var(--z-ui)] pointer-events-none">
        <motion.div
          key={animationStep}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-light mx-4 md:mx-8 mb-6 p-6 rounded-2xl backdrop-blur-md pointer-events-auto"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{stepEmoji}</span>
            <h3 className="font-display font-bold text-[var(--fukai-cream)] text-lg">{stepLabel}</h3>
          </div>
          <p className="text-sm text-[var(--fukai-cream)]/60 leading-relaxed">{stepLibreto}</p>
          <div className="mt-3 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--fukai-sakura)] to-[var(--fukai-gold)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-[var(--fukai-cream)]/30 mt-2 text-right">{progress}% completo</p>
        </motion.div>
      </div>
    </div>
  );
}