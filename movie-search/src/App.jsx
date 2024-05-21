import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?apikey=e6253e9";

function App() {
  const [movies, setMovies] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("shrek");
  }, []);
  return (
    <>
      <div className="app">
        <h1>movieland</h1>
        <div className="search">
          <input
            placeholder="search for movies"
            type="text"
            value={userSearch}
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(userSearch)}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => {
              return <MovieCard key={movie.imdbID} movie={movie} />;
            })}
          </div>
        ) : (
          <div className="empty">
            <h2>no movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
