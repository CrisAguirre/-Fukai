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
  awakening:  'Confirmar Pedido',
  mold:       'Puesta a Punto',
  mixing:     'Mezcla de Ingredientes',
  pouring:    'Verter al Molde',
  baking:     'Horneado',
  cooling:    'Enfriar & Refrigerar',
  decorating: 'Decoración',
  packaging:  'Empaque',
  shipping:   'Entrega',
  delivered:  '¡Entregado! 🎉',
  cancelled:  'Cancelado',
};

const STEP_EMOJIS = {
  pending:    '⏳',
  awakening:  '💬',
  mold:       '🧰',
  mixing:     '🥣',
  pouring:    '🫗',
  baking:     '🔥',
  cooling:    '❄️',
  decorating: '🎨',
  packaging:  '📦',
  shipping:   '🏍️',
  delivered:  '🎉',
  cancelled:  '❌',
};

const STEP_LIBRETOS = {
  pending:    'El pedido se ha registrado. Espera a que tus cocineros se conecten contigo.',
  awakening:  'Tu cocinero elegido te saluda y confirma los detalles de tu cheesecake.',
  mold:       'Kitty, Kato y Chiwi preparan el molde con papel encerado y la base de galleta seleccionada.',
  mixing:     'Los tres chefs trabajan juntos: colocan los ingredientes en el mesón con la batidora y el bowl transparente.',
  pouring:    'La mezcla se vierte cuidadosamente desde el bowl transparente al molde preparado.',
  baking:     'El molde entra al horno. Dorado medio o completo según tu preferencia.',
  cooling:    'El cheesecake sale del horno y se deja enfriar antes de refrigerar.',
  decorating: 'Si seleccionaste decorado, uno de los chefs aplica el acabado sobre la capa superior.',
  packaging:  'El cheesecake se empaca en su domo transparente con cuidado.',
  shipping:   'El pedido se lleva en moto. Pronto llegarás a tu destino.',
  delivered:  '¡Boom! El cheesecake ha llegado a tus manos. A disfrutarlo se ha dicho 🎉',
  cancelled:  'El pedido fue cancelado.',
};

