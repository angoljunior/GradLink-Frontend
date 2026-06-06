import { Card, CardContent } from "@/components/ui/card";

const JobDescriptionCard = () => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-8 md:p-10">
        <section>
          <h2 className="text-2xl font-extrabold text-slate-950">
            About the Role
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-500">
            MTN Ghana is seeking a talented Graduate Engineer to join our
            Network Operations team. You will play a key role in maintaining and
            optimizing our network infrastructure across Ghana.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-950">
            Key Responsibilities
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-500">
            Monitor network performance and identify issues. Support network
            upgrades and expansions. Prepare technical reports and documentation.
            Collaborate with senior engineers on projects.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-extrabold text-slate-950">
            Requirements
          </h2>

          <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-500">
            BSc in Electrical/Electronic Engineering or Telecommunications.
            Strong analytical skills. Excellent communication. Must be a
            Ghanaian national.
          </p>
        </section>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionCard;