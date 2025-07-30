import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getDetails, getVideos, getCredits } from "../api/Tmdb";

const MediaDetails = () => {
  const { mediaType, id } = useParams();
  const [data, setData] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [details, videos, credits] = await Promise.all([
        getDetails(mediaType, id),
        getVideos(mediaType, id),
        getCredits(mediaType, id),
      ]);

      setData(details);

      const trailerVideo = videos.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(trailerVideo?.key || null);
      setCast(credits.slice(0, 10));
    };

    fetchAll();
  }, [mediaType, id]);

  const handleAddToWatchlist = async () => {
    try {
      const res = await axios.post("/api/watchlist/add", {
        mediaId: data.id,
        title: data.title || data.name,
        poster: data.poster_path,
        mediaType,
      });

      console.log(res.data.message);
      alert("✅ Added to watchlist!");
    } catch (err) {
      console.error("❌ Failed to add to watchlist:", err);
      alert(err.response?.data?.message || "Error adding to watchlist");
    }
  };

  if (!data) return <div className="text-white p-8">Loading...</div>;

  return (
    <div
      className="min-h-screen text-white px-6 pt-20 pb-12 bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`,
        backgroundColor: "rgba(0,0,0,0.9)",
        backgroundBlendMode: "multiply",
      }}
    >
      {/* 🎬 Trailer */}
      {trailer && (
        <div className="mb-8 flex justify-center">
          <iframe
            width="55%"
            height="480"
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&controls=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
        </div>
      )}

      {/* 🎞️ Title */}
      <h1 className="text-4xl font-bold mb-4">{data.title || data.name}</h1>

      {/* 🏢 Production + 🎭 Genres + ➕ Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          {/* 🏢 Production */}
          <p className="text-lg font-medium text-[#0bd1d1] mb-2">
            Production:{" "}
            {data.production_companies?.slice(0, 3).map((c, i) => (
              <span key={i}>
                {c.name}
                {i < 2 && ", "}
              </span>
            ))}
          </p>

          {/* 🎭 Genres */}
          <div className="flex flex-wrap gap-2">
            {data.genres.map((g) => (
              <span
                key={g.id}
                className="bg-[#0bd1d1]/30 px-3 py-1 rounded-full text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>

        {/* ➕ Add to Watchlist Button */}
        <div>
          <button
            onClick={handleAddToWatchlist}
            className="px-4 py-2 rounded text-white hover:bg-[#0bd1d1] transition"
          >
            ➕ Add to Watchlist
          </button>
        </div>
      </div>

      {/* ⭐ Rating */}
      <p className="text-yellow-400 text-lg mb-6">
        ⭐ Rating: {data.vote_average?.toFixed(1)}
      </p>

      {/* 📺 Seasons (TV only) */}
      {mediaType === "tv" && data.seasons?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-[#0bd1d1]">Seasons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.seasons.map((season) => (
              <div
                key={season.id}
                className="bg-white/5 p-4 rounded-xl shadow-lg"
              >
                <img
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                      : "/no-image.png"
                  }
                  alt={season.name}
                  className="w-full h-auto rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{season.name}</h3>
                <p className="text-sm text-gray-300">
                  📅 Air Date: {season.air_date || "N/A"}
                </p>
                <p className="text-sm text-gray-300">
                  🎞️ Episodes: {season.episode_count}
                </p>
                <p className="text-sm mt-2">
                  {season.overview || "No overview available."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🧑 Cast */}
      <h2 className="text-2xl font-bold mb-3 text-[#0bd1d1]">Cast</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {cast.map((actor) => (
          <div key={actor.id} className="text-center w-[120px] shrink-0">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "/no-image.png"
              }
              alt={actor.name}
              className="rounded-xl w-full h-auto mb-2"
            />
            <p className="text-sm">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaDetails;
