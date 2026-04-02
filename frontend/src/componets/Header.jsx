import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Workspace", href: "/workplace" },
  { name: "Projects", href: "/projects" },
  { name: "Tasks", href: "/tasks" },
  { name: "My Task", href: "/mytask" },
  { name: "Appointments", href: "/appointments" },
  { name: "About Us", href: "/about-us" },
  { name: "Get Started", href: "/get-started" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Glass Navbar */}
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="flex items-center justify-between
                     bg-white/50 backdrop-blur-lg
                     rounded-2xl shadow-md
                     px-6 py-4 mt-4"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 outline-none">
            <span className="text-xl font-bold text-[#778873]">
              TaskAura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-700
                           hover:text-[#778873]
                           transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop User */}
          <div className="hidden lg:flex">
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-[#778873]
                         hover:text-[#6a7c65] transition cursor-pointer"
            >
              Logout →
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 hover:bg-black/5 transition cursor-pointer"
            >
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <DialogPanel
          className="fixed inset-y-0 right-0 z-50 w-72
                     bg-white/80 backdrop-blur-xl
                     shadow-xl px-6 py-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#778873]">
              TaskFlow
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 hover:bg-black/5 transition"
            >
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Links */}
          <div className="mt-8 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3
                           text-sm font-medium text-gray-700
                           hover:bg-[#778873]/10
                           hover:text-[#778873] transition"
              >
                {item.name}
              </Link>
            ))}

            {/* Logout */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full mt-4 rounded-xl px-4 py-3
                         text-left text-sm font-semibold
                         text-white bg-[#778873]
                         hover:bg-[#6a7c65] transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
