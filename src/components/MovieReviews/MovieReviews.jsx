import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/moviesApi";
import Loader from "../Loader/Loader";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieReviews(movieId)
      .then((data) => setReviews(data))
      .catch(() => setError("Failed to load reviews"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={styles.err}>{error}</p>;
  if (!reviews || reviews.length === 0) return <p className={styles.empty}>No reviews found.</p>;

  return (
    <ul className={styles.list}>
      {reviews.map((r) => (
        <li key={r.id} className={styles.item}>
          <h4 className={styles.author}>{r.author}</h4>
          <p className={styles.content}>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default MovieReviews;