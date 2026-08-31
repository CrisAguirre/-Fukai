import { useEffect } from 'react';
import useOrderStore from '../store/useOrderStore';
import { joinAdminRoom, getSocket } from '../services/socket';

export default function AdminDashboard() {
  const { orders, fetchOrders, advanceOrder, getStepLabel } = useOrderStore();

  useEffect(() => {
    fetchOrders();
    joinAdminRoom();
    
    const socket = getSocket();
    const onUpdate = () => {
      fetchOrders(); // Refresh list on any update for simplicity
    };
    
    socket.on('order:new', onUpdate);
    socket.on('order:statusUpdate', onUpdate);
    
    return () => {
      socket.off('order:new', onUpdate);
      socket.off('order:statusUpdate', onUpdate);
    };
  }, [fetchOrders]);

  return (
    <div className="min-h-screen p-8 text-white">
      <h1 className="text-4xl font-display font-bold mb-8 text-[var(--fukai-sakura)]">Fukai Admin</h1>
      
      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order._id} className="glass p-6 flex items-center justify-between">
            <div>
              <p className="font-mono text-sm text-white/50">ID: {order._id}</p>
              <h3 className="text-xl font-medium mt-1">{order.usuario?.nombre || 'Cliente'} - {order.cheesecake.tipo}</h3>
              <p className="text-[var(--fukai-gold)] mt-2">Estado: {getStepLabel(order.estado)}</p>
            </div>
            
            <button 
              onClick={() => advanceOrder(order._id)}
              disabled={order.estado === 'delivered' || order.estado === 'cancelled'}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Avanzar Paso
            </button>
          </div>
        ))}
        {orders.length === 0 && <p>No hay pedidos activos.</p>}
      </div>
    </div>
  );
}
