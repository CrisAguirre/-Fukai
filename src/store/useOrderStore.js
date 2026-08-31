import { create } from 'zustand';
import api from '../services/api';

const ORDER_STEPS = [
  'pending',
  'awakening',
  'mold',
  'mixing',
  'pouring',
  'baking',
  'cooling',
  'decorating',
  'packaging',
  'shipping',
  'delivered',
  'cancelled',
];

const STEP_LABELS = {
  pending:    'Pendiente',
  awakening:  '¡Despertando al cocinero!',
  mold:       'Preparar molde',
  mixing:     'Mezclar ingredientes',
  pouring:    'Verter en el molde',
  baking:     'Horneando',
  cooling:    'Enfriar y refrigerar',
  decorating: 'Decorando',
  packaging:  'Empacando con cariño',
  shipping:   '¡En camino!',
  delivered:  '¡Entregado! 🎉',
  cancelled:  'Cancelado',
};

const STEP_EMOJIS = {
  pending:    '⏳',
  awakening:  '🌅',
  mold:       '🧁',
  mixing:     '🥣',
  pouring:    '🫗',
  baking:     '🔥',
  cooling:    '❄️',
  decorating: '🎨',
  packaging:  '📦',
  shipping:   '🚗',
  delivered:  '🎉',
  cancelled:  '❌',
};

const STEP_LIBRETOS = {
  pending:    'El pedido se ha registrado. Esperando confirmación de pago.',
  awakening:  'El cocinero despierta y se prepara para crear tu cheesecake con amor.',
  mold:       'Se prepara el molde con papel encerado. Se añade la base de galleta si fue seleccionada.',
  mixing:     'En un recipiente aparte, se mezclan todos los ingredientes del relleno con la mayor delicadeza.',
  pouring:    'La mezcla se vierte cuidadosamente en el molde preparado, listo para el horno.',
  baking:     'El cheesecake entra al horno. Tiempo de dorado medio o completo según preferencia.',
  cooling:    'Se deja enfriar y luego se refrigera para lograr la textura perfecta.',
  decorating: 'Se aplica el decorado seleccionado sobre la capa superior con acabado profesional.',
  packaging:  'Se empaca con cariño, protegiendo cada detalle para el viaje.',
  shipping:   '¡Tu cheesecake va en camino! Recíbelo en la dirección indicada.',
  delivered:  '¡Boom! El cheesecake ha llegado. A disfrutarlo se ha dicho 🎉',
  cancelled:  'El pedido fue cancelado.',
};

const COOKER_MESSAGES = {
  capibara: {
    awakening:  '¡Buenos días! Soy Capi 🧉 Voy a preparar tu cheesecake con mucho amor...',
    mold:       'Preparando el molde con papel encerado... ¡esto es arte! 🧁',
    mixing:     'Mezclando el relleno de limón con suavidad... despacio, como me gusta 🥣🍋',
    pouring:    'Vertiendo la mezcla en el molde... ¡cuidado, sin derrames! 🫗',
    baking:     'Al horno con dorado perfecto... la paciencia es mi ingrediente secreto 🔥',
    cooling:    'Refrigerando para que la textura quede cremosa... ❄️',
    decorating: '¡Ahora lo más divertido! A decorar con el acabado seleccionado 🎨',
    packaging:  'Empacando tu cheesecake con un abrazo incluido 💝',
    shipping:   '¡Tu cheesecake va en camino! Nos vemos pronto 🚗💨',
    delivered:  '¡Listo! Espero que lo disfrutes tanto como yo al hacerlo 🎉',
  },
  kitty: {
    awakening:  '¡Hola! Soy Kitty 🎀 ¡Vamos a cocinar algo especial!',
    mold:       '¡Mi molde está listo con su papel encerado! Todo en su lugar ✨🧁',
    mixing:     '¡Mezclando con amor! Cada ingrediente cuenta 🥣💕',
    pouring:    '¡Vertiendo con cuidado! Este es el momento más lindo 🫗🎀',
    baking:     'Horneando con cariño... ¡dorado perfecto! 🔥🎀',
    cooling:    'Refrigerando... ¡huele delicioso ya! ❄️🎀',
    decorating: '¡La decoración es mi parte favorita! 🎨🌸',
    packaging:  'Envolviendo tu regalo con un moño especial 🎁💝',
    shipping:   '¡Tu cheesecake viaja hacia ti con amor! 🚗💕',
    delivered:  '¡Llegó! ¡Disfrútalo con todo tu corazón! 🎉🎀',
  },
  aguacate: {
    awakening:  '¡Hey! Soy Avo 🥑 ¡Listo para cocinar algo increíble!',
    mold:       '¡Bienvenido a mi molde! Aquí todo es fresh 🧁🌿',
    mixing:     'Preparando la mezcla perfecta... ¡esto va a estar épico! 🥣💚',
    pouring:    '¡Vertiendo con estilo! La mezcla queda hermosa 🫗🥑',
    baking:     'En el horno... ¡la anticipación es parte de la magia! 🔥🥑',
    cooling:    'Enfriando y refrigerando... ¡fresh love! ❄️💚',
    decorating: '¡Hora de decorar! ¡Cada topping es una obra de arte! 🎨',
    packaging:  'Empacando con estilo y mucho green love 📦💚',
    shipping:   '¡Tu cheesecake va volando hacia ti! 🚗💨🥑',
    delivered:  '¡Boom! ¡Entregado! ¡A disfrutar se ha dicho! 🎉🥑',
  },
};

const PRECIOS = {
  relleno: {
    limon: 25,
    clasica: 0,
  },
  base_galleta: {
    oreo: 25,
    vainilla: 15,
    null: 0,
  },
  dorado: {
    medio: 0,
    dorado: 30,
  },
  decorado: {
    frutos_rojos: 35,
    arequite: 40,
    chantilli_oreo: 45,
    bocadillo: 30,
    sin_decorar: 0,
  },
  base_horneado: 350,
  base_refrigerado: 300,
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
  STEP_LIBRETOS,
  COOKER_MESSAGES,
  PRECIOS,

  getStepIndex: (step) => ORDER_STEPS.indexOf(step),
  getStepLabel: (step) => STEP_LABELS[step] || step,
  getStepEmoji: (step) => STEP_EMOJIS[step] || '',
  getStepLibreto: (step) => STEP_LIBRETOS[step] || '',
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

  calculatePrice: (cheesecake) => {
    let precio = cheesecake.tipo === 'horneado' ? PRECIOS.base_horneado : PRECIOS.base_refrigerado;
    if (cheesecake.relleno === 'limon') precio += PRECIOS.relleno.limon;
    if (cheesecake.base_galleta === 'oreo') precio += PRECIOS.base_galleta.oreo;
    else if (cheesecake.base_galleta === 'vainilla') precio += PRECIOS.base_galleta.vainilla;
    if (cheesecake.dorado === 'dorado') precio += PRECIOS.dorado.dorado;
    if (PRECIOS.decorado[cheesecake.decorado]) precio += PRECIOS.decorado[cheesecake.decorado];
    return precio;
  },

  // Actions
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const precio = get().calculatePrice(orderData.cheesecake);
      const { data } = await api.post('/orders', { ...orderData, precio });
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