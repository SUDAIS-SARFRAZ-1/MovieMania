import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./assets/pages/Home";
import Movies from "./assets/pages/Movies";
import TVShows from "./assets/pages/TVShows";
import MediaDetails from "./assets/pages/MediaDetails";
import WatchList from "./assets/pages/WatchList";
import Navbar from "./assets/components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/:mediaType/:id" element={<MediaDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </>
  );
};

export default App;
