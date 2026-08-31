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
      // Auto-login test admin user for demo/testing purposes
      try {
        await login('admin@fukai.com', 'admin123');
        // As an admin, they can go to the admin dashboard, but for testing the flow, 
        // we might want them to go to select-cooker to test the order sequence, 
        // or go to admin. Let's send them to select-cooker to test ordering, 
        // they can navigate to admin from there if there's a nav link.
        navigate('/select-cooker');
      } catch (err) {
        alert('Error al iniciar sesión con el usuario de prueba.');
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black/40 overflow-hidden font-body">
      {/* Background Aurora */}
      <Aurora className="absolute inset-0 z-0 opacity-70" colorOne="hsla(340, 80%, 85%, 0.5)" colorTwo="hsla(270, 40%, 70%, 0.4)" />
      
      {/* Header */}
      <header className="z-20 w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto animate-[fade-in_1.5s_ease-out]">
        <div className="flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full glass flex items-center justify-center p-2 shadow-[0_0_15px_rgba(255,182,193,0.3)]">
            <img src="/assets/logo.png" alt="Fukai Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-bold text-2xl tracking-widest text-white/90 uppercase">
            Fukai
          </span>
        </div>
        <nav className="hidden md:flex gap-10 text-sm font-medium tracking-wider text-[var(--fukai-cream)]/70 uppercase">
          <a href="#experiencia" className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300">Experiencia</a>
          <a href="#menu" className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300">Menú</a>
          <a href="#filosofia" className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-300">Filosofía</a>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="z-10 flex-grow flex flex-col items-center justify-center text-center px-6 w-full max-w-6xl mx-auto pb-20">
        
        {/* Title Group */}
        <div className="mb-12 animate-[fade-in_1s_ease-out_0.2s_both] flex flex-col items-center">
          <div className="inline-block glass-light px-6 py-2 rounded-full mb-6 border border-white/10 shadow-lg">
            <span className="text-sm font-jp tracking-[0.3em] text-[var(--fukai-sakura)] uppercase">
              Repostería Inmersiva
            </span>
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter drop-shadow-2xl mb-4">
            <ShinyText text="深い Fukai" speed={3} className="text-transparent bg-clip-text bg-gradient-to-br from-white via-[var(--fukai-cream)] to-[var(--fukai-lavender)]" />
          </h1>
        </div>
        
        {/* Glassmorphic Card */}
        <div className="glass max-w-3xl w-full p-10 md:p-14 animate-[slide-up_1s_ease-out_0.5s_both] relative overflow-hidden group border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem]">
          {/* Subtle hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <p className="text-lg md:text-2xl text-[var(--fukai-cream)]/90 font-light leading-relaxed mb-12 relative z-10">
            Profundas sensaciones, sabores que invitan a la introspección, el confort de lo inesperado, 
            y la elegancia de la simplicidad. <br className="hidden md:block" />
            <span className="font-medium text-white">Descubre el arte en cada detalle.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <button 
              onClick={handleStart}
              className="btn btn-primary text-lg px-12 py-5 w-full sm:w-auto rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,182,193,0.3)] hover:shadow-[0_0_50px_rgba(255,182,193,0.5)] flex items-center justify-center gap-3"
            >
              <span>{user ? 'Continuar Pedido' : 'Comenzar Experiencia'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="btn btn-secondary text-lg px-12 py-5 w-full sm:w-auto rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 border border-white/20">
              Explorar Menú
            </button>
          </div>
        </div>
      </main>

      {/* Decorative floating mascots aligned beautifully at the bottom */}
      <div className="absolute bottom-0 w-full flex justify-between items-end px-8 md:px-32 z-10 pointer-events-none pb-8">
         <div className="flex flex-col items-center animate-[floatGentle_5s_ease-in-out_infinite]">
           <img src="/assets/capi.png" className="w-24 md:w-32 h-auto object-contain opacity-60 drop-shadow-xl" alt="Capi Mascot" />
         </div>
         <div className="flex flex-col items-center animate-[floatGentle_4.5s_ease-in-out_infinite_reverse_1s] mb-4">
           <img src="/assets/avo.png" className="w-20 md:w-28 h-auto object-contain opacity-60 drop-shadow-xl" alt="Avo Mascot" />
         </div>
         <div className="flex flex-col items-center animate-[floatGentle_6s_ease-in-out_infinite_0.5s]">
           <img src="/assets/kitty.png" className="w-24 md:w-32 h-auto object-contain opacity-60 drop-shadow-xl" alt="Kitty Mascot" />
         </div>
      </div>
      
      {/* Overlay gradient at bottom for smooth cutoff */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--fukai-deep)] to-transparent pointer-events-none z-0"></div>
    </div>
  );
}
