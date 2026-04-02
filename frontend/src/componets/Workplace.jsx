import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTasks, FaFolderOpen, FaCalendarAlt, FaPlus, FaCheckDouble } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function Workspace() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return; // Prevent fetch if no user

    Promise.all([
      fetch(`${API_BASE_URL}/api/tasks/user/${user.id}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/projects/user/${user.id}`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/appointments/user/${user.id}`).then(res => res.json())
    ])
    .then(([tasksData, projectsData, appointmentsData]) => {
      setTasks(tasksData);
      setProjects(projectsData);
      setAppointments(appointmentsData);
    })
    .catch(err => console.error(err));
  }, []);

  const totalCompleted = tasks.filter(t => t.status === 'Done').length +
    projects.filter(p => p.status === 'Completed').length;

  return (
    <>
      <Header />

      {/* ===== PAGE WRAPPER ===== */}
      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-14">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* ===== HERO / INTRO ===== */}
          <section className="animate-fade-in flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
                Your Workspace
              </h1>
              <p className="mt-4 text-gray-800 max-w-2xl leading-relaxed text-lg font-medium">
                Everything you need to succeed, organized and within reach.
                Track your progress and stay on top of your schedule.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/40 flex items-center gap-4 shadow-sm">
              <div className="text-right">
                <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">Efficiency Goal</div>
                <div className="text-2xl font-black text-[#778873]">{totalCompleted} <span className="text-sm font-normal text-gray-600">Finished</span></div>
              </div>
              <div className="h-10 w-10 bg-[#778873]/20 rounded-full flex items-center justify-center">
                <FaCheckDouble className="text-[#778873]" />
              </div>
            </div>
          </section>

          {/* ===== GRID ===== */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* ===== PROJECTS CARD ===== */}
            <WorkspaceCard
              title="Overview"
              subtitle="Active Projects"
              icon={<FaFolderOpen className="text-3xl text-[#778873]" />}
              count={projects.length}
              buttonText="Launch All"
              onClick={() => navigate("/projects")}
            >
              {projects.length === 0 ? (
                <Empty text="Fuel your ambition. Create your first project." />
              ) : (
                <div className="space-y-3">
                  {projects.slice(0, 3).map((project) => (
                    <Row
                      key={project.id}
                      title={project.name}
                      meta={project.status || "Active"}
                      color="bg-blue-400"
                    />
                  ))}
                </div>
              )}
            </WorkspaceCard>

            {/* ===== TASKS CARD ===== */}
            <WorkspaceCard
              title="Priorities"
              subtitle="Pending Tasks"
              icon={<FaTasks className="text-3xl text-[#778873]" />}
              count={tasks.length}
              buttonText="See Pipeline"
              onClick={() => navigate("/mytask")}
            >
              {tasks.length === 0 ? (
                <Empty text="Silence is golden, but tasks get things done." />
              ) : (
                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <Row
                      key={task.id}
                      title={task.title}
                      meta={task.status}
                      color="bg-orange-400"
                    />
                  ))}
                </div>
              )}
            </WorkspaceCard>

            {/* ===== APPOINTMENTS CARD ===== */}
            <WorkspaceCard
              title="Schedule"
              subtitle="Upcoming Events"
              icon={<FaCalendarAlt className="text-3xl text-[#778873]" />}
              count={appointments.length}
              buttonText="Full Calendar"
              onClick={() => navigate("/appointments")}
            >
              {appointments.length === 0 ? (
                <Empty text="Your schedule is clear. Time for deep work?" />
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((app) => (
                    <Row
                      key={app.id}
                      title={app.title}
                      meta={app.date}
                      color="bg-purple-400"
                    />
                  ))}
                </div>
              )}
            </WorkspaceCard>

          </section>

          {/* ===== Quick Actions ===== */}
          <section className="flex flex-wrap gap-6 justify-center pt-8">
            <QuickActionButton icon={<FaPlus />} label="New Project" onClick={() => navigate("/projects/create")} />
            <QuickActionButton icon={<FaTasks />} label="New Task" onClick={() => navigate("/tasks")} />
            <QuickActionButton icon={<FaCalendarAlt />} label="Schedule" onClick={() => navigate("/appointments")} />
          </section>
        </div>
      </div>
    </>
  );
}

/* ===== COMPONENTS ===== */

function WorkspaceCard({
  title,
  subtitle,
  icon,
  count,
  buttonText,
  onClick,
  children,
}) {
  return (
    <div
      className="group relative bg-white/50 backdrop-blur-2xl rounded-[2.5rem]
                 p-8 shadow-xl transition-all duration-500 border border-white/40
                 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
    >
      <div className="absolute top-0 right-0 p-8">
        {icon}
      </div>

      <div className="relative flex-grow">
        <div className="mb-8">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#778873] mb-1">{title}</h4>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            {subtitle}
          </h2>
          <p className="text-sm font-bold text-gray-500 mt-2">{count} items registered</p>
        </div>

        <div className="mb-10">{children}</div>
      </div>

      <button
        onClick={onClick}
        className="relative z-10 w-full py-4 bg-white/80 hover:bg-[#778873] hover:text-white
                   text-gray-900 font-bold text-sm tracking-wide rounded-2xl
                   transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
      >
        {buttonText}
      </button>
    </div>
  );
}

function Row({ title, meta, color }) {
  return (
    <div className="flex justify-between items-center
                    bg-white/80 rounded-2xl px-5 py-4 shadow-sm border border-black/5 hover:border-[#778873]/30 transition group/row">
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
        <span className="font-bold text-gray-800 truncate max-w-[120px]">
          {title}
        </span>
      </div>
      <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 group-hover/row:text-[#778873] transition">
        {meta}
      </span>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="py-6 px-4 bg-black/5 rounded-2xl border border-dashed border-black/10">
      <p className="text-sm text-gray-500 font-medium italic text-center">
        {text}
      </p>
    </div>
  );
}

function QuickActionButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-6 py-4 bg-white/40 backdrop-blur-md rounded-2xl
                 border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 
                 transition-all text-gray-900 font-bold text-sm cursor-pointer"
    >
      <span className="text-[#778873]">{icon}</span>
      {label}
    </button>
  );
}
