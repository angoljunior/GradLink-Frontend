import CompaniesHero from "./CompaniesHero";
import CompanyCard from "./CompanyCard";

const companies = [
  {
    id: 1,
    name: "Farfan & Mendes Ghana",
    location: "Accra",
    description:
      "Farfan & Mendes provides engineering, construction, and project management...",
    size: "medium",
    jobs: 0,
  },
  {
    id: 2,
    name: "GCB Bank",
    location: "Accra",
    description:
      "GCB Bank is the largest bank in Ghana by branch network, providing retail, corporate...",
    size: "large",
    jobs: 3,
  },
  {
    id: 3,
    name: "Ghana Ports and...",
    location: "Tema",
    description:
      "GPHA manages and operates the Tema and Takoradi ports, the main gateways for Ghana...",
    size: "large",
    jobs: 2,
  },
  {
    id: 4,
    name: "Ghana National...",
    location: "Accra",
    description:
      "GNPC is Ghana's national oil company responsible for upstream petroleum...",
    size: "enterprise",
    jobs: 1,
  },
  {
    id: 5,
    name: "AirtelTigo Ghana",
    location: "Accra",
    description:
      "AirtelTigo provides mobile voice, data, and digital financial services across Ghana...",
    size: "large",
    jobs: 1,
  },
  {
    id: 6,
    name: "Ecobank Ghana",
    location: "Accra",
    description:
      "Ecobank Ghana offers comprehensive banking services to individuals and businesses...",
    size: "large",
    jobs: 2,
  },
  {
    id: 7,
    name: "Tullow Oil Ghana",
    location: "Takoradi",
    description:
      "Tullow Oil is a leading independent oil and gas company operating in Ghana...",
    size: "large",
    jobs: 2,
  },
  {
    id: 8,
    name: "MTN Ghana",
    location: "Accra",
    description:
      "MTN Ghana is a leading telecommunications company providing mobile and internet...",
    size: "enterprise",
    jobs: 3,
  },
];

const CompaniesPage = () => {
  return (

    
    <div className="min-h-screen bg-[#f6f8fa]">
      <CompaniesHero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950 mb-8">
          Featured Companies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CompaniesPage;