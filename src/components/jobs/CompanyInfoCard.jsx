import React from "react";
import { Link } from "react-router-dom";
import { Building2, Globe, MapPin, Mail, Phone } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CompanyInfoCard = ({ company }) => {
  if (!company) return null;

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-7">
        <h2 className="text-xl font-extrabold text-slate-950">
          Company Information
        </h2>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl border bg-slate-50">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <Building2 className="h-7 w-7 text-slate-500" />
            )}
          </div>

          <div>
            <h3 className="font-bold text-slate-950">{company.name}</h3>
            <p className="text-sm text-slate-500">
              {company.industry || "Company"}
            </p>
          </div>
        </div>

        <p className="mt-5 leading-7 text-slate-600">
          {company.description || "No company description available."}
        </p>

        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-yellow-600" />
            <span>{company.location || "Not specified"}</span>
          </div>

          {company.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-yellow-600" />
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-yellow-700 hover:underline"
              >
                {company.website}
              </a>
            </div>
          )}

          {company.contact_email && (
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-yellow-600" />
              <span>{company.contact_email}</span>
            </div>
          )}

          {company.contact_phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-yellow-600" />
              <span>{company.contact_phone}</span>
            </div>
          )}
        </div>

        <Button
          asChild
          className="mt-6 w-full bg-yellow-500 text-black hover:bg-yellow-600"
        >
          <Link to={`/company/${company.id}`}>View Company Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoCard;
