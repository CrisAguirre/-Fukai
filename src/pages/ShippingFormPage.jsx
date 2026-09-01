import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import { motion } from 'motion/react';
import Aurora from '../components/reactbits/Aurora';

export default function ShippingFormPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { updateShipping } = useOrderStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
    referencia: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateShipping(orderId, formData);
      // Redirigir de nuevo al monitor para ver cómo se va el repartidor
      navigate(`/monitor/${orderId}`);
    } catch (error) {
      alert('Error al guardar datos de envío.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-8 overflow-hidden">
      <Aurora className="z-0" colorOne="hsla(200, 70%, 80%, 0.4)" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass p-8 w-full max-w-2xl z-10"
      >
        <h2 className="text-3xl font-display font-bold text-[var(--fukai-cream)] mb-6 text-center">
          ¿A dónde enviamos tu Cheesecake? 🚀
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[var(--fukai-cream)]/80 text-sm">Nombre de quien recibe</label>
            <input 
              required
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-[var(--fukai-cream)] focus:outline-none focus:border-[var(--fukai-sakura)]" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[var(--fukai-cream)]/80 text-sm">Teléfono</label>
            <input 
              required
              type="tel" 
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-[var(--fukai-cream)] focus:outline-none focus:border-[var(--fukai-sakura)]" 
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-[var(--fukai-cream)]/80 text-sm">Dirección Completa</label>
            <input 
              required
              type="text" 
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-[var(--fukai-cream)] focus:outline-none focus:border-[var(--fukai-sakura)]" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[var(--fukai-cream)]/80 text-sm">Ciudad</label>
            <input 
              required
              type="text" 
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-[var(--fukai-cream)] focus:outline-none focus:border-[var(--fukai-sakura)]" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[var(--fukai-cream)]/80 text-sm">Código Postal</label>
            <input 
              type="text" 
              name="codigoPostal"
              value={formData.codigoPostal}
              onChange={handleChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-[var(--fukai-cream)] focus:outline-none focus:border-[var(--fukai-sakura)]" 
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-[var(--fukai-cream)]/80 text-sm">Instrucciones o Referencia (Opcional)</label>
            <textarea 
              name="referencia"
              value={formData.referencia}
              onChange={handleChange}
              rows="2"
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-[var(--fukai-cream)] focus:outline-none focus:border-[var(--fukai-sakura)] resize-none" 
            />
          </div>
          
          <div className="md:col-span-2 mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn btn-primary py-4 text-lg"
            >
              {loading ? 'Confirmando...' : 'Confirmar Envío'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