const STEP_CONVERSATIONS = {
  awakening: {
    kitty: '¡Hola, hola! 🎀 Yo soy Kitty, tu asistente favorita. ¿Qué cheesecake quieres hoy?',
    kato: 'Hey, hey! 🥑 Soy Kato. Díme, ¿qué relleno te llama más, el clásico o el de limón?',
    chiwi: '¡Buenos días, compañera! 🧉 Soy Chiwi. ¿Con base de galleta, sí? ¿Y con qué tipo de decorado?',
  },
  mold: {
    kitty: '¡Vamos, vamos! 🧁 Primero forramos el molde con papel encerado. ¡Todo en su lugar!',
    kato: 'Y si lleva base de galleta, la colocamos ahora. 🍪 Una base firme para un cheesecake perfecto.',
    chiwi: 'Molde listo, compañeros. Ahora sí, a mezclar con amor. 🧈',
  },
  mixing: {
    kitty: '¡La batidora trabaja! 🥣 Cada ingrediente cuenta, mezclamos con suavidad 💕',
    kato: 'El bowl transparente muestra cómo la mezcla va tomando forma. ¡Epico! 🥑✨',
    chiwi: 'Revisamos la consistencia... ¡perfecta! La clave está en la paciencia, amiga. 🧉',
  },
  pouring: {
    kitty: '¡Cuidado, cuidado! 🫗 Vertemos la mezcla al molde... sin derrames! 🎀',
    kato: 'La mezcla fluye hermosamente desde el bowl transparente. 💚 Se ve delicioso.',
    chiwi: 'Perfecta, compañera... ahora sí, al horno. 🧉🔥',
  },
  baking: {
    kitty: '¡Al horno con todo! 🔥 Dorado medio o dorado completo, tú decides, jefe. 🎀',
    kato: 'El aroma ya se siente... ¡la magia está en el horno! 🥑',
    chiwi: 'Paciencia, amigos. El tiempo es el ingrediente secreto. ⏳🧉',
  },
  cooling: {
    kitty: '¡Fuera del horno! ❄️ Ahora toca enfriar antes de meterlo a la nevera.',
    kato: 'En temperatura ambiente... y luego a la nevera para la refrigeración perfecta. 💚❄️',
    chiwi: 'La textura se define aquí, compañera. Cremosidad garantizada. 🧉',
  },
  decorating: {
    kitty: '¡Ahora lo más divertido! 🎨 A decorar con el acabado seleccionado. 🌸',
    kato: 'Frutos rojos, arequite, chantilli con oreo o bocadillo... ¡una obra de arte! 💚🎨',
    chiwi: 'Cada topping es una expresión de cariño. ¡Dejemos brillar este cheesecake! 🧉🎨',
  },
  packaging: {
    kitty: 'Empacando con cuidado en el domo transparente... 📦🎀 ¡Nada se mueve!',
    kato: 'Protegemos cada detalle para el viaje. 💚📦 Fresh packing!',
    chiwi: 'El cheesecake está listo. Un abrazo incluido en cada empaque. 🧉💝',
  },
  shipping: {
    kitty: '¡El pedido va en moto! 🏍️🎀 Rumbo a tu dirección.',
    kato: 'En camino... soon you will receive it! 🏍️💚',
    chiwi: '¡Tu cheesecake viaja hacia ti! Nos vemos pronto, compañera. 🏍️🧉',
  },
  delivered: {
    kitty: '¡Llegó! 🎉 ¡Disfrútalo con todo tu corazón! 🎀',
    kato: '¡Boom! ¡A disfrutar se ha dicho! 💚🥑',
    chiwi: '¡Listo! Espero que lo disfrutes tanto como yo al hacerlo. 🧉🎉',
  },
};

