import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import ShinyText from '../components/reactbits/ShinyText';
import Aurora from '../components/reactbits/Aurora';

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, login } = useAuthStore();

  const handleStart = async () => {
    if (user) {
      if (user.rol === 'admin' || user.rol === 'cocinero') {
        navigate('/admin');
      } else {
        navigate('/select-cooker');
      }
    } else {
      // Auto-login dummy user for demo purposes or show actual login modal
      try {
        await login('cliente@fukai.com', 'password123'); // Assuming a seed user exists or user registers
        navigate('/select-cooker');
      } catch (err) {
        alert('Por favor, regístrate o inicia sesión en el backend primero.');
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <Aurora className="z-0" colorOne="hsla(340, 80%, 85%, 0.3)" />
      
      <div className="z-10 flex flex-col items-center text-center space-y-8 p-4">
        <img src="/assets/logo.png" alt="Fukai Logo" className="w-48 h-auto mb-4 drop-shadow-2xl" />
        
        <h1 className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
          <ShinyText text="深い Fukai" speed={3} />
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl font-body text-[var(--fukai-cream)]/90 font-light leading-relaxed glass p-6">
          Profundas sensaciones, sabores que invitan a la introspección, el confort de lo inesperado, 
          y la elegancia de la simplicidad. Fukai es más que repostería; es una experiencia que se 
          saborea lentamente.
        </p>
        
        <button 
          onClick={handleStart}
          className="btn btn-primary mt-8 text-xl"
        >
          {user ? 'Continuar Pedido' : 'Hacer Mi Pedido'}
        </button>
      </div>
      
      {/* Mascot Previews at bottom */}
      <div className="absolute bottom-10 flex gap-12 z-10 opacity-70">
         <img src="/assets/capi.png" className="w-24 h-24 object-contain animate-[floatGentle_4s_infinite]" />
         <img src="/assets/kitty.png" className="w-24 h-24 object-contain animate-[floatGentle_3s_infinite_reverse]" />
         <img src="/assets/avo.png" className="w-24 h-24 object-contain animate-[floatGentle_3.5s_infinite]" />
      </div>
    </div>
  );
}
