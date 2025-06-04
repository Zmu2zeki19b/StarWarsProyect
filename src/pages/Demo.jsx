import { useGlobalReducer } from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

export const Demo = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="container">
      <h1 className="my-4">Your Favorites</h1>
      {store.favorites.length === 0 ? (
        <p>No favorites yet. Add some from the Home page!</p>
      ) : (
        <div className="row">
          {store.favorites.map((fav) => (
            <div key={fav.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={`https://starwars-visualguide.com/assets/img/${fav.category === 'people' ? 'characters' : fav.category}/${fav.id}.jpg`}
                  className="card-img-top"
                  alt={fav.name}
                />
                <div className="card-body">
                  <h5>{fav.name}</h5>
                  <Link to={`/${fav.category}/${fav.id}`} className="btn btn-sm btn-info">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};