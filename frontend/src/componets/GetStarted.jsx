import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { FaRocket, FaPlusCircle, FaCalendarAlt, FaTable } from "react-icons/fa";

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full">

          {/* ===== HERO Section ===== */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-[#4a5547] font-bold text-xs uppercase tracking-[0.3em] mb-6">
              <FaRocket className="animate-pulse" /> Welcome to the Elite Tier
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-6">
              Build what <br className="hidden md:block" /> matters <span className="text-[#778873]">next.</span>
            </h1>
            <p className="text-xl text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed">
              Simplify your workflow, amplify your results. Choose your starting point and let's get to work.
            </p>
          </div>

          {/* ===== ACTION CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            <ActionCard
              title="New Project"
              description="Initiate a strategic move and track every milestone."
              icon={<FaPlusCircle />}
              onClick={() => navigate("/projects/create")}
              delay="0"
            />

            <ActionCard
              title="Add Task"
              description="Break down the big picture into actionable objectives."
              icon={<FaRocket />}
              onClick={() => navigate("/tasks")}
              delay="100"
            />

            <ActionCard
              title="Schedule"
              description="Synchronize your efforts and never miss a key event."
              icon={<FaCalendarAlt />}
              onClick={() => navigate("/appointments")}
              delay="200"
            />

            <ActionCard
              title="Dashboard"
              description="A bird's eye view of your entire professional landscape."
              icon={<FaTable />}
              onClick={() => navigate("/workplace")}
              delay="300"
              primary
            />

          </div>

          {/* ===== FOOTER INFO ===== */}
          <div className="mt-20 text-center animate-fade-in delay-500 opacity-60">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
              Trusted by architects of the future.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

function ActionCard({ title, description, icon, onClick, delay, primary }) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`group relative text-left p-8 rounded-[2.5rem] transition-all duration-500 
                  hover:-translate-y-3 hover:shadow-2xl animate-fade-in-up flex flex-col h-full cursor-pointer
                  border ${primary
          ? 'bg-[#778873] text-white border-[#778873]'
          : 'bg-white/40 backdrop-blur-xl border-white/50 text-gray-900'}`}
    >
      <div className={`text-4xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                      ${primary ? 'text-white/80' : 'text-[#778873]'}`}>
        {icon}
      </div>

      <div className="flex-grow">
        <h3 className="text-2xl font-black tracking-tight mb-3">{title}</h3>
        <p className={`text-sm font-medium leading-relaxed ${primary ? 'text-white/70' : 'text-gray-700'}`}>
          {description}
        </p>
      </div>

      <div className="mt-10 flex items-center gap-2 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Initiate Action →
      </div>
    </button>
  );
}
