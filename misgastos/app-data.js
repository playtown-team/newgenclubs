// APP_DATA — catálogo local de la app.
//
// Acá NO vive contenido editorial: las notas, los retos semanales, el tip de la
// semana y las frases de "Dosis de Calma" viven en WordPress
// (contenidos.vip/misgastoseo) y se traen por REST — ver la sección
// "API DE CONTENIDO" en app.js.
//
// Lo que queda acá es el catálogo de categorías de Gasto Fijo: define el ícono
// y el color de cada vencimiento, va atado al código de la UI (no es contenido
// editable) y por eso se queda del lado del club, igual que los datos del
// usuario (movimientos/vencimientos/perfil), que viven 100% en localStorage —
// ver STORAGE_KEYS en app.js.

const APP_DATA = {
  // Categorías de Gasto Fijo / vencimiento — definen ícono y color en la UI.
  fixedExpenseCategories: [
    { id: 'streaming',  name: 'Streaming',           icon: 'play',    color: 'violet' },
    { id: 'servicios',  name: 'Servicios Básicos',   icon: 'bolt',    color: 'blue' },
    { id: 'tarjeta',    name: 'Tarjeta de Crédito',  icon: 'card',    color: 'orange' },
    { id: 'alquiler',   name: 'Vivienda',            icon: 'key',     color: 'green' },
    { id: 'creditos',   name: 'Créditos y Préstamos', icon: 'percent', color: 'red' },
    { id: 'salud',      name: 'Salud',               icon: 'heart',   color: 'cyan' },
    { id: 'transporte', name: 'Transporte',          icon: 'car',     color: 'blue' },
    { id: 'educacion',  name: 'Educación',           icon: 'cap',     color: 'violet' },
    { id: 'otros',      name: 'Otros',               icon: 'dots',    color: 'grey' },
  ],
};
