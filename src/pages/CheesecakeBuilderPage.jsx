import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import { motion } from 'motion/react';

const RELLENOS = [
  { id: 'clasica', name: 'Clásica', emoji: '🧀', desc: 'Cremoso tradicional' },
  { id: 'limon', name: 'Limón', emoji: '🍋', desc: 'Tropical y refrescante' },
];

const BASES_GALLETAS = [
  { id: null, name: 'Ninguna', emoji: '❌', desc: 'Sin base de galleta' },
  { id: 'vainilla', name: 'Vainilla', emoji: '🎂', desc: 'Base suave de vainilla' },
  { id: 'oreo', name: 'Oreo', emoji: '🍪', desc: 'Base crujiente de oreo' },
];

const DORADOS = [
  { id: 'medio', name: 'Medio', emoji: '🌡️', desc: 'Dorado uniforme' },
  { id: 'dorado', name: 'Dorado', emoji: '🔥', desc: 'Dorado completo y crujiente' },
];

const DECORADOS = [
  { id: 'sin_decorar', name: 'Sin Decorar', emoji: '🤍', price: 0 },
  { id: 'frutos_rojos', name: 'Frutos Rojos', emoji: '🍓', price: 35 },
  { id: 'arequite', name: 'Arequipe', emoji: '🍫', price: 40 },
  { id: 'chantilli_oreo', name: 'Chantilli con Oreo', emoji: '🍦', price: 45 },
  { id: 'bocadillo', name: 'Bocadillo', emoji: '🫐', price: 30 },
];

