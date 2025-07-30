import { Link } from "react-router-dom";

const TVCard = ({ show }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Link to={`/tv/${show.id}`}>
      <div className="w-[160px] sm:w-[200px] cursor-pointer shrink-0">
        <div className="rounded-xl overflow-hidden shadow-md">
          <img
            src={
              show.poster_path
                ? `${imageBaseUrl}${show.poster_path}`
                : "/no-poster.jpg"
            }
            alt={show.name}
            className="w-full h-auto rounded-xl"
          />
        </div>
        <h3 className="text-sm mt-2 text-white font-semibold text-center truncate">
          {show.name}
        </h3>
      </div>
    </Link>
  );
};

export default TVCard;
