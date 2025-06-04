export const initialStore = () => ({
  // Datos de la API
  people: [],
  planets: [],
  vehicles: [],
  // Favoritos
  favorites: [], // Ejemplo: { id: "1", category: "people", name: "Luke Skywalker" }
  // UI
  loading: false,
  error: null
});

export default function storeReducer(store, action) {
  switch (action.type) {
    // Guardar datos de la API
    case 'SET_PEOPLE':
      return { ...store, people: action.payload };
    case 'SET_PLANETS':
      return { ...store, planets: action.payload };
    case 'SET_VEHICLES':
      return { ...store, vehicles: action.payload };
    // Favoritos
    case 'TOGGLE_FAVORITE':
      const exists = store.favorites.some(fav => fav.id === action.payload.id);
      return {
        ...store,
        favorites: exists
          ? store.favorites.filter(fav => fav.id !== action.payload.id) // Remover
          : [...store.favorites, action.payload] // Agregar
      };
    // Carga/Errores
    case 'SET_LOADING':
      return { ...store, loading: action.payload };
    case 'SET_ERROR':
      return { ...store, error: action.payload };
    default:
      return store;
  }
}