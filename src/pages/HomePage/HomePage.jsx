import React, { useEffect, useState } from "react";
import { fetchTrending } from "../../services/moviesApi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTrending()
      .then((data) => setMovies(data))
      .catch(() => setError("Failed to fetch trending movies"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Trending today</h2>
      {loading && <Loader />}
      {error && <p className={styles.err}>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </main>
  );
}

export default HomePage;
