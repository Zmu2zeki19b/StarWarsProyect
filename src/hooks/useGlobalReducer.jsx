import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"; 

const StoreContext = createContext();
export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
export function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useGlobalReducer debe usarse dentro de un StoreProvider");
  }
  return context;
}
   
export default useGlobalReducer;