import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username || form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    if (!form.email || !validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("/api/signup", form, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      window.location.href = "/";
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-8 flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('backround.jpg')`, // place your image in public/background.jpg
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundBlendMode: "darken",
      }}
    >
      {/* Logo at the Top */}
      <img src="/logo.png" alt="MovieMania Logo" className="w-90 h-auto mb-6" />

      {/* Form */}
      <div className="w-full max-w-md bg-transparent backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#0bd1d1]/30">
        <h2 className="text-3xl font-bold text-center text-[#0bd1d1] mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-transparent text-white px-4 py-3 rounded-xl border border-[#0bd1d1]/20 focus:outline-none focus:ring-2 focus:ring-[#0bd1d1]"
              required
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white px-4 py-3 rounded-xl border border-[#0bd1d1]/20 focus:outline-none focus:ring-2 focus:ring-[#0bd1d1]"
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent text-white px-4 py-3 rounded-xl border border-[#0bd1d1]/20 focus:outline-none focus:ring-2 focus:ring-[#0bd1d1]"
              required
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#0bd1d1] hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0bd1d1] hover:underline">
            Login here
          </Link>
        </p>

        {message && (
          <p className="text-center text-sm text-red-400 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
