import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { searchAll } from "../api/Tmdb";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "TV Shows", to: "/tv" },
  { name: "Movies", to: "/movies" },
  { name: "Watchlist", to: "/watchlist" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 🔍 Search bar debounce
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        searchAll(query).then(setResults);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const SearchBox = ({ className = "" }) => (
    <div className={`relative w-full sm:w-64 ${className}`}>
      <div className="flex items-center bg-white/10 text-white px-4 py-2 rounded-full backdrop-blur-md">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none w-full placeholder-white/60 text-sm"
        />
        <FaSearch className="text-white/70 ml-2 shrink-0" />
      </div>

      {results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-black rounded-lg max-h-64 overflow-y-auto shadow-md border border-[#0bd1d1]/40">
          {results.map((item) => (
            <li key={item.id}>
              <Link
                to={`/${item.media_type}/${item.id}`}
                className="block p-2 text-sm hover:bg-[#0bd1d1]/20"
                onClick={closeMobileMenu}
              >
                {item.title || item.name}{" "}
                <span className="text-xs text-gray-400">
                  ({item.media_type})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <nav className="bg-black/60 text-white w-full z-50 fixed top-0 border-b border-[#0bd1d1]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <Link to="/" onClick={closeMobileMenu} className="shrink-0">
          <img
            src="/logo.png"
            alt="MovieMania Logo"
            className="w-32 sm:w-40 h-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.to} className="hover:text-[#0bd1d1] transition-all">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop search */}
        <SearchBox className="hidden lg:block" />

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden text-xl text-white/90 hover:text-[#0bd1d1] transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="lg:hidden px-4 sm:px-6 pb-5 flex flex-col gap-4">
          <SearchBox />
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  onClick={closeMobileMenu}
                  className="block py-1 hover:text-[#0bd1d1] transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
