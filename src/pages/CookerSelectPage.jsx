import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import { motion } from 'motion/react';

const COOKERS = [
  { id: 'capibara', name: 'Capibara', img: '/assets/capi.png', color: 'var(--fukai-caramel)' },
  { id: 'kitty', name: 'Hello Kitty', img: '/assets/kitty.png', color: 'var(--fukai-sakura)' },
  { id: 'aguacate', name: 'Aguacate', img: '/assets/avo.png', color: 'var(--fukai-matcha)' },
];

export default function CookerSelectPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
    setTimeout(() => {
      // Store choice in local storage or state to pass to builder
      sessionStorage.setItem('selectedCooker', id);
      navigate('/build-cheesecake');
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-8">
      <h2 className="text-4xl font-display font-bold text-[var(--fukai-cream)] mb-12">
        ¿Quién preparará tu cheesecake hoy?
      </h2>

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
            {/* Blob behind cooker could be implemented with React Bits Blob, simplified here */}
            <div 
              className="absolute inset-0 opacity-20 blur-2xl rounded-full"
              style={{ backgroundColor: cooker.color }}
            />
            
            <img 
              src={cooker.img} 
              alt={cooker.name} 
              className={`w-40 h-40 object-contain z-10 transition-transform duration-500 ${selected === cooker.id ? 'animate-[cookerExcited_1s_ease-in-out_infinite]' : 'animate-[floatGentle_3s_infinite]'}`} 
            />
            
            <h3 className="mt-6 text-2xl font-display font-medium text-[var(--fukai-cream)] z-10">
              {cooker.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
