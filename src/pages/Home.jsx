import React, { useState } from "react";

import HeroSection from "@/components/HeroSection";
import FeaturedOpportunities from "@/components/FeaturedOpportunities";
import TopEmployers from "@/components/TopEmployers";
import SubscriptionForm from "@/components/SubscriptionForm";

const Home = () => {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  /* get user role */
  const userRole = localStorage.getItem("role");

  return (
    <>
      <HeroSection
        jobSearch={jobSearch}
        setJobSearch={setJobSearch}
        locationSearch={locationSearch}
        setLocationSearch={setLocationSearch}
      />

      <FeaturedOpportunities />

      <TopEmployers jobSearch={jobSearch} locationSearch={locationSearch} />

      {/* only show this when user is a student  */}
      {userRole === "student" && <SubscriptionForm />}
    </>
  );
};

export default Home;
