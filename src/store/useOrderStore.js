import { create } from 'zustand';
import api from '../services/api';

const ORDER_STEPS = [
  'pending', 'awakening', 'kitchen', 'preparing',
  'baking', 'decorating', 'packaging', 'shipping', 'delivered', 'cancelled',
];

const STEP_LABELS = {
  pending:    'Pendiente',
  awakening:  '¡Despertando al cocinero!',
  kitchen:    'Revelando la cocina',
  preparing:  'Preparando ingredientes',
  baking:     'Horneando con amor',
  decorating: '¡Decorando tu cheesecake!',
  packaging:  'Empacando con cariño',
  shipping:   '¡En camino!',
  delivered:  '¡Entregado! 🎉',
  cancelled:  'Cancelado',
};

const STEP_EMOJIS = {
  pending:    '⏳',
  awakening:  '🌅',
  kitchen:    '🍳',
  preparing:  '🥚',
  baking:     '🔥',
  decorating: '🍓',
  packaging:  '📦',
  shipping:   '🚗',
  delivered:  '🎉',
  cancelled:  '❌',
};

const COOKER_MESSAGES = {
  capibara: {
    awakening:  '¡Buenos días! Soy Capi 🧉 Voy a preparar tu cheesecake con mucho amor...',
    kitchen:    '¡Mira mi cocina! Aquí todo es tranquilidad y buen sabor ✨',
    preparing:  'Mezclando los ingredientes... despacio, como me gusta 🥚🧈',
    baking:     'En el horno... la paciencia es mi ingrediente secreto 🔥',
    decorating: '¡Ahora lo más divertido! A decorar con cariño 🍓🫐',
    packaging:  'Empacando tu cheesecake con un abrazo incluido 💝',
    shipping:   '¡Tu cheesecake va en camino! Nos vemos pronto 🚗💨',
    delivered:  '¡Listo! Espero que lo disfrutes tanto como yo al hacerlo 🎉',
  },
  kitty: {
    awakening:  '¡Hola! Soy Kitty 🎀 ¡Vamos a cocinar algo especial!',
    kitchen:    '¡Mi cocina está lista! Todo brillante y ordenado ✨',
    preparing:  '¡Mezclando con amor! Cada ingrediente cuenta 🥚💕',
    baking:     'Horneando con cariño... ¡huele delicioso! 🔥🎀',
    decorating: '¡La decoración es mi parte favorita! 🍓🌸',
    packaging:  'Envolviendo tu regalo con un moño especial 🎁💝',
    shipping:   '¡Tu cheesecake viaja hacia ti con amor! 🚗💕',
    delivered:  '¡Llegó! ¡Disfrútalo con todo tu corazón! 🎉🎀',
  },
  aguacate: {
    awakening:  '¡Hey! Soy Avo 🥑 ¡Listo para cocinar algo increíble!',
    kitchen:    '¡Bienvenido a mi cocina verde! Aquí todo es fresh ✨🌿',
    preparing:  'Preparando la mezcla perfecta... ¡esto va a estar épico! 🥚💚',
    baking:     'En el horno... ¡la anticipación es parte de la magia! 🔥🥑',
    decorating: '¡Hora de decorar! ¡Cada topping es una obra de arte! 🍓🎨',
    packaging:  'Empacando con estilo y mucho green love 📦💚',
    shipping:   '¡Tu cheesecake va volando hacia ti! 🚗💨🥑',
    delivered:  '¡Boom! ¡Entregado! ¡A disfrutar se ha dicho! 🎉🥑',
  },
};

const useOrderStore = create((set, get) => ({
  currentOrder: null,
  orders: [],
  loading: false,
  error: null,

  // Animation state
  animationStep: null,
  isAnimating: false,
  showSpeechBubble: false,
  currentMessage: '',

  // Constants
  ORDER_STEPS,
  STEP_LABELS,
  STEP_EMOJIS,
  COOKER_MESSAGES,

  getStepIndex: (step) => ORDER_STEPS.indexOf(step),
  getStepLabel: (step) => STEP_LABELS[step] || step,
  getStepEmoji: (step) => STEP_EMOJIS[step] || '',
  getProgress: () => {
    const order = get().currentOrder;
    if (!order) return 0;
    const idx = ORDER_STEPS.indexOf(order.estado);
    return Math.round((idx / (ORDER_STEPS.length - 2)) * 100); // exclude cancelled
  },

  getCookerMessage: (step) => {
    const order = get().currentOrder;
    if (!order) return '';
    return COOKER_MESSAGES[order.cocinero]?.[step] || '';
  },

  // Actions
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/orders', orderData);
      set({ currentOrder: data.order, loading: false });
      return data.order;
    } catch (error) {
      const msg = error.response?.data?.error || 'Error al crear pedido';
      set({ loading: false, error: msg });
      throw new Error(msg);
    }
  },

  fetchOrder: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get(`/orders/${orderId}`);
      set({ currentOrder: data.order, loading: false });
      return data.order;
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error });
    }
  },

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/orders');
      set({ orders: data.orders, loading: false });
    } catch (error) {
      set({ loading: false, error: error.response?.data?.error });
    }
  },

  advanceOrder: async (orderId) => {
    try {
      const { data } = await api.patch(`/orders/${orderId}/advance`);
      // Update in local state
      set(state => ({
        currentOrder: state.currentOrder?._id === orderId ? data.order : state.currentOrder,
        orders: state.orders.map(o => o._id === orderId ? data.order : o),
      }));
      return data.order;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al avanzar pedido');
    }
  },

  updateShipping: async (orderId, envio) => {
    try {
      const { data } = await api.patch(`/orders/${orderId}/shipping`, { envio });
      set(state => ({
        currentOrder: state.currentOrder?._id === orderId ? data.order : state.currentOrder,
      }));
      return data.order;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar envío');
    }
  },

  // Real-time update from WebSocket
  handleStatusUpdate: (updateData) => {
    set(state => {
      const { orderId, estado, pasoActual } = updateData;
      const updatedOrder = state.currentOrder?._id === orderId
        ? { ...state.currentOrder, estado, pasoActual }
        : state.currentOrder;

      return {
        currentOrder: updatedOrder,
        animationStep: estado,
        isAnimating: true,
        showSpeechBubble: true,
        currentMessage: COOKER_MESSAGES[updatedOrder?.cocinero]?.[estado] || '',
        orders: state.orders.map(o =>
          o._id === orderId ? { ...o, estado, pasoActual } : o
        ),
      };
    });
  },

  // Animation controls
  setAnimating: (isAnimating) => set({ isAnimating }),
  setShowSpeechBubble: (show) => set({ showSpeechBubble: show }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearOrder: () => set({ currentOrder: null, animationStep: null }),
}));

export default useOrderStore;
