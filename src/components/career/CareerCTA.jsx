import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CareerCTA = () => {
  return (
    <section className="relative overflow-hidden bg-yellow-500">
      {/* Background image overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-emerald-200 bg-cover bg-center opacity-15" />

      {/* Yellow overlay */}
      <div className="absolute inset-0 bg-yellow-500/90" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
          Ready to launch your career?
        </h2>

        <p className="mt-5 max-w-xl mx-auto text-base md:text-lg text-slate-900 leading-relaxed">
          Join thousands of Ghanaian graduates who found their first
          professional role through GradLink.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {localStorage.getItem("role") !== "employer" && <Button asChild className="h-12 px-8 bg-slate-950 hover:bg-slate-900 text-white rounded-lg">
            <Link to={localStorage.getItem("access") ? "/student/profile" : "/auth?role=student"}>Create Student Profile</Link>
          </Button>}

          {localStorage.getItem("role") !== "student" && <Button
            asChild
            variant="outline"
            className="h-12 px-8 border-slate-900/40 bg-transparent hover:bg-yellow-400 text-slate-950 rounded-lg"
          >
            <Link to={localStorage.getItem("access") ? "/employer/dashboard" : "/auth?role=employer"}>I&apos;m an Employer</Link>
          </Button>}
        </div>
      </div>
    </section>
  );
};

export default CareerCTA;
