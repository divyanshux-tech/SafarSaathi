import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive
      ? "bg-sky-600 text-white"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <nav className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-sky-700">SafarSaathi</span>
          <span className="hidden sm:inline text-xs bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200">
            AI Travel Assistant
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/trips" className={navLinkClass}>
            Trips
          </NavLink>
          <NavLink to="/trips/create" className={navLinkClass}>
            Create Trip
          </NavLink>
        </div>

        <div className="flex items-center gap-2">
          <NavLink
            to="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="btn-primary text-sm"
          >
            Register
          </NavLink>
        </div>
      </nav>

      {/* Mobile secondary nav */}
      <div className="md:hidden border-t border-slate-100 bg-white">
        <div className="container-app flex gap-1 py-2 overflow-x-auto">
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/trips" className={navLinkClass}>
            Trips
          </NavLink>
          <NavLink to="/trips/create" className={navLinkClass}>
            Create
          </NavLink>
        </div>
      </div>
    </header>
  );
}
