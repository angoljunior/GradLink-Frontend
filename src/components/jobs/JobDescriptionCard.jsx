import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const splitText = (text) => {
  if (!text) return [];

  return text
    .split(/\n|•/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const JobDescriptionCard = ({ job }) => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-7">
        <h2 className="text-2xl font-extrabold text-slate-950">
          Job Description
        </h2>

        <p className="mt-5 leading-8 text-slate-600">{job.description}</p>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-950">Responsibilities</h3>

          <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-600">
            {splitText(job.responsibilities).map((item, index) => (
              <li key={index} className="leading-7">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold text-slate-950">Requirements</h3>

          <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-600">
            {splitText(job.requirements).map((item, index) => (
              <li key={index} className="leading-7">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDescriptionCard;
