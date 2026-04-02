import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Navigation from "./componets/Home";
import GetStarted from "./componets/GetStarted";
import Projects from "./componets/Projects";
import CreateProject from "./componets/CreateProject";
import Tasks from "./componets/Task";
import MyTask from "./componets/MyTask";
import Appointments from "./componets/Appointments";
import Workplace from "./componets/Workplace";
import AboutUs from "./componets/About";
import Login from "./componets/Login";
import Signup from "./componets/Signup";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Navigation /></ProtectedRoute>} />
        <Route path="/get-started" element={<ProtectedRoute><GetStarted /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/workplace" element={<ProtectedRoute><Workplace /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path="/mytask" element={<ProtectedRoute><MyTask /></ProtectedRoute>} />
        <Route path="/my-tasks" element={<Navigate to="/mytask" replace />} />
        <Route path="/my-task" element={<Navigate to="/mytask" replace />} />
        <Route path="/projects/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />

      </Routes>
    </>
  )
}

export default App
