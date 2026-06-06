import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Sun,
  Moon,
  BadgeCheckIcon,
  BellIcon,
  LogOutIcon,
  LayoutDashboardIcon,
  UserPlusIcon,
} from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access");
  const userName = localStorage.getItem("userName") || "User";
  const userRole = localStorage.getItem("role");
  // role should be either "student" or "employer"

  const isLoggedIn = Boolean(accessToken);

  const dashboardPath =
    userRole === "employer" ? "/employer-dashboard" : "/student-dashboard";

  const dashboardLabel =
    userRole === "employer" ? "Employer Dashboard" : "Student Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="h-5 w-5 text-yellow-500" />
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-yellow-500">GradLink</span>
            <span className="text-gray-900 dark:text-white">Ghana</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <Link to="/jobs" className="transition hover:text-yellow-600">
            Jobs
          </Link>

          <Link to="/companies" className="transition hover:text-yellow-600">
            Companies
          </Link>

          <Link to="/tests" className="transition hover:text-yellow-600">
            Tests
          </Link>

          <Link to="/about" className="transition hover:text-yellow-600">
            About
          </Link>

          <Link to="/blog" className="transition hover:text-yellow-600">
            Career Advice
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hidden dark:text-white sm:flex"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* Dynamic Dashboard Button */}
          {isLoggedIn && (
            <Button
              asChild
              variant="outline"
              className="hidden shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:inline-flex"
            >
              <Link to={dashboardPath}>{dashboardLabel}</Link>
            </Button>
          )}

          {/* Auth Buttons / Dropdown */}
          {!isLoggedIn ? (
            <>
              <Button
                asChild
                variant="ghost"
                className="hidden text-sm dark:text-white sm:inline-flex"
              >
                <Link to="/login">Log in</Link>
              </Button>

              <Button
                asChild
                className="bg-yellow-500 text-black shadow-sm hover:bg-yellow-600"
              >
                <Link to="/register">Sign up</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="hidden shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white sm:inline-flex"
              >
                <Link to="/employer-register">Employers</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={userName}
                    />
                    <AvatarFallback>
                      {userName?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <BadgeCheckIcon className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate(dashboardPath)}>
                    <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                    {dashboardLabel}
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate("/notifications")}>
                    <BellIcon className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => navigate("/register")}>
                    <UserPlusIcon className="mr-2 h-4 w-4" />
                    Sign Up
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
