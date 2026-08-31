import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import ShinyText from '../components/reactbits/ShinyText';
import Aurora from '../components/reactbits/Aurora';

const DECORATIONS = [
  { id: 'fresas', emoji: '🍓' },
  { id: 'arandanos', emoji: '🫐' },
  { id: 'chocolate', emoji: '🍫' },
  { id: 'caramelo', emoji: '🍯' },
  { id: 'mermelada', emoji: '🍇' },
  { id: 'nueces', emoji: '🥜' },
  { id: 'oreo', emoji: '🍪' },
  { id: 'matcha', emoji: '🍵' },
];

const COOKERS = [
  { id: 'capibara', name: 'Capi', fullName: 'Capibara', emoji: '🧉', bio: 'Cremosidad profunda con paciencia suramericana', color: 'var(--fukai-caramel)' },
  { id: 'kitty', name: 'Kitty', fullName: 'Hello Kitty', emoji: '🎀', bio: 'Elegancia kawaii en cada bocado', color: 'var(--fukai-sakura)' },
  { id: 'aguacate', name: 'Avo', fullName: 'Aguacate', emoji: '🥑', bio: 'Fresh vibes con un toque verde mágico', color: 'var(--fukai-matcha)' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, login } = useAuthStore();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleStart = async () => {
    if (user) {
      navigate(user.rol === 'admin' ? '/admin' : '/select-cooker');
      return;
    }
    try {
      await login('admin@fukai.com', 'admin123');
      navigate('/select-cooker');
    } catch (err) {
      alert('Error al iniciar sesión con el usuario de prueba.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--fukai-deep)] text-[var(--fukai-cream)] font-body">
      <Aurora className="absolute inset-0 z-0 opacity-60" colorOne="hsla(340, 80%, 85%, 0.4)" colorTwo="hsla(270, 40%, 70%, 0.3)" />

      {/* ─── NAV ─── */}
      <header className="z-20 w-full px-6 py-5 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
            <img src="/assets/logo.png" alt="Fukai" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-bold text-lg tracking-widest uppercase text-white/90">Fukai</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wider text-[var(--fukai-cream)]/60 uppercase">
          <a href="#experiencia" className="hover:text-[var(--fukai-sakura)] transition-colors">Experiencia</a>
          <a href="#menu" className="hover:text-[var(--fukai-sakura)] transition-colors">Menú</a>
          <a href="#cocineros" className="hover:text-[var(--fukai-sakura)] transition-colors">Cocineros</a>
          <a href="#filosofia" className="hover:text-[var(--fukai-sakura)] transition-colors">Filosofía</a>
        </nav>
      </header>

      {/* ─── HERO ─── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">✦ Repostería Inmersiva ✦</div>
          <div className="hero-title-group">
            <h1 className="hero-title">
              <ShinyText text="深い Fukai" speed={3} />
            </h1>
            <p className="hero-subtitle">
              Profundas sensaciones, sabores que invitan a la introspección, el confort de lo inesperado,
              y la elegancia de la simplicidad.
            </p>
          </div>
          <div className="hero-cta-group">
            <button onClick={handleStart} className="hero-cta-primary">
              <span>{user ? 'Continuar Pedido' : 'Comenzar Experiencia'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="hero-cta-secondary" onClick={() => navigate('#experiencia')}>
              Descubre Más →
            </button>
          </div>
        </div>

        {/* Floating mascots */}
        <div className="hero-mascots">
          <div className="hero-mascot">
            <img src="/assets/capi.png" alt="Capi" />
            <span>Capi</span>
          </div>
          <div className="hero-mascot">
            <img src="/assets/kitty.png" alt="Kitty" />
            <span>Kitty</span>
          </div>
          <div className="hero-mascot">
            <img src="/assets/avo.png" alt="Avo" />
            <span>Avo</span>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Desplazar</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ─── EXPERIENCIA ─── */}
      <section id="experiencia" className="experiencia-section section">
        <div className="section-header reveal-up">
          <p className="section-label">La Experiencia</p>
          <h2 className="section-title">Tu pedido, tu historia</h2>
          <div className="section-divider" />
          <p className="mt-4 text-[var(--fukai-cream)] opacity-60 max-w-lg mx-auto">
            Cada cheesecake vive un ciclo completo. Desde que lo generas hasta que llega a tus manos,
            lo vives como una experiencia inmersiva y tierna.
          </p>
        </div>

        <div className="experiencia-grid">
          <div className="experiencia-step reveal-up" ref={(el) => (sectionsRef.current[0] = el)}>
            <div className="experiencia-step-number">1</div>
            <div className="experiencia-step-content">
              <div className="step-icon">✨</div>
              <h3>Genera tu pedido</h3>
              <p>Elige tu cocinero favorito, selecciona el tipo de cheesecake y personalízalo con sus deliciosas decoraciones. Cada combinación es única.</p>
            </div>
          </div>

          <div className="experiencia-step reveal-up" ref={(el) => (sectionsRef.current[1] = el)}>
            <div className="experiencia-step-number">2</div>
            <div className="experiencia-step-content">
              <div className="step-icon">🔮</div>
              <h3>Preparación en tiempo real</h3>
              <p>Observa cada paso de la preparación con animaciones tiernas y nubes de diálogo del cocinero. El progreso se actualiza en vivo mientras tu cheesecake cobra vida.</p>
            </div>
          </div>

          <div className="experiencia-step reveal-up" ref={(el) => (sectionsRef.current[2] = el)}>
            <div className="experiencia-step-number">3</div>
            <div className="experiencia-step-content">
              <div className="step-icon">🚀</div>
              <h3>Despacho con tracking</h3>
              <p>Recibe tu cheesecake con ubicación en tiempo real. Sabrás exactamente cuándo y dónde llega tu experiencia gastronómica.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MENU ─── */}
      <section id="menu" className="menu-section section">
        <div className="section-header reveal-up">
          <p className="section-label">El Menú</p>
          <h2 className="section-title">Elige tu cheesecake</h2>
          <div className="section-divider" />
        </div>

        <div className="menu-grid">
          <div className="menu-card reveal-up" ref={(el) => (sectionsRef.current[3] = el)}>
            <div className="menu-card-visual horneado">
              <span className="cake-emoji">🍰</span>
            </div>
            <div className="menu-card-body">
              <h3>Horneado Clásico</h3>
              <span className="tag horneado">Horneado</span>
              <p className="description">Un cheesecake cremoso horneado a la perfección, con una base de galleta dorada y un interior suave que se derrite en cada bocado.</p>
              <div className="menu-card-footer">
                <span className="menu-price">$350</span>
                <div className="menu-decos">
                  {DECORATIONS.slice(0, 5).map((d) => (
                    <span key={d.id}>{d.emoji}</span>
                  ))}
                  <span className="text-white/40 text-xs">+3</span>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-card reveal-up" ref={(el) => (sectionsRef.current[4] = el)}>
            <div className="menu-card-visual refrigerado">
              <span className="cake-emoji">🍮</span>
            </div>
            <div className="menu-card-body">
              <h3>Refrigerado Sedoso</h3>
              <span className="tag refrigerado">Refrigerado</span>
              <p className="description">Un cheesecake no-bake ultra sedoso, con textura de mousse y un sabor delicado que captura la esencia de la simplicidad japonesa.</p>
              <div className="menu-card-footer">
                <span className="menu-price">$300</span>
                <div className="menu-decos">
                  {DECORATIONS.slice(3, 7).map((d) => (
                    <span key={d.id}>{d.emoji}</span>
                  ))}
                  <span className="text-white/40 text-xs">+1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COCINEROS ─── */}
      <section id="cocineros" className="cocineros-section section">
        <div className="section-header reveal-up">
          <p className="section-label">Cocineros</p>
          <h2 className="section-title">¿Quién preparará el tuyo?</h2>
          <div className="section-divider" />
          <p className="mt-4 text-[var(--fukai-cream)] opacity-60 max-w-lg mx-auto">
            Cada cocinero tiene su propia personalidad, estilo y mensaje. Elige al que más te identifique.
          </p>
        </div>

        <div className="cocineros-grid">
          {COOKERS.map((cooker, i) => (
            <div key={cooker.id} className={`cooker-card ${cooker.id} reveal-up`} ref={(el) => (sectionsRef.current[5 + i] = el)}>
              <div className="cooker-card-img">
                <div className="ring" />
                <img src={`/assets/${cooker.id === 'capibara' ? 'capi' : cooker.id === 'kitty' ? 'kitty' : 'avo'}.png`} alt={cooker.fullName} />
              </div>
              <h3>{cooker.fullName}</h3>
              <p className="cooker-role">{cooker.emoji} · {cooker.name.toUpperCase()}</p>
              <p className="cooker-bio">{cooker.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FILOSOFÍA ─── */}
      <section id="filosofia" className="filosofia-section section">
        <div className="filosofia-container">
          <div className="filosofia-hero reveal-up">
            <span className="big-emoji">💖</span>
            <h2>Donde lo digital y lo gastronómico se enamoran</h2>
            <p className="filosofia-text">
              深い Fukai nace para cautivar a una audiencia joven, principalmente femenina, con una
              experiencia inmersiva que transforma cada etapa del ciclo de vida de un pedido en una
              historia tierna y memorable.
            </p>
            <span className="filosofia-highlight">
              ✦ Animaciones kawaii · Personajes 2D/3D · Nubes de diálogo · Libretos de preparación · Step-by-step
            </span>
          </div>

          <div className="filosofia-grid">
            <div className="filosofia-item reveal-up" ref={(el) => (sectionsRef.current[8] = el)}>
              <div className="fi-icon">🎬</div>
              <h4>Secuencias cinematográficas</h4>
              <p>Cada paso del pedido tiene su propio libreto de preparación, sus figuras animadas en 2D/3D y su nube de diálogo exclusiva del cocinero.</p>
            </div>
            <div className="filosofia-item reveal-up" ref={(el) => (sectionsRef.current[9] = el)}>
              <div className="fi-icon">📱</div>
              <h4>Diseño mobile-first</h4>
              <p>La aplicación se escala perfectamente a dispositivos móviles. Web primero, luego su clon React Native para que la experiencia te acompañe a donde vayas.</p>
            </div>
            <div className="filosofia-item reveal-up" ref={(el) => (sectionsRef.current[10] = el)}>
              <div className="fi-icon">🫶</div>
              <h4>Para ti, con cariño</h4>
              <p>Como cocinero real, tú confirmas cada etapa de la preparación. La app refleja tu trabajo con animaciones que celebran cada logro en el proceso.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="section" style={{ background: 'var(--fukai-deep)' }}>
        <div className="filosofia-container reveal-up">
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: 'var(--fukai-cream)', marginBottom: '1rem' }}>
            ¿Lista para tu primer pedido?
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--fukai-cream)', opacity: 0.6, lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 2rem' }}>
            Selecciona tu cocinero, personaliza tu cheesecake y vive la experiencia 深い Fukai.
          </p>
          <button onClick={handleStart} className="hero-cta-primary">
            <span>{user ? 'Continuar' : 'Comenzar Ahora'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/assets/logo.png" alt="Fukai" />
            <span>Fukai</span>
          </div>
          <div className="footer-links">
            <a href="#experiencia">Experiencia</a>
            <a href="#menu">Menú</a>
            <a href="#cocineros">Cocineros</a>
            <a href="#filosofia">Filosofía</a>
          </div>
          <p className="footer-copy">© 2026 深い Fukai — Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}