const COOKER_MESSAGES = {
  kitty: {
    awakening:  '¡Hola, hola! 🎀 Yo soy Kitty, tu asistente favorita. ¿Qué cheesecake quieres hoy?',
    mold:       '¡Vamos, vamos! 🧁 Primero forramos el molde con papel encerado. ¡Todo en su lugar!',
    mixing:     '¡La batidora trabaja! 🥣 Cada ingrediente cuenta, mezclamos con suavidad 💕',
    pouring:    '¡Cuidado, cuidado! 🫗 Vertemos la mezcla al molde... sin derrames! 🎀',
    baking:     '¡Al horno con todo! 🔥 Dorado medio o dorado completo, tú decides. 🎀',
    cooling:    '¡Fuera del horno! ❄️ Ahora toca enfriar antes de meterlo a la nevera.',
    decorating: '¡Ahora lo más divertido! 🎨 A decorar con el acabado seleccionado. 🌸',
    packaging:  'Empacando con cuidado en el domo transparente... 📦🎀 ¡Nada se mueve!',
    shipping:   '¡El pedido va en moto! 🏍️🎀 Rumbo a tu dirección.',
    delivered:  '¡Llegó! 🎉 ¡Disfrútalo con todo tu corazón! 🎀',
  },
  kato: {
    awakening:  'Hey, hey! 🥑 Soy Kato. Díme, ¿qué relleno te llama más, el clásico o el de limón?',
    mold:       'Y si lleva base de galleta, la colocamos ahora. 🍪 Una base firme para un cheesecake perfecto.',
    mixing:     'El bowl transparente muestra cómo la mezcla va tomando forma. ¡Epico! 🥑✨',
    pouring:    'La mezcla fluye hermosamente desde el bowl transparente. 💚 Se ve delicioso.',
    baking:     'El aroma ya se siente... ¡la magia está en el horno! 🥑',
    cooling:    'En temperatura ambiente... y luego a la nevera para la refrigeración perfecta. 💚❄️',
    decorating: 'Frutos rojos, arequite, chantilli con oreo o bocadillo... ¡una obra de arte! 💚🎨',
    packaging:  'Protegemos cada detalle para el viaje. 💚📦 Fresh packing!',
    shipping:   'En camino... soon you will receive it! 🏍️💚',
    delivered:  '¡Boom! ¡A disfrutar se ha dicho! 💚🥑',
  },
  chiwi: {
    awakening:  '¡Buenos días, compañera! 🧉 Soy Chiwi. ¿Con base de galleta, sí? ¿Y con qué decorado?',
    mold:       'Molde listo, compañeros. Ahora sí, a mezclar con amor. 🧈',
    mixing:     'Revisamos la consistencia... ¡perfecta! La clave está en la paciencia, amiga. 🧉',
    pouring:    'Perfecta, compañera... ahora sí, al horno. 🧉🔥',
    baking:     'Paciencia, amigos. El tiempo es el ingrediente secreto. ⏳🧉',
    cooling:    'La textura se define aquí, compañera. Cremosidad garantizada. 🧉',
    decorating: 'Cada topping es una expresión de cariño. ¡Dejemos brillar este cheesecake! 🧉🎨',
    packaging:  'El cheesecake está listo. Un abrazo incluido en cada empaque. 🧉💝',
    shipping:   '¡Tu cheesecake viaja hacia ti! Nos vemos pronto, compañera. 🏍️🧉',
    delivered:  '¡Listo! Espero que lo disfrutes tanto como yo al hacerlo. 🧉🎉',
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

const COOKERS = {
  kitty:  { name: 'Kitty',  fullName: 'Hello Kitty', emoji: '🎀' },
  kato:   { name: 'Kato',   fullName: 'Aguacate',    emoji: '🥑' },
  chiwi:  { name: 'Chiwi',  fullName: 'Capibara',    emoji: '🧉' },
};

const useOrderStore = create((set, get) => ({
  currentOrder: null,
  orders: [],
  loading: false,
  error: null,

  animationStep: null,
  isAnimating: false,
  showSpeechBubble: false,
  currentMessage: '',

  ORDER_STEPS,
  STEP_LABELS,
  STEP_EMOJIS,
  STEP_LIBRETOS,
  STEP_CONVERSATIONS,
  COOKER_MESSAGES,
  COOKERS,
  PRECIOS,

  getStepIndex: (step) => ORDER_STEPS.indexOf(step),
  getStepLabel: (step) => STEP_LABELS[step] || step,
  getStepEmoji: (step) => STEP_EMOJIS[step] || '',
  getStepLibreto: (step) => STEP_LIBRETOS[step] || '',
  getConversation: (step, cooker) => STEP_CONVERSATIONS[step]?.[cooker] || '',
  getAllConversation: (step) => STEP_CONVERSATIONS[step] || {},
  getProgress: () => {
    const order = get().currentOrder;
    if (!order) return 0;
    const idx = ORDER_STEPS.indexOf(order.estado);
    return Math.round((idx / (ORDER_STEPS.length - 2)) * 100);
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

  handleStatusUpdate: (updateData) => {
    set(state => {
      const { orderId, estado, pasoActual } = updateData;
      const updatedOrder = state.currentOrder?._id === orderId
        ? { ...state.currentOrder, estado, pasoActual }
        : state.currentOrder;

      const cooker = updatedOrder?.cocinero || 'kitty';

      return {
        currentOrder: updatedOrder,
        animationStep: estado,
        isAnimating: true,
        showSpeechBubble: true,
        currentMessage: COOKER_MESSAGES[cooker]?.[estado] || '',
        orders: state.orders.map(o =>
          o._id === orderId ? { ...o, estado, pasoActual } : o
        ),
      };
    });
  },

  setAnimating: (isAnimating) => set({ isAnimating }),
  setShowSpeechBubble: (show) => set({ showSpeechBubble: show }),
  setCurrentOrder: (order) => set({ currentOrder: order }),
  clearOrder: () => set({ currentOrder: null, animationStep: null }),
}));

export default useOrderStore;