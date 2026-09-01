import useAuthStore from '../store/useAuthStore';
import useOrderStore from '../store/useOrderStore';

const STEPS = [
  { id: 1, title: 'Genera tu pedido', description: 'Elige tu cocinero, personaliza tu cheesecake y realiza tu pedido.', icon: '✨' },
  { id: 2, title: 'Preparación en vivo', description: 'Observa cada paso de la preparación con animaciones y nubes de diálogo.', icon: '🔮' },
  { id: 3, title: 'Despacho con tracking', description: 'Recibe tu cheesecake con ubicación en tiempo real.', icon: '🚀' },
];

export default function LandingPage() {
  const { user, login } = useAuthStore();
  const COOKERS = useOrderStore((s) => s.COOKERS);

  const handleStart = async () => {
    if (user) {
      window.location.href = user.rol === 'admin' ? '/admin' : '/select-cooker';
      return;
    }
    try {
      await login('admin@fukai.com', 'admin123');
      window.location.href = '/select-cooker';
    } catch (err) {
      alert('Error al iniciar sesión con el usuario de prueba.');
    }
  };

  return (
    <div className="landing-body" style={{ background: 'var(--fukai-deep)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ─── LOGO ─── */}
      <header style={{ zIndex: 20, width: '100%', padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--fukai-glass)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 30px rgba(255,182,193,0.3)' }}>
            <img src="/assets/logo.png" alt="Fukai" style={{ maxWidth: '96px', maxHeight: '96px', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.25rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--fukai-cream)', textAlign: 'center' }}>
            深い Fukai
          </h1>
        </div>
      </header>

      {/* ─── HERO CTA ─── */}
      <section style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px 40px' }}>
        <p style={{ color: 'var(--fukai-cream)', opacity: 0.7, fontSize: '1.125rem', maxWidth: '400px', marginBottom: '32px', lineHeight: 1.6 }}>
          Profundas sensaciones, sabores que invitan a la introspección y la elegancia de lo inesperado.
        </p>
        <button onClick={handleStart} style={{ background: 'linear-gradient(135deg, var(--fukai-sakura-deep), var(--fukai-lavender))', color: '#fff', padding: '16px 40px', borderRadius: '9999px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(224,108,146,0.4)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '320px' }}>
          <span>{user ? 'Continuar' : 'Comenzar'}</span>
        </button>
      </section>

      {/* ─── CARRUSEL COOKERS ─── */}
      <section style={{ zIndex: 10, width: '100%', padding: '0 24px 40px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--fukai-cream)', opacity: 0.6, marginBottom: '24px', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '1rem' }}>
          Tus cocineros
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', overflowX: 'auto', paddingBottom: '16px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          {Object.entries(COOKERS).map(([key, cooker], idx) => (
            <div
              key={key}
              onClick={() => { window.location.href = '/select-cooker'; }}
              style={{
                flexShrink: 0, width: '192px', background: 'var(--fukai-glass)', backdropFilter: 'blur(16px)', borderRadius: '28px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', scrollSnapAlign: 'center', border: '1px solid rgba(27,20,30,0.1)', transition: 'all 0.3s',
              }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid ' + cooker.color, boxSizing: 'border-box' }}>
                <img src={cooker.img} alt={cooker.fullName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--fukai-cream)' }}>{cooker.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--fukai-cream)', opacity: 0.4 }}>{cooker.fullName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SLIDER 3 PASOS ─── */}
      <section style={{ zIndex: 10, width: '100%', padding: '0 24px 40px' }}>
        <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--fukai-cream)', opacity: 0.6, marginBottom: '32px', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '1rem' }}>
          Tu experiencia
        </h2>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', maxWidth: '768px', width: '100%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '12.5%', right: '12.5%', height: '4px', transform: 'translateY(-50%)', background: 'linear-gradient(to right, var(--fukai-sakura), var(--fukai-lavender), var(--fukai-caramel))', opacity: 0.3 }} />

            {STEPS.map((step, idx) => (
              <div key={step.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', cursor: 'pointer' }}>
                <div style={{ background: 'var(--fukai-glass)', backdropFilter: 'blur(16px)', borderRadius: '28px', padding: '24px', width: '100%', textAlign: 'center', border: '1px solid rgba(27,20,30,0.1)', transition: 'all 0.3s' }}>
                  <div style={{ fontSize: '2.25rem', marginBottom: '12px' }}>{step.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--fukai-cream)', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--fukai-cream)', opacity: 0.5, lineHeight: 1.5 }}>{step.description}</p>
                </div>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--fukai-sakura), var(--fukai-lavender))', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: '0.875rem', boxShadow: '0 0 15px rgba(255,182,193,0.4)' }}>
                  {step.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive animation area */}
        <div style={{ marginTop: '40px' }}>
          <div style={{ background: 'var(--fukai-glass)', backdropFilter: 'blur(16px)', borderRadius: '28px', padding: '24px', textAlign: 'center', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '3.5rem', animation: 'floatGentle 3s ease-in-out infinite', animationDelay: '0s' }}>✨</span>
              <span style={{ fontSize: '3.5rem', animation: 'floatGentle 3s ease-in-out infinite', animationDelay: '-1s' }}>🔮</span>
              <span style={{ fontSize: '3.5rem', animation: 'floatGentle 3s ease-in-out infinite', animationDelay: '-2s' }}>🚀</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--fukai-cream)', opacity: 0.4, marginTop: '16px' }}>
              Genera · Prepara · Recibe
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ zIndex: 10, paddingBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--fukai-cream)', opacity: 0.2 }}>© 2026 深い Fukai</span>
        </div>
      </footer>
    </div>
  );
}