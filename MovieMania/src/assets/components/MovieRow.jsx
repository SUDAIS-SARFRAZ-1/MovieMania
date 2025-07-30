import MovieCard from "./MovieCard";
import TVCard from "./TvCard";

const MovieRow = ({ title, movies, type}) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl text-[#0bd1d1] font-semibold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.map((item) =>
          type === "tv" ? (
            <TVCard key={item.id} show={item} />
          ) : (
            <MovieCard key={item.id} movie={item} />
          )
        )}
      </div>
    </div>
  );
};

export default MovieRow;
