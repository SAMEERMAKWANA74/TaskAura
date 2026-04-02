import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import appointmentImg from "../assets/appointments2.png";
import { FaCalendarPlus, FaClock, FaCheckCircle } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function Appointments() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);

  const addAppointment = (e) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const newAppointment = {
      title,
      date,
      time,
      userId: user?.id,
    };

    fetch(`${API_BASE_URL}/api/appointments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment)
    })
    .then(() => {
      setIsScheduled(true);
      setTimeout(() => {
        navigate("/workplace");
      }, 1500);
    })
    .catch(err => console.error(err));
  };

  if (isScheduled) {
    return (
      <div className="min-h-screen bg-[#D2DCB6] flex items-center justify-center p-6">
        <div className="bg-white/40 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl text-center border border-white/40 animate-bounce-in">
          <FaCheckCircle className="text-7xl text-[#778873] mx-auto mb-6" />
          <h2 className="text-3xl font-black text-gray-900">Success!</h2>
          <p className="text-gray-700 mt-2 font-medium">Your appointment is locked in.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* ===== LEFT : APPOINTMENT FORM ===== */}
          <div className="animate-fade-in">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter">
              Schedule Now
            </h1>

            <p className="mt-4 text-gray-800 leading-relaxed max-w-md text-lg font-medium">
              Precision planning leads to perfect execution. Book your slot and stay ahead.
            </p>

            <div className="mt-10 bg-white/45 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/30">
              <form className="space-y-6" onSubmit={addAppointment}>

                {/* Title */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Topic</label>
                  <input
                    type="text"
                    placeholder="What's on the agenda?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-5 py-4 rounded-2xl outline-none
                               bg-white/80 border border-white/40
                               focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-white/80
                                 border border-white/40 outline-none
                                 focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-[#778873] mb-2">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-white/80
                                 border border-white/40 outline-none
                                 focus:ring-4 focus:ring-[#778873]/20 focus:border-[#778873] transition-all"
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-[#778873] text-white
                             py-5 rounded-2xl font-black text-sm uppercase tracking-widest
                             shadow-xl hover:shadow-2xl hover:bg-[#6a7c65] 
                             hover:-translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <FaCalendarPlus size={18} /> Confirm Appointment
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
                            group-hover:-translate-y-3 group-hover:rotate-1">

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#778873]/10 rounded-2xl flex items-center justify-center">
                  <FaClock className="text-[#778873] text-2xl" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  Sync with ease
                </h3>
              </div>

              <p className="text-gray-700 mb-10 leading-relaxed font-medium">
                Eliminate friction. Coordinate your efforts and never miss a beat in your professional journey.
              </p>

              <div className="overflow-hidden rounded-3xl shadow-lg border border-white/40">
                <img
                  src={appointmentImg}
                  alt="Appointments dashboard"
                  className="w-full grayscale hover:grayscale-0 transition duration-700 scale-105 hover:scale-100 object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
