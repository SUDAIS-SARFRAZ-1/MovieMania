import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./assets/pages/Home";
import Movies from "./assets/pages/Movies";
import TVShows from "./assets/pages/TVShows";
import MediaDetails from "./assets/pages/MediaDetails";
import WatchList from "./assets/pages/WatchList";
import Login from "./assets/pages/Login";
import Signup from "./assets/pages/Signup";
import Navbar from "./assets/components/Navbar";

axios.defaults.withCredentials = true;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    axios
      .get("/api/auth/check", { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <>
      {isAuthenticated === null ? (
        <div className="flex items-center justify-center h-screen bg-black text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
          <p className="ml-4 text-xl">Checking authentication...</p>
        </div>
      ) : (
        <>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />

            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />

            {isAuthenticated && (
              <>
                <Route path="/home" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv" element={<TVShows />} />
                <Route path="/:mediaType/:id" element={<MediaDetails />} />
                <Route path="/watchlist" element={<WatchList />} />
              </>
            )}
          </Routes>
        </>
      )}
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

      console.log("TMDB API KEY EXISTS:", !!API_KEY);
    </>
  );
};

export default App;
