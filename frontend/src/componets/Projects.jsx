import Header from "./Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaRegCalendarAlt, FaLayerGroup } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    fetch(`${API_BASE_URL}/api/projects/user/${user.id}`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const deleteProject = (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    fetch(`${API_BASE_URL}/api/projects/${id}`, { method: "DELETE" })
      .then(() => setProjects(projects.filter((p) => p.id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-14">

        {/* ===== Page Header ===== */}
        <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              My Projects
            </h1>
            <p className="mt-2 text-gray-800 text-lg max-w-xl">
              Strategic overview of your ongoing initiatives and goals.
            </p>
          </div>

          <button
            onClick={() => navigate("/projects/create")}
            className="px-6 py-3 bg-[#778873] text-white font-semibold
                       rounded-xl shadow-lg hover:shadow-xl hover:bg-[#6a7c65] 
                       hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="text-xl">+</span> Create New Project
          </button>
        </div>

        {/* ===== Projects Grid ===== */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.length === 0 ? (
            <EmptyState onCreate={() => navigate("/projects/create")} />
          ) : (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => navigate(`/projects/create?id=${project.id}`)}
                onDelete={() => deleteProject(project.id)}
              />
            ))
          )}

        </div>
      </div>
    </>
  );
}

/* ===== COMPONENTS ===== */

function ProjectCard({ project, onEdit, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Active": return "bg-blue-100 text-blue-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div
      className="group relative bg-white/45 backdrop-blur-xl
                 rounded-3xl p-6 shadow-lg border border-white/30
                 transition-all duration-300
                 hover:-translate-y-1.5 hover:shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-bold text-gray-900 truncate pr-2 group-hover:text-[#778873] transition">
          {project.name}
        </h3>

        <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold
                         ${getStatusColor(project.status || "Active")}`}>
          {project.status || "Active"}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-gray-700 text-sm line-clamp-2 h-10 leading-relaxed">
        {project.description || "No project description provided."}
      </p>

      {/* Progress */}
      <div className="mt-6">
        <div className="flex justify-between text-xs font-bold text-gray-700 mb-2">
          <span className="flex items-center gap-1.5"><FaLayerGroup className="text-[#778873]" /> Progress</span>
          <span>{project.progress || 0}%</span>
        </div>

        <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#778873] to-[#A1BC98] rounded-full transition-all duration-500"
            style={{ width: `${project.progress || 0}%` }}
          />
        </div>
      </div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-white/40 px-2 py-0.5 rounded text-gray-600">#{tag}</span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/30">
        <span className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
          <FaRegCalendarAlt className="text-[#778873]" /> {project.due || "TBD"}
        </span>

        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="p-2 text-[#778873] hover:bg-[#778873]/10 rounded-lg transition cursor-pointer"
            title="Edit Project"
          >
            <FaEdit size={16} />
          </button>

          <button
            onClick={onDelete}
            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition cursor-pointer"
            title="Delete Project"
          >
            <FaTrash size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onCreate }) {
  return (
    <div
      className="col-span-full flex flex-col items-center justify-center
                 bg-white/20 backdrop-blur-md rounded-3xl
                 p-16 shadow-inner border border-dashed border-white/60"
    >
      <div className="text-7xl mb-6 opacity-80">📂</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Start a New Chapter</h3>
      <p className="text-gray-700 text-center max-w-sm mb-8 leading-relaxed">
        Your project list is currently empty. Organize your vision and start tracking progress today.
      </p>

      <button
        onClick={onCreate}
        className="px-8 py-3 bg-[#778873] text-white font-bold
                   rounded-xl shadow-lg hover:shadow-xl hover:bg-[#6a7c65] 
                   hover:-translate-y-0.5 transition-all cursor-pointer"
      >
        + Add First Project
      </button>
    </div>
  );
}
