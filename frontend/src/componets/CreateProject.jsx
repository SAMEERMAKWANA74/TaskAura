import Header from "./Header";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function CreateProject() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Medium",
    status: "Pending",
    progress: 0,
    tags: "",
  });

  useEffect(() => {
    if (editId) {
      fetch(`${API_BASE_URL}/api/projects/${editId}`)
        .then(res => res.json())
        .then(projectToEdit => {
          if (projectToEdit) {
            setFormData({
              ...projectToEdit,
              tags: projectToEdit.tags?.join(", ") || "",
            });
          }
        })
        .catch(err => console.error(err));
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "progress" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Project Name is required");

    const user = JSON.parse(localStorage.getItem("user"));
    const newProject = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()).filter((t) => t),
      userId: user?.id,
    };

    const url = editId ? `${API_BASE_URL}/api/projects/${editId}` : `${API_BASE_URL}/api/projects`;
    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject)
    })
    .then(() => navigate("/projects"))
    .catch(err => console.error(err));
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-14">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            {editId ? "Edit Project" : "Create New Project"}
          </h1>
          <p className="mt-2 text-gray-800 max-w-xl">
            {editId
              ? "Update the details of your project."
              : "Fill in the details below to create and manage your project efficiently."}
          </p>
        </div>

        {/* Form Card */}
        <div className="max-w-4xl mx-auto bg-white/35 backdrop-blur-lg rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[#778873]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe your project..."
                className="w-full px-4 py-2.5 rounded-lg bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[#778873]"
              ></textarea>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[#778873]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[#778873]"
                />
              </div>
            </div>

            {/* Priority & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[#778873]"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[#778873]"
                >
                  <option>Pending</option>
                  <option>Active</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            {/* Progress */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Progress ({formData.progress}%)
              </label>
              <input
                type="range"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full accent-[#778873] cursor-pointer"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="UI, Backend, Urgent"
                className="w-full px-4 py-2.5 rounded-lg bg-white/60 border border-white/60 focus:outline-none focus:ring-2 focus:ring-[#778873]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="px-6 py-2.5 rounded-lg border border-white/60 text-gray-900 hover:bg-white/40 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#778873] text-white font-medium hover:bg-[#6a7c65] transition cursor-pointer"
              >
                {editId ? "Update Project" : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
