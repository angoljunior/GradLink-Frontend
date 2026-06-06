import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  AtSign,
  Globe,
  Code,

} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Candidates",
    links: [
      { label: "Browse Jobs", path: "/jobs" },
      { label: "Browse Companies", path: "/companies" },
      { label: "CV Builder", path: "/cv-builder" },
      { label: "Practice Tests", path: "/tests" },
      { label: "Career Advice", path: "/career-advice" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Pricing & Plans", path: "/pricing" },
      { label: "Post a Job", path: "/post-job" },
      { label: "Employer Dashboard", path: "/employer/dashboard" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-yellow-500" />

              <h2 className="text-lg font-bold tracking-tight">
                <span className="text-white">GradLink</span>
                <span className="text-white">Ghana</span>
              </h2>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-slate-500 max-w-xs">
              Where ambition meets opportunity. The premier platform for
              graduate recruitment in Ghana.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-white hover:bg-slate-900"
              >
                <AtSign className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-white hover:bg-slate-900"
              >
                <Globe className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-white hover:bg-slate-900"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white">
                {section.title}
              </h3>

              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-slate-500 hover:text-yellow-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 bg-slate-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 GradLink Ghana. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built with passion in Accra
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;