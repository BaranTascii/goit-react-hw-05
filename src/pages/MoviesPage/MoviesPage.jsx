import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/moviesApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";
  const [query, setQuery] = useState(queryParam);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!queryParam) {
      setMovies([]);
      return;
    }
    setLoading(true);
    searchMovies(queryParam)
      .then((data) => setMovies(data))
      .catch(() => setError("Failed to search movies"))
      .finally(() => setLoading(false));
  }, [queryParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setSearchParams({});
      setMovies([]);
      return;
    }
    setSearchParams({ query: trimmed });
  };

  return (
    <main className={styles.main}>
      <h2>Search movies</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type movie name"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className={styles.err}>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </main>
  );
}

export default MoviesPage;
