import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits, getImageUrl } from "../../services/moviesApi";
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieCredits(movieId)
      .then((data) => setCast(data))
      .catch(() => setError("Failed to load cast"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.err}>{error}</p>;
  if (!cast || cast.length === 0)
    return <p className={styles.empty}>No cast information.</p>;

  return (
    <ul className={styles.list}>
      {cast.map((c) => (
        <li key={c.credit_id} className={styles.item}>
          <img
            src={
              getImageUrl(c.profile_path) ??
              "https://via.placeholder.com/100x150?text=No+Image"
            }
            alt={c.name}
            className={styles.img}
          />
          <div className={styles.info}>
            <p className={styles.name}>{c.name}</p>
            <p className={styles.char}>as {c.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieCast;
