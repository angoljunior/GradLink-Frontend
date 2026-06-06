import CompanyProfileHeader from "./CompanyProfileHeader";
import CompanyOverviewCard from "./CompanyOverviewCard";
import CompanyOpenRoles from "./CompanyOpenRoles";

const CompanyProfilePage = () => {
  return (
    <main className="min-h-screen bg-[#f6f8fa]">
      <CompanyProfileHeader />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
          {/* Left side */}
          <main>
            <section className="mb-10">
              <h2 className="text-2xl font-extrabold text-slate-950">
                About Us
              </h2>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-500">
                MTN Ghana is a leading telecommunications company providing
                mobile and internet services across Ghana.
              </p>
            </section>

            <CompanyOpenRoles />
          </main>

          {/* Right side */}
          <aside>
            <CompanyOverviewCard />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CompanyProfilePage;