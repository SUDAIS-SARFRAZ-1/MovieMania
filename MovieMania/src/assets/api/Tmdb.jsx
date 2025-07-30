import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const today = new Date().toISOString().split("T")[0];


export const getUpcomingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.results.filter((movie) => movie.release_date > today);
};


export const getUpcomingTV = async () => {
  const res = await axios.get(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.results.filter((tv) => tv.first_air_date > today);
};


export const getTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.results;
};


export const getTrendingTV = async () => {
  const res = await axios.get(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.results;
};


export const getPopularMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.results;
};


export const getPopularTV = async () => {
  const res = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.results;
};

export const getMoviesByGenre = async (genreId) => {
  const res = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`,{withCredentials:false});
  return res.data.results;
};

export const getTopInPakistan = async () => {
  const res = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&region=PK`,{withCredentials:false});
  return res.data.results;
};


export const getTopTVInPakistan = async () => {
  const res = await axios.get(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&region=PK`,{withCredentials:false});
  return res.data.results;
};


export const getTVShowsByGenre = async (genreId) => {
  const res = await axios.get(`${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genreId}`,{withCredentials:false});
  return res.data.results;
};


export const getDetails = async (mediaType, id) => {
  const res = await axios.get(`${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}`,{withCredentials:false});
  return res.data;
};


export const getVideos = async (mediaType, id) => {
  const res = await axios.get(`${BASE_URL}/${mediaType}/${id}/videos?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.results;
};


export const getCredits = async (mediaType, id) => {
  const res = await axios.get(`${BASE_URL}/${mediaType}/${id}/credits?api_key=${API_KEY}`,{withCredentials:false});
  return res.data.cast;
};

export const searchAll = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`,{withCredentials:false});
  return res.data.results.filter((item) => item.media_type === "movie" || item.media_type === "tv");
};
