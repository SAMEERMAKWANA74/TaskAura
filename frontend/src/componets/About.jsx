import Header from "./Header";
import { FaLinkedin, FaGithub, FaEnvelope, FaLightbulb, FaRocket, FaHeart } from "react-icons/fa";

export default function AboutUs() {
  return (
    <>
      <Header />

      {/* ===== PAGE WRAPPER ===== */}
      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* ===== MAIN CARD ===== */}
          <div
            className="bg-white/45 backdrop-blur-xl rounded-3xl
                       shadow-xl p-10 animate-fade-in border border-white/20"
          >
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <span className="text-[#778873]">About</span> TaskFlow
            </h1>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  TaskFlow is more than just a tool; it's your personal sanctuary for productivity.
                  Designed with a "calm-first" philosophy, we help you clear the mental clutter.
                </p>
                <div className="flex items-start gap-4">
                  <div className="bg-[#778873]/20 p-3 rounded-xl mt-1">
                    <FaLightbulb className="text-[#778873] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">The Vision</h3>
                    <p className="text-sm text-gray-700">Providing a reliable and distraction-free environment for modern workflows.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Whether you're managing complex software projects, daily chores, or client appointments,
                  TaskAura provides the structure you need without the bloat of traditional enterprise tools.
                </p>
                <div className="flex items-start gap-4">
                  <div className="bg-[#778873]/20 p-3 rounded-xl mt-1">
                    <FaRocket className="text-[#778873] text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Continuous Growth</h3>
                    <p className="text-sm text-gray-700">We’re evolving from a basic app into a powerful, fully connected workflow platform.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="mt-12 p-6 bg-white/30 rounded-2xl italic text-gray-800 text-center relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl text-[#778873]/40">"</span>
              Stay focused, stay organized, and let TaskFlow handle the rest.
            </div>

            {/* Divider */}
            <div className="my-10 h-px bg-white/70" />

            {/* Footer / Social */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-gray-800 font-medium">
                Made by <b>Sameer Makwana</b>
              </div>

              <div className="flex gap-8 text-3xl">
                <a
                  href="https://www.linkedin.com/in/sameer-makwana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-[#778873] transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="https://github.com/SAMEERMAKWANA74"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-[#778873] transition-all transform hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=sameermakwana74@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-[#778873] transition-all transform hover:scale-110"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
