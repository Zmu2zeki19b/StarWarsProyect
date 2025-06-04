import { useEffect } from "react";
import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async (category) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch(`https://swapi.tech/api/${category}`);
        const data = await response.json();
        dispatch({ type: `SET_${category.toUpperCase()}`, payload: data.results });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchData('people');
    fetchData('planets');
    fetchData('vehicles');
  }, []);

  const renderCard = (item, category) => {
    const isFavorite = store.favorites.some(fav => fav.id === item.uid);
    return (
      <div key={item.uid} className="col-md-4 mb-4">
        <div className="card">
          <img
            src={`https://starwars-visualguide.com/assets/img/${category === 'people' ? 'characters' : category}/${item.uid}.jpg`}
            className="card-img-top"
            alt={item.name}
            onError={(e) => e.target.src = 'https://via.placeholder.com/400x200?text=No+Image'}
          />
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <button
              onClick={() => dispatch({
                type: 'TOGGLE_FAVORITE',
                payload: { id: item.uid, category, name: item.name }
              })}
              className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`}
            >
              {isFavorite ? '❤️ Remove' : '♡ Add'}
            </button>
            <Link to={`/${category}/${item.uid}`} className="btn btn-info ms-2">
              Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="my-4">Star Wars Databank</h1>
      {store.loading && <div className="text-center">Loading...</div>}
      {store.error && <div className="alert alert-danger">{store.error}</div>}

      <h2>Characters</h2>
      <div className="row">
        {store.people.map(person => renderCard(person, 'people'))}
      </div>

      <h2 className="mt-4">Planets</h2>
      <div className="row">
        {store.planets.map(planet => renderCard(planet, 'planets'))}
      </div>

      <h2 className="mt-4">Vehicles</h2>
      <div className="row">
        {store.vehicles.map(vehicle => renderCard(vehicle, 'vehicles'))}
      </div>
    </div>
  );
};