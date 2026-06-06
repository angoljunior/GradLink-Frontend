import React from "react";
import JobsHero from "./JobsHero";
import JobFilters from "./JobFIlters";
import JobListCard from "./JobListCard";


const jobs = [
  {
    id: 1,
    title: "Graduate Engineer – Network Operations",
    company: "MTN Ghana",
    location: "Accra",
    posted: "10 days ago",
    salary: "GHS 3,500 - 5,000",
    type: "Graduate",
    industry: "Telecom",
  },
  {
    id: 2,
    title: "Digital Marketing Graduate",
    company: "MTN Ghana",
    location: "Accra",
    posted: "10 days ago",
    salary: "GHS 2,800 - 4,000",
    type: "Graduate",
    industry: "Telecom",
  },
  {
    id: 3,
    title: "National Service Personnel – IT Support",
    company: "MTN Ghana",
    location: "Accra",
    posted: "10 days ago",
    salary: "GHS 800 - 800",
    type: "NSS",
    industry: "Telecom",
  },
  {
    id: 4,
    title: "Graduate Banking Officer",
    company: "GCB Bank",
    location: "Accra",
    posted: "10 days ago",
    salary: "GHS 3,000 - 4,500",
    type: "Graduate",
    industry: "Banking",
  },
];

const JobsPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <JobsHero />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Left Filter Sidebar */}
          <aside>
            <JobFilters />
          </aside>

          {/* Job List */}
          <main>
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              20 Jobs Found
            </h2>

            <div className="space-y-5">
              {jobs.map((job) => (
                <JobListCard key={job.id} job={job} />
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default JobsPage;