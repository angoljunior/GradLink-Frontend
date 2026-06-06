import FeaturedOpportunities from "@/components/FeaturedOpportunities";
import CareerCTA from "@/components/career/CareerCTA";
import TopEmployers from "@/components/TopEmployers";
import HeroSection from "@/components/HeroSection";
import React from "react";
import SubscriptionForm from "@/components/SubscriptionForm";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedOpportunities />
      <TopEmployers />
      <CareerCTA />
      <SubscriptionForm />
    </div>
  );
};

export default Home;
