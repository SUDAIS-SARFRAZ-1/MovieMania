import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Base URLs for images from TMDB
const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // For posters
const backdropBaseUrl = "https://image.tmdb.org/t/p/original"; // For background

// HeroSlider component
const HeroSlider = ({ items = [], setBgImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Current center item index

  // Auto-rotate the slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Go to next index cyclically
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [items.length]);

  // Update background image whenever currentIndex or items change
  useEffect(() => {
    const current = items[currentIndex];
    if (current && setBgImage) {
      // Use backdrop image if available, fallback to poster
      const bgPath = current.backdrop_path || current.poster_path;
      // Call parent function to set background image
      setBgImage(`${backdropBaseUrl}${bgPath}`);
    }
  }, [currentIndex, items, setBgImage]);

  // Determine media type for routing: movie or tv
  const getMediaType = (item) => {
    if (item.media_type) return item.media_type;         // Use provided media_type
    return item.title ? "movie" : "tv";                   // Infer based on `title` or `name`
  };

  // Utility to handle circular indexing (e.g., -1 becomes last)
  const getItem = (index) => {
    const total = items.length;
    return items[(index + total) % total];
  };

  // Get left, center, and right items for the carousel
  const leftItem = getItem(currentIndex - 1);
  const centerItem = getItem(currentIndex);
  const rightItem = getItem(currentIndex + 1);

  return (
    <div className="relative w-full overflow-x-hidden h-[480px] flex items-center justify-center mb-16 px-4">
      {/* Carousel container (centered horizontally) */}
      <div className="relative flex items-center justify-center w-[1200px] gap-6">
        {/* Left Item */}
        {leftItem && (
          <Link
            to={`/${getMediaType(leftItem)}/${leftItem.id}`}
            className="w-[200px] h-[320px] rounded-xl z-20 opacity-60 hover:opacity-80 transform hover:scale-105 transition-all duration-300 -translate-x-8"
          >
            <img
              src={`${imageBaseUrl}${
                leftItem.poster_path || leftItem.backdrop_path
              }`}
              alt={leftItem.title || leftItem.name}
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </Link>
        )}

        {/* Center Item (highlighted) */}
        {centerItem && (
          <Link
            to={`/${getMediaType(centerItem)}/${centerItem.id}`}
            className="w-[300px] h-[420px] rounded-2xl z-30 transform hover:scale-110 transition-all duration-500"
          >
            <img
              src={`${imageBaseUrl}${
                centerItem.poster_path || centerItem.backdrop_path
              }`}
              alt={centerItem.title || centerItem.name}
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </Link>
        )}

        {/* Right Item */}
        {rightItem && (
          <Link
            to={`/${getMediaType(rightItem)}/${rightItem.id}`}
            className="w-[200px] h-[320px] rounded-xl z-20 opacity-60 hover:opacity-80 transform hover:scale-105 transition-all duration-300 translate-x-8"
          >
            <img
              src={`${imageBaseUrl}${
                rightItem.poster_path || rightItem.backdrop_path
              }`}
              alt={rightItem.title || rightItem.name}
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;
