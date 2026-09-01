import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import useAuthStore from '../store/useAuthStore';
import { motion } from 'motion/react';

const COOKERS = [
  { id: 'kitty', name: 'Kitty', fullName: 'Hello Kitty', img: '/assets/kitty.png', color: 'var(--fukai-sakura)' },
  { id: 'kato', name: 'Kato', fullName: 'Aguacate', img: '/assets/avo.png', color: 'var(--fukai-matcha)' },
  { id: 'chiwi', name: 'Chiwi', fullName: 'Capibara', img: '/assets/capi.png', color: 'var(--fukai-caramel)' },
];

export default function CookerSelectPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    setTimeout(() => {
      sessionStorage.setItem('selectedCooker', id);
      navigate('/build-cheesecake');
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative">
      {user?.rol === 'admin' && (
        <button
          onClick={() => navigate('/admin')}
          className="absolute top-6 right-6 btn btn-secondary text-sm z-50"
        >
          Panel de Control ⚙️
        </button>
      )}

      <h2 className="text-4xl font-display font-bold text-[var(--fukai-cream)] mb-4">
        ¿Quién preparará tu cheesecake hoy?
      </h2>
      <p className="text-[var(--fukai-cream)]/50 mb-12 text-center max-w-lg">
        Tus tres cocineros están listos. Elige al que más te identifique. 🎀🥑🧉
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {COOKERS.map((cooker) => (
          <motion.div
            key={cooker.id}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(cooker.id)}
            className={`cursor-pointer glass p-8 flex flex-col items-center justify-center transition-all duration-300 w-64 h-80 relative overflow-hidden ${selected === cooker.id ? 'ring-4' : ''}`}
            style={{ '--tw-ring-color': cooker.color }}
          >
            <div
              className="absolute inset-0 opacity-20 blur-2xl rounded-full"
              style={{ backgroundColor: cooker.color }}
            />

            <img
              src={cooker.img}
              alt={cooker.fullName}
              className={`w-28 h-28 md:w-32 md:h-32 max-w-[140px] max-h-[140px] object-contain z-10 transition-transform duration-500 ${selected === cooker.id ? 'animate-[cookerExcited_1s_ease-in-out_infinite]' : 'animate-[floatGentle_3s_infinite]'}`}
            />

            <h3 className="mt-6 text-2xl font-display font-medium text-[var(--fukai-cream)] z-10">
              {cooker.name}
            </h3>
            <p className="text-xs text-[var(--fukai-cream)]/40 mt-1">{cooker.fullName}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}