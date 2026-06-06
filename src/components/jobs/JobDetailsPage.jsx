import JobDetailsHeader from "./JobDetailsHeader";
import JobInfoCards from "./JobInfoCards";
import JobDescriptionCard from "./JobDescriptionCard";
import CompanyInfoCard from "./CompanyInfoCard";
import SimilarOpportunities from "./SimilarOpportunities";

const JobDetailsPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <JobDetailsHeader />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
          <main className="space-y-8">
            <JobInfoCards />
            <JobDescriptionCard />
          </main>

          <aside className="space-y-6">
            <CompanyInfoCard />
            <SimilarOpportunities />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;