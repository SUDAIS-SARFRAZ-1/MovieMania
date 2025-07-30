import { useEffect, useState } from "react";
import {
  getUpcomingMovies,
  getUpcomingTV,
  getTrendingMovies,
  getTrendingTV,
  getPopularMovies,
  getPopularTV,
} from "../api/Tmdb";

import MovieRow from "../components/MovieRow";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
  const [bgImage, setBgImage] = useState("");
  const [rows, setRows] = useState({
    upcomingMovies: [],
    upcomingTV: [],
    trendingMovies: [],
    trendingTV: [],
    popularMovies: [],
    popularTV: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      const [
        upcomingMovies,
        upcomingTV,
        trendingMovies,
        trendingTV,
        popularMovies,
        popularTV,
      ] = await Promise.all([
        getUpcomingMovies(),
        getUpcomingTV(),
        getTrendingMovies(),
        getTrendingTV(),
        getPopularMovies(),
        getPopularTV(),
      ]);

      setRows({
        upcomingMovies,
        upcomingTV,
        trendingMovies,
        trendingTV,
        popularMovies,
        popularTV,
      });
    };

    fetchAll();
  }, []);

  return (
    <div
      className="min-h-screen bg-no-repeat bg-center bg-cover bg-fixed px-6 pt-28 pb-12 transition-all duration-500"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundColor: "#000",
      }}
    >
      {/* 🔥 Slider with dynamic background */}
      <HeroSlider
        items={[
          ...rows.trendingMovies.slice(0, 5),
          ...rows.trendingTV.slice(0, 5),
        ]}
        setBgImage={setBgImage}
      />

      {/* 🎞️ Movie + TV Rows */}
      {rows.upcomingMovies?.length > 0 && (
        <MovieRow
          title="Upcoming Movies"
          movies={rows.upcomingMovies}
          type="movie"
        />
      )}
      {rows.upcomingTV?.length > 0 && (
        <MovieRow
          title="Upcoming TV Shows"
          movies={rows.upcomingTV}
          type="tv"
        />
      )}
      {rows.trendingMovies?.length > 0 && (
        <MovieRow
          title="Trending Movies"
          movies={rows.trendingMovies}
          type="movie"
        />
      )}
      {rows.trendingTV?.length > 0 && (
        <MovieRow
          title="Trending TV Shows"
          movies={rows.trendingTV}
          type="tv"
        />
      )}
      {rows.popularMovies?.length > 0 && (
        <MovieRow
          title="Popular Movies"
          movies={rows.popularMovies}
          type="movie"
        />
      )}
      {rows.popularTV?.length > 0 && (
        <MovieRow title="Popular TV Shows" movies={rows.popularTV} type="tv" />
      )}
    </div>
  );
};

export default Home;
