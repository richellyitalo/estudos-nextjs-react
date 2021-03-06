import { useContext, useRef, useEffect } from 'react';
import './App.css';
import FavoritesContext from './state/favorites-context';

function App() {
  const inputNome = useRef();
  const favoritesCtx = useContext(FavoritesContext);

  useEffect(() => {
    console.log(inputNome.current.value);
  }, [inputNome]);

  function addFavorite() {
    const obj = { id: new Date().getTime() };
    favoritesCtx.addFavorite(obj);
  }

  function removeFavorite() {
    const idFavoriteToRemove = favoritesCtx.favorites[0].id;
    favoritesCtx.removeFavorite(idFavoriteToRemove);
  }

  if (favoritesCtx.totalFavorites > 0) {
  } else {
    <ul>
      <li>{}</li>
    </ul>;
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(inputNome.current.value);
  }

  return (
    <div className="App">
      <h3>Input</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputNome} />
        <button>Enviar</button>
      </form>
      <header className="App-header">
        <button onClick={addFavorite}>Add</button>
        <button onClick={removeFavorite}>Remove</button>
        <p>Total of favorites:{favoritesCtx.totalFavorites}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
