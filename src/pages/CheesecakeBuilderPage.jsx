import { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';

// In a real app, this would use R3F Canvas and CheesecakeModel.
// Mocking the builder interface for now.

const DECORATIONS = [
  { id: 'fresas', name: 'Fresas Frescas', emoji: '🍓', price: 25 },
  { id: 'chocolate', name: 'Drip de Chocolate', emoji: '🍫', price: 30 },
  { id: 'arandanos', name: 'Arándanos', emoji: '🫐', price: 25 },
];

export default function CheesecakeBuilderPage() {
  const navigate = useNavigate();
  const { createOrder } = useOrderStore();
  const [type, setType] = useState('horneado');
  const [selectedDecos, setSelectedDecos] = useState([]);
  const [loading, setLoading] = useState(false);

  const cooker = sessionStorage.getItem('selectedCooker') || 'capibara';

  const toggleDeco = (id) => {
    setSelectedDecos(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const order = await createOrder({
        cocinero: cooker,
        cheesecake: {
          tipo: type,
          decoraciones: selectedDecos,
        }
      });
      navigate(`/monitor/${order._id}`);
    } catch (error) {
      alert('Error al crear pedido');
      setLoading(false);
    }
  };

  const basePrice = type === 'horneado' ? 350 : 300;
  const decoPrice = selectedDecos.length * 25; // simplified
  const total = basePrice + decoPrice;

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-8 gap-8">
      {/* 3D Viewer Area (Mocked with 2D for now, R3F comes later) */}
      <div className="flex-1 glass flex flex-col items-center justify-center relative overflow-hidden min-h-[50vh]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--fukai-deep)] to-[var(--fukai-mochi)] opacity-10" />
        <h3 className="absolute top-4 left-4 text-xl font-display text-[var(--fukai-cream)]/50">Vista Previa 3D</h3>
        <div className="text-8xl animate-[floatGentle_4s_infinite]">🍰</div>
        <p className="mt-8 text-[var(--fukai-cream)]">Cocinero seleccionado: <span className="capitalize text-[var(--fukai-sakura)]">{cooker}</span></p>
      </div>

      {/* Controls Area */}
      <div className="w-full md:w-96 glass-light p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-8">Arma tu Cheesecake</h2>
          
          <div className="mb-8">
            <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">Tipo de Base</h4>
            <div className="flex gap-4">
              <button 
                onClick={() => setType('horneado')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${type === 'horneado' ? 'bg-[var(--fukai-gold)] text-[var(--fukai-deep)]' : 'bg-white/10 text-white'}`}
              >
                Horneado
              </button>
              <button 
                onClick={() => setType('refrigerado')}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors ${type === 'refrigerado' ? 'bg-[var(--fukai-gold)] text-[var(--fukai-deep)]' : 'bg-white/10 text-white'}`}
              >
                Refrigerado
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/50 mb-4">Toppings</h4>
            <div className="grid grid-cols-2 gap-4">
              {DECORATIONS.map(deco => (
                <button
                  key={deco.id}
                  onClick={() => toggleDeco(deco.id)}
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-all ${selectedDecos.includes(deco.id) ? 'bg-[var(--fukai-sakura)]/20 border border-[var(--fukai-sakura)]' : 'bg-white/5 border border-transparent hover:bg-white/10'}`}
                >
                  <span className="text-2xl">{deco.emoji}</span>
                  <span className="text-xs text-white/80 text-center">{deco.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-6">
            <span className="text-white/70">Total estimado:</span>
            <span className="text-2xl font-bold text-white">${total}</span>
          </div>
          <button 
            onClick={handleConfirm}
            disabled={loading}
            className="w-full btn btn-primary"
          >
            {loading ? 'Preparando orden...' : '¡A cocinar!'}
          </button>
        </div>
      </div>
    </div>
  );
}
