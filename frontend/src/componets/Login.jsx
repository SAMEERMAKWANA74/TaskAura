import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(async (res) => {
      if (res.ok) {
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/workplace");
      } else {
        setError(await res.text() || "Invalid credentials");
      }
    })
    .catch(() => setError("Network error, please try again."));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/45 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 border border-white/30 animate-fade-in">
        <h2 className="text-4xl font-black text-center text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-700 font-medium mb-8">Sign in to access your workspace.</p>

        {error && <div className="mb-4 text-red-600 bg-red-100/50 p-3 rounded-xl text-sm font-semibold text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required 
                     className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/80 border border-white/40 outline-none focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required 
                     className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/80 border border-white/40 outline-none focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all" />
            </div>
          </div>

          <button type="submit" className="w-full py-5 rounded-2xl bg-[#778873] text-white font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
            Login
          </button>
        </form>

        <p className="mt-8 text-center text-gray-700 font-medium text-sm">
          New to TaskFlow? <Link to="/signup" className="text-[#778873] hover:underline font-bold">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
