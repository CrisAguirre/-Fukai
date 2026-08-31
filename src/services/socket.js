import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

let socket = null;

export const connectSocket = () => {
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    autoConnect: true,
  });

  socket.on('connect', () => {
    console.log('🔌 WebSocket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ WebSocket disconnected');
  });

  socket.on('connect_error', (error) => {
    console.error('WebSocket connection error:', error.message);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) return connectSocket();
  return socket;
};

export const subscribeToOrder = (orderId) => {
  const s = getSocket();
  s.emit('order:subscribe', orderId);
};

export const unsubscribeFromOrder = (orderId) => {
  const s = getSocket();
  s.emit('order:unsubscribe', orderId);
};

export const joinAdminRoom = () => {
  const s = getSocket();
  s.emit('admin:join');
};

export const joinCookerRoom = () => {
  const s = getSocket();
  s.emit('cooker:join');
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  connectSocket,
  getSocket,
  subscribeToOrder,
  unsubscribeFromOrder,
  joinAdminRoom,
  joinCookerRoom,
  disconnectSocket,
};
