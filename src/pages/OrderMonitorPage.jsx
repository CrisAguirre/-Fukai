import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import { subscribeToOrder, unsubscribeFromOrder } from '../services/socket';
import SequenceOrchestrator from '../animations/SequenceOrchestrator';

export default function OrderMonitorPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { 
    currentOrder, 
    fetchOrder, 
    handleStatusUpdate, 
    getStepLabel, 
    getProgress 
  } = useOrderStore();

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId).catch(() => navigate('/'));
      subscribeToOrder(orderId);
      
      // We need to listen to socket events here, assuming a global listener passes to handleStatusUpdate
      // For a robust app, the socket listener is usually in a top-level provider.
      const socket = require('../services/socket').getSocket();
      
      const onStatusUpdate = (data) => {
        if (data.orderId === orderId) {
          handleStatusUpdate(data);
        }
      };

      socket.on('order:statusUpdate', onStatusUpdate);

      return () => {
        unsubscribeFromOrder(orderId);
        socket.off('order:statusUpdate', onStatusUpdate);
      };
    }
  }, [orderId, fetchOrder, handleStatusUpdate, navigate]);

  if (!currentOrder) return <div className="h-screen w-full bg-[var(--fukai-deep)] text-white flex items-center justify-center">Cargando tu experiencia...</div>;

  const progress = getProgress();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D & Animation Orchestrator Context */}
      <SequenceOrchestrator>
        {/* Render R3F Canvas here in the future */}
      </SequenceOrchestrator>

      {/* Progress UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-8 z-[var(--z-ui)] pointer-events-none flex justify-between items-start">
        <div className="glass-light p-4 rounded-xl backdrop-blur-md min-w-[300px]">
          <h2 className="text-xl font-display font-bold text-white mb-2">Pedido #{currentOrder._id.slice(-6)}</h2>
          <div className="flex justify-between text-sm text-white/70 mb-2">
            <span>{getStepLabel(currentOrder.estado)}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[var(--fukai-sakura)] to-[var(--fukai-gold)] transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
