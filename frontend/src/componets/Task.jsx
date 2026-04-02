import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emptyTask from "../assets/tasks2.avif";
import { FaPlusCircle, FaLevelUpAlt, FaClipboardList, FaCheck } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function Tasks() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const [isSaved, setIsSaved] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const newTask = {
      title,
      priority,
      status,
      userId: user?.id,
    };

    fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
    .then(() => {
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        setTitle("");
        navigate("/mytask");
      }, 1200);
    })
    .catch(err => console.error(err));
  };

  return (
    <>
      <Header />

      {/* ===== PAGE WRAPPER ===== */}
      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* ===== LEFT : CREATE TASK FORM ===== */}
          <div className="animate-fade-in">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              New Milestone
            </h1>

            <p className="mt-4 text-gray-800 leading-relaxed max-w-md text-lg font-medium">
              Break down your vision into actionable steps. Every great project starts with a single task.
            </p>

            <div className="mt-10 bg-white/45 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/30">
              <form className="space-y-6" onSubmit={addTask}>

                {/* Task Title */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Objective</label>
                  <input
                    type="text"
                    placeholder="State your goal..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-5 py-4 rounded-2xl outline-none
                                bg-white/80 border border-white/40
                                focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all"
                  />
                </div>

                {/* Priority + Status */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white/80
                                 border border-white/40 outline-none
                                 focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all cursor-pointer font-bold text-gray-700"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-white/80
                                 border border-white/40 outline-none
                                 focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all cursor-pointer font-bold text-gray-700"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSaved}
                  className={`w-full mt-6 py-5 rounded-2xl font-black text-sm uppercase tracking-widest
                             shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer
                             ${isSaved ? 'bg-green-500 text-white' : 'bg-[#778873] text-white hover:shadow-2xl hover:bg-[#6a7c65] hover:-translate-y-1'}`}
                >
                  {isSaved ? <><FaCheck fontSize={18} /> Task Saved</> : <><FaPlusCircle fontSize={18} /> Initiate Task</>}
                </button>
              </form>
            </div>
          </div>

          {/* ===== RIGHT : VISUAL ===== */}
          <div className="hidden md:flex items-center justify-center relative animate-fade-in group">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr
                            from-[#e8f0e1] to-[#c7d7b5]
                            rounded-[3rem] blur-3xl opacity-40 group-hover:opacity-60 transition duration-700" />

            {/* Card */}
            <div className="relative bg-white/60 backdrop-blur-2xl
                            rounded-[3rem] shadow-2xl p-12
                            max-w-lg w-full border border-white/50
                            transition-all duration-500
                            group-hover:-translate-y-3 group-hover:-rotate-1">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#778873]/10 rounded-2xl flex items-center justify-center">
                  <FaLevelUpAlt className="text-[#778873] text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  Peak performance
                </h3>
              </div>

              <p className="text-gray-700 mb-10 leading-relaxed font-medium">
                Structure your day with purpose. Clear goals, clear mind, incredible results.
              </p>

              <div className="relative overflow-hidden rounded-3xl shadow-lg border border-white/40">
                <img
                  src={emptyTask}
                  alt="Create tasks"
                  className="w-full grayscale hover:grayscale-0 transition duration-700 scale-105 group-hover:scale-110 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md p-2 rounded-xl shadow-sm">
                  <FaClipboardList className="text-[#778873]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
