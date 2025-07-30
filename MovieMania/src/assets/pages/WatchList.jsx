import { useEffect, useState } from "react";
import axios from "axios";

const Watchlist = () => {
  const [items, setItems] = useState([]);

  const fetchWatchlist = async () => {
    const res = await axios.get("/api/watchlist", { withCredentials: true });
    setItems(res.data);
  };

  const removeFromWatchlist = async (id) => {
    await axios.delete(`/api/watchlist/${id}`, { withCredentials: true });
    setItems(items.filter((item) => item._id !== id));
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div
      className="min-h-screen px-4 pt-24 pb-12 bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('backround.jpg')`,
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundBlendMode: "darken",
      }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-[#0bd1d1]">
        🎬 My Lists
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white/10 backdrop-blur-sm p-3 rounded-xl shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${item.poster}`}
              alt={item.title}
              className="rounded-lg w-full"
            />
            <h2 className="text-white text-sm mt-3 font-medium text-center">
              {item.title}
            </h2>
            <button
              onClick={() => removeFromWatchlist(item._id)}
              className="mt-2 block mx-auto text-sm text-red-400 hover:underline"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
