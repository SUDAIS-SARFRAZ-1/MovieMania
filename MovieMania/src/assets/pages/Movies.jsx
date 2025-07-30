import { useEffect, useState } from "react";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopInPakistan,
  getMoviesByGenre,
} from "../api/Tmdb";

import MovieRow from "../components/MovieRow";

const Movies = () => {
  const [rows, setRows] = useState({
    trending: [],
    popular: [],
    topInPakistan: [],
    action: [],
    comedy: [],
    crime: [],
    scifi: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      const [trending, popular, topInPK, action, comedy, crime, scifi] =
        await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getTopInPakistan(),
          getMoviesByGenre(28), // Action
          getMoviesByGenre(35), // Comedy
          getMoviesByGenre(80), // Crime
          getMoviesByGenre(878), // Sci-Fi
        ]);

      setRows({
        trending,
        popular,
        topInPakistan: topInPK,
        action,
        comedy,
        crime,
        scifi,
      });
    };

    fetchAll();
  }, []);

  return (
    <div
      className="min-h-screen bg-black text-white px-6 pt-28 pb-12"
      style={{
        backgroundImage: `url('backround.jpg')`,
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundBlendMode: "darken",
      }}
    >
      <MovieRow title="Trending Movies" movies={rows.trending} type="movie" />
      <MovieRow title="Popular Movies" movies={rows.popular} type="movie" />
      <MovieRow
        title="Top 10 in Pakistan"
        movies={rows.topInPakistan.slice(0, 10)}
        type="movie"
      />
      <MovieRow title="Action Movies" movies={rows.action} type="movie" />
      <MovieRow title="Comedy Movies" movies={rows.comedy} type="movie" />
      <MovieRow title="Crime Movies" movies={rows.crime} type="movie" />
      <MovieRow title="Sci-Fi Movies" movies={rows.scifi} type="movie" />
    </div>
  );
};

export default Movies;
