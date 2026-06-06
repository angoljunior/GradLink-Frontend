import { Link } from "react-router-dom";
import { BriefcaseBusiness, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("userName");
    navigate("login"); // Redirect to login page
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 dark:bg-slate-950/90 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="w-5 h-5 text-yellow-500" />
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-yellow-500">GradLink</span>
            <span className="text-gray-900 dark:text-white">Ghana</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600 dark:text-slate-300 font-medium">
          <Link to="/jobs" className="hover:text-yellow-600 transition">
            Jobs
          </Link>

          <Link to="/companies" className="hover:text-yellow-600 transition">
            Companies
          </Link>

          <Link to="/tests" className="hover:text-yellow-600 transition">
            Tests
          </Link>

          <Link to="/about" className="hover:text-yellow-600 transition">
            About
          </Link>

          <Link to="/blog" className="hover:text-yellow-600 transition">
            Career Advice
          </Link>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden sm:flex dark:text-white"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            className="hidden sm:inline-flex text-sm dark:text-white"
          >
            Log in
          </Button>

          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black shadow-sm">
            Sign up
          </Button>

          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-yellow-600 text-gray shadow-sm"
          >
            Log Out
          </Button>

          <Button
            variant="outline"
            className="hidden sm:inline-flex shadow-sm dark:bg-slate-900 dark:text-white dark:border-slate-700"
          >
            Employers
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
