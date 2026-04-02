import Header from "./Header";
import { useEffect, useState } from "react";
import { FaTrash, FaCheckCircle, FaSpinner, FaRegClock } from "react-icons/fa";
import { API_BASE_URL } from "../config";

export default function MyTask() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    fetch(`${API_BASE_URL}/api/tasks/user/${user.id}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const deleteTask = (id) => {
    fetch(`${API_BASE_URL}/api/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((t) => t.id !== id)))
      .catch(err => console.error(err));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Done": return <FaCheckCircle className="text-green-500" />;
      case "In Progress": return <FaSpinner className="text-blue-500 animate-spin-slow" />;
      default: return <FaRegClock className="text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700 border-red-200";
      case "Medium": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-[#D2DCB6] to-[#A1BC98] px-6 py-14">
        {/* ===== Page Header ===== */}
        <div className="max-w-6xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-gray-900">My Tasks</h1>
          <p className="mt-2 text-gray-800 text-lg">
            Manage and track all your ongoing activities.
          </p>
        </div>

        {/* ===== TASK LIST ===== */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center p-20 bg-white/20 backdrop-blur-md rounded-3xl border border-dashed border-white/60">
              <span className="text-6xl mb-4">📋</span>
              <p className="text-xl text-gray-900 font-medium text-center">Your task list is empty.</p>
              <p className="text-gray-700 text-center mt-2">Start by adding a task from the Tasks page.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="group bg-white/45 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#778873] transition">
                    {task.title}
                  </h3>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition cursor-pointer"
                    title="Delete Task"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium flex items-center gap-2">
                      Status
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                      {getStatusIcon(task.status)} {task.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Priority</span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>

                {/* Decorative bottom bar */}
                <div className="mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${task.status === 'Done' ? 'w-full bg-green-400' : 'w-1/3 bg-[#778873]'}`} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
