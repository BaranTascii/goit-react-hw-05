import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  if (!movies || movies.length === 0)
    return <p className={styles.empty}>No movies found.</p>;

  return (
    <ul className={styles.list}>
      {movies.map((m) => (
        <MovieItem key={m.id} movie={m} />
      ))}
    </ul>
  );
}

export default MovieList;