export default function CheesecakeBuilderPage() {
  const navigate = useNavigate();
  const { createOrder, calculatePrice } = useOrderStore();
  const [tipo, setTipo] = useState('horneado');
  const [relleno, setRelleno] = useState('clasica');
  const [base_galleta, setBaseGalleta] = useState(null);
  const [dorado, setDorado] = useState('medio');
  const [decorado, setDecorado] = useState('sin_decorar');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const cooker = sessionStorage.getItem('selectedCooker') || 'kitty';
  const cheesecakeData = { tipo, relleno, base_galleta, dorado, decorado };
  const total = calculatePrice(cheesecakeData);

  const canAdvance = () => {
    if (step === 1) return true;
    return true;
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const order = await createOrder({
        cocinero: cooker,
        cheesecake: cheesecakeData,
      });
      navigate(`/monitor/${order._id}`);
    } catch (error) {
      alert('Error al crear pedido');
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4, 5].map(s => (
          <React.Fragment key={s}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s
                  ? 'bg-gradient-to-br from-[var(--fukai-sakura)] to-[var(--fukai-lavender)] text-[var(--fukai-cream)]'
                  : 'bg-white/10 text-[var(--fukai-cream)]/30'
              }`}
            >
              {s}
            </div>
            {s < 5 && (
              <div className={`w-12 h-1 rounded-full transition-all ${
                step > s ? 'bg-[var(--fukai-sakura)]' : 'bg-white/10'
              }`} />
            )}
          </React.Fragment>
      ))}
    </div>
  );

  const StepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h4 className="text-xs uppercase tracking-widest text-[var(--fukai-cream)]/40 mb-4">Tipo de Cheesecake</h4>
            <div className="flex gap-3">
              <button
                onClick={() => setTipo('horneado')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                  tipo === 'horneado'
                    ? 'bg-gradient-to-br from-[var(--fukai-caramel)] to-[var(--fukai-gold)] text-[var(--fukai-deep)] shadow-lg shadow-[var(--fukai-caramel)]/30'
                    : 'bg-white/5 text-[var(--fukai-cream)]/70 border border-white/10'
                }`}
              >
                🔥 Horneado · $350
              </button>
              <button
                onClick={() => setTipo('refrigerado')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                  tipo === 'refrigerado'
                    ? 'bg-gradient-to-br from-[var(--fukai-lavender)] to-[var(--fukai-sakura)] text-[var(--fukai-deep)] shadow-lg shadow-[var(--fukai-lavender)]/30'
                    : 'bg-white/5 text-[var(--fukai-cream)]/70 border border-white/10'
                }`}
              >
                ❄️ Refrigerado · $300
              </button>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h4 className="text-xs uppercase tracking-widest text-[var(--fukai-cream)]/40 mb-4">Relleno</h4>
            <div className="flex flex-col gap-3">
              {RELLENOS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRelleno(r.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    relleno === r.id
                      ? 'bg-[var(--fukai-sakura)]/15 border border-[var(--fukai-sakura)]'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <div className="text-left">
                    <p className="text-[var(--fukai-cream)] font-medium">{r.name}</p>
                    <p className="text-xs text-[var(--fukai-cream)]/40">{r.desc}</p>
                  </div>
                  {r.id === 'limon' && <span className="ml-auto text-xs text-[var(--fukai-gold)]">+$25</span>}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h4 className="text-xs uppercase tracking-widest text-[var(--fukai-cream)]/40 mb-4">Base de Galleta <span className="text-[var(--fukai-cream)]/20">(opcional)</span></h4>
            <div className="flex flex-col gap-3">
              {BASES_GALLETAS.map(b => (
                <button
                  key={b.id}
                  onClick={() => setBaseGalleta(b.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    base_galleta === b.id
                      ? 'bg-[var(--fukai-sakura)]/15 border border-[var(--fukai-sakura)]'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{b.emoji}</span>
                  <div className="text-left">
                    <p className="text-[var(--fukai-cream)] font-medium">{b.name}</p>
                    <p className="text-xs text-[var(--fukai-cream)]/40">{b.desc}</p>
                  </div>
                  {b.id === 'oreo' && <span className="ml-auto text-xs text-[var(--fukai-gold)]">+$25</span>}
                  {b.id === 'vainilla' && <span className="ml-auto text-xs text-[var(--fukai-gold)]">+$15</span>}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h4 className="text-xs uppercase tracking-widest text-[var(--fukai-cream)]/40 mb-4">Término de Dorado</h4>
            <div className="flex gap-3">
              {DORADOS.map(d => (
                <button
                  key={d.id}
                  onClick={() => setDorado(d.id)}
                  className={`flex-1 py-3 rounded-xl font-medium transition-all text-sm ${
                    dorado === d.id
                      ? 'bg-gradient-to-br from-[var(--fukai-caramel)] to-[var(--fukai-gold)] text-[var(--fukai-deep)] shadow-lg shadow-[var(--fukai-caramel)]/30'
                      : 'bg-white/5 text-[var(--fukai-cream)]/70 border border-white/10'
                  }`}
                >
                  {d.emoji} {d.name}
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <h4 className="text-xs uppercase tracking-widest text-[var(--fukai-cream)]/40 mb-4">Decorado Superior</h4>
            <div className="grid grid-cols-2 gap-3">
              {DECORADOS.map(d => (
                <button
                  key={d.id}
                  onClick={() => setDecorado(d.id)}
                  className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all ${
                    decorado === d.id
                      ? 'bg-[var(--fukai-sakura)]/15 border border-[var(--fukai-sakura)]'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl">{d.emoji}</span>
                  <span className="text-xs text-[var(--fukai-cream)]/70 text-center">{d.name}</span>
                  {d.price > 0 && <span className="text-xs text-[var(--fukai-gold)]">+${d.price}</span>}
                  {d.price === 0 && <span className="text-xs text-[var(--fukai-cream)]/30">Gratis</span>}
                </button>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-4 md:p-8 gap-6 md:gap-10">
       {/* 2D Preview Area */}
      <div className="flex-1 glass flex flex-col items-center justify-center relative overflow-hidden min-h-[400px] md:min-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--fukai-deep)] via-[var(--fukai-deep-mid)] to-[var(--fukai-mochi)] opacity-50" />
        <h3 className="absolute top-4 left-4 text-sm font-display text-[var(--fukai-cream)]/40 tracking-widest uppercase">
          Vista Previa
        </h3>
        <div className="relative z-10 w-[200px] h-[200px] flex items-center justify-center">
          <div className="relative animate-[floatGentle_4s_ease-in-out_infinite]">
            <div className="w-[180px] h-[180px] rounded-full" style={{
              background: `radial-gradient(circle at 30% 30%, ${tipo === 'horneado' ? '#f5deb3' : '#fffacd'}, ${tipo === 'horneado' ? '#e8c896' : '#f0e8a0'})`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 -10px 20px rgba(0,0,0,0.1), inset 0 10px 20px rgba(255,255,255,0.3)',
            }}>
              {decorado !== 'sin_decorar' && (
                <div className="absolute top-0 left-0 right-0 h-3 rounded-full" style={{
                  background: decorado === 'frutos_rojos' ? 'repeating-linear-gradient(90deg, #ff2255, #ff2255 8px, #ff88aa 8px, #ff88aa 16px)' :
                    decorado === 'arequite' ? 'repeating-linear-gradient(90deg, #8B4513, #8B4513 8px, #d4770c 8px, #d4770c 16px)' :
                    decorado === 'chantilli_oreo' ? 'repeating-linear-gradient(90deg, #222222, #222222 6px, #f5f5f5 6px, #f5f5f5 12px)' :
                    decorado === 'bocadillo' ? 'repeating-linear-gradient(90deg, #8B008B, #8B008B 8px, #ff69b4 8px, #ff69b4 16px)' :
                    'transparent',
                  borderRadius: '9999px',
                }} />
              )}
              <div className="absolute inset-0 flex items-center justify-center text-6xl">🍰</div>
            </div>
            {base_galleta && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[160px] h-6 rounded-b-full" style={{
                background: base_galleta === 'oreo' ? 'repeating-linear-gradient(90deg, #222 0px, #222 8px, #f5f5 8px, #f5f5 16px)' : '#f5deb3',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }} />
            )}
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm text-[var(--fukai-cream)]/50 capitalize">
            {cooker} · {tipo} · {relleno} · {decorado}
          </p>
        </div>
      </div>

      {/* Controls Area */}
      <div className="w-full md:w-96 glass-light p-6 md:p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--fukai-cream)] mb-2">
            Arma tu Cheesecake ✨
          </h2>
          <p className="text-xs text-[var(--fukai-cream)]/30 mb-6">Selecciona cada opción paso a paso</p>

          {renderStepIndicator()}

          {StepContent()}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[var(--fukai-cream)]/60 text-sm">Total estimado:</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-[var(--fukai-sakura)] to-[var(--fukai-lavender)] bg-clip-text text-transparent">
              ${total}
            </span>
          </div>

          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="btn btn-secondary flex-1 py-4"
              >
                ← Atrás
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canAdvance()}
                className="btn btn-primary flex-1 py-4 disabled:opacity-40"
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[var(--fukai-sakura-deep)] to-[var(--fukai-lavender)] text-[var(--fukai-cream)] font-display font-semibold text-lg hover:shadow-lg hover:shadow-[var(--fukai-sakura)]/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {loading ? 'Creando pedido...' : `¡A cocinar! · $${total}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}