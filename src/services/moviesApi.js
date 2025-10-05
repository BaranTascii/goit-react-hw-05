import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const token = import.meta.env.VITE_TMDB_TOKEN;

if (!token) {
  console.warn("VITE_TMDB_TOKEN is not set. Add it to .env file as VITE_TMDB_TOKEN.");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

export const getImageUrl = (path) => (path ? `${IMAGE_BASE}${path}` : null);

export const fetchTrending = async () => {
  const res = await axiosInstance.get("/trending/movie/day");
  return res.data.results;
};

export const searchMovies = async (query, page = 1) => {
  const res = await axiosInstance.get("/search/movie", {
    params: { query, include_adult: false, language: "en-US", page }
  });
  return res.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const res = await axiosInstance.get(`/movie/${movieId}`, { params: { language: "en-US" } });
  return res.data;
};

export const fetchMovieCredits = async (movieId) => {
  const res = await axiosInstance.get(`/movie/${movieId}/credits`);
  return res.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const res = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return res.data.results;
};
