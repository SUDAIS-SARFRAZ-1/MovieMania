import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { searchAll } from "../api/Tmdb";
import axios from "axios";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const profileRef = useRef(null);
  const navigate = useNavigate();

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

  // 👤 Fetch user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load user info", err);
      }
    };
    fetchUser();
  }, []);

  // 📦 Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await axios.get("/api/logout", {}, { withCredentials: true });
      navigate("/");
      window.location.reload(); // refresh session
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-transparent text-white px-4 sm:px-8 py-1 w-full z-50 fixed top-0 border-b border-[#0bd1d1]/30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/">
          <img
            src="logo.png" // Place logo.png in /public
            alt="MovieMania Logo"
            className="w-52 h-auto mb-2"
          />
        </Link>

        <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-[#0bd1d1] transition-all">
              Home
            </Link>
          </li>
          <li>
            <Link to="/tv" className="hover:text-[#0bd1d1] transition-all">
              TV Shows
            </Link>
          </li>
          <li>
            <Link to="/movies" className="hover:text-[#0bd1d1] transition-all">
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/watchlist"
              className="hover:text-[#0bd1d1] transition-all"
            >
              Watchlist
            </Link>
          </li>
        </ul>

        {/* 🔍 Search & 👤 Profile */}
        <div className="flex items-center gap-4 relative">
          {/* 🔍 Search Bar */}
          <div className="relative w-52 sm:w-64">
            <div className="flex items-center bg-white/10 text-white px-4 py-2 rounded-full backdrop-blur-md">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none w-full placeholder-white/60 text-sm"
              />
              <FaSearch className="text-white/70 ml-2" />
            </div>

            {/* 📄 Search Dropdown */}
            {results.length > 0 && (
              <ul className="absolute z-50 mt-2 w-full bg-black rounded-lg max-h-64 overflow-y-auto shadow-md border border-[#0bd1d1]/40">
                {results.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/${item.media_type}/${item.id}`}
                      className="block p-2 text-sm hover:bg-[#0bd1d1]/20"
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                      }}
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

          {/* 👤 Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button onClick={() => setShowProfile(!showProfile)}>
              <FaUserCircle className="text-2xl text-white hover:text-[#0bd1d1] transition" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-black border border-[#0bd1d1]/30 rounded shadow-md text-sm z-50">
                <div className="p-3 border-b border-[#0bd1d1]/20">
                  <p className="font-semibold text-white">
                    {user.name || "Unknown"}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {user.email || "No Email"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-[#0bd1d1]/20 text-red-400"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
