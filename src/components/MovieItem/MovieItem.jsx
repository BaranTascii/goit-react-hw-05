import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../../services/moviesApi";
import styles from "./MovieItem.module.css";

function MovieItem({ movie }) {
  const location = useLocation();
  const poster = getImageUrl(movie.poster_path);

  return (
    <li className={styles.item}>
      <Link to={`/movies/${movie.id}`} state={{ from: location }}>
        <img
          src={poster ?? "https://via.placeholder.com/300x450?text=No+Image"}
          alt={movie.title}
          className={styles.img}
        />
        <h4 className={styles.title}>{movie.title}</h4>
      </Link>
    </li>
  );
}

export default MovieItem;
