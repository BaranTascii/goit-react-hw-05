import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useParams,
  Outlet,
  NavLink,
} from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../../services/moviesApi";
import Loader from "../../components/Loader/Loader";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backRef = useRef(location.state?.from ?? "/movies");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch(() => setError("Failed to fetch movie details"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.err}>{error}</p>;
  if (!movie) return null;

  return (
    <main className={styles.main}>
      <Link to={backRef.current} className={styles.back}>
        ← Go back
      </Link>

      <div className={styles.container}>
        <img
          src={
            getImageUrl(movie.poster_path) ??
            "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h2>
            {movie.title}{" "}
            {movie.release_date ? `(${movie.release_date.slice(0, 4)})` : ""}
          </h2>
          <p>User score: {Math.round((movie.vote_average || 0) * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <p>{movie.genres?.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <section className={styles.extra}>
        <h3>Additional information</h3>
        <ul className={styles.links}>
          <li>
            <NavLink
              to="cast"
              state={{ from: backRef.current }}
              className={styles.link}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              state={{ from: backRef.current }}
              className={styles.link}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </section>

      <Outlet />
    </main>
  );
}

export default MovieDetailsPage;
