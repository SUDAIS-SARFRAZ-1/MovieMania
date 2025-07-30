import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="w-[160px] sm:w-[200px] cursor-pointer shrink-0">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : "/no-poster.jpg"
            }
            alt={movie.title || movie.name}
            className="w-full h-auto rounded-xl"
          />
        </div>
        <h3 className="text-sm mt-2 text-white font-semibold text-center truncate">
          {movie.title || movie.name}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;
