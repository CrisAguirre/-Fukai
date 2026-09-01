import { Link, useLocation, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'motion/react';

const NAV_LINKS = [
  { path: '/select-cooker', label: 'Nuevo Pedido', roles: ['cliente'] },
  { path: '/admin', label: 'Panel Admin', roles: ['admin', 'cocinero', 'repartidor'] },
];

export default function Layout({ children }) {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) return children;

  const userLinks = NAV_LINKS.filter(link => link.roles.includes(user.rol));

  return (
    <div className="min-h-screen bg-[var(--fukai-deep)] text-[var(--fukai-cream)]">
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to={user.rol === 'admin' || user.rol === 'cocinero' ? '/admin' : '/select-cooker'} 
            className="flex items-center gap-3 text-[var(--fukai-cream)] hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full glass flex items-center justify-center flex-shrink-0">
              <img src="/assets/logo.png" alt="Fukai" className="logo-fukai-sm" />
            </div>
            <span className="font-display font-bold text-xl tracking-widest uppercase hidden sm:block">Fukai</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {userLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-medium tracking-wider uppercase transition-colors ${
                    isActive 
                      ? 'text-[var(--fukai-sakura)]' 
                      : 'text-[var(--fukai-cream)]/70 hover:text-[var(--fukai-cream)]'
                  }`}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-4">
              <span className="text-sm text-[var(--fukai-cream)]/60 hidden lg:block">
                {user.nombre} · {user.rol}
              </span>
              <button 
                onClick={logout}
                className="btn btn-secondary text-sm px-4 py-2"
              >
                Salir
              </button>
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button className="btn btn-secondary text-sm px-3 py-1" onClick={logout}>Salir</button>
          </div>
        </div>
      </header>

      <main className="pt-20 min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}