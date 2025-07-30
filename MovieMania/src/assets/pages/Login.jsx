import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.email || !validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post("/api/login", form, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      window.location.href = "/";
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6"
      style={{
        backgroundImage: `url('backround.jpg')`,
        backgroundColor: "rgba(0,0,0,0.85)",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-lg gap-6">
        {/* Logo */}
        <img
          src="logo.png" // Place logo.png in /public
          alt="MovieMania Logo"
          className="w-90 h-auto mb-2"
        />

        {/* Login Form */}
        <div className="w-full bg-transparent backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-[#0bd1d1]/30">
          <h2 className="text-3xl font-bold text-center text-[#0bd1d1] mb-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-300">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#0bd1d1] hover:underline">
              Sign up here
            </Link>
          </p>

          {message && (
            <p className="text-center text-sm text-red-400 mt-4">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
