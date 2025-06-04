import { Link } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">Star Wars DB</Link>
        <div className="ml-auto">
          <Link to="/demo" className="btn btn-primary me-2">
            Favorites ({store.favorites.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};