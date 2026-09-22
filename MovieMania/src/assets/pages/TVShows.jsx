// src/pages/TVShows.jsx
import { useEffect, useState } from "react";
import {
  getTrendingTV,
  getPopularTV,
  getTopTVInPakistan,
  getTVShowsByGenre,
} from "../api/Tmdb";

import MovieRow from "../components/MovieRow";

const TVShows = () => {
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
          getTrendingTV(),
          getPopularTV(),
          getTopTVInPakistan(),
          getTVShowsByGenre(10759), // Action & Adventure
          getTVShowsByGenre(35), // Comedy
          getTVShowsByGenre(80), // Crime
          getTVShowsByGenre(10765), // Sci-Fi & Fantasy
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
      className="min-h-screen bg-black text-white px-3 sm:px-6 pt-24 sm:pt-28 pb-12"
      style={{
        backgroundImage: `url('backround.jpg')`,
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundBlendMode: "darken",
      }}
    >
      <MovieRow title="Trending TV Shows" movies={rows.trending} type="tv" />
      <MovieRow title="Popular TV Shows" movies={rows.popular} type="tv" />
      <MovieRow
        title="Top 10 in Pakistan"
        movies={rows.topInPakistan.slice(0, 10)}
        type="tv"
      />
      <MovieRow title="Action & Adventure" movies={rows.action} type="tv" />
      <MovieRow title="Comedy TV Shows" movies={rows.comedy} type="tv" />
      <MovieRow title="Crime TV Shows" movies={rows.crime} type="tv" />
      <MovieRow title="Sci-Fi & Fantasy" movies={rows.scifi} type="tv" />
    </div>
  );
};

export default TVShows;
