import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    console.log("Subscribed email:", email);
    alert("Thank you for subscribing!");

    setEmail("");
  };

  return (
    <div className="max-w-2xl items-center justify-center mx-auto rounded-md  p-6 ">
      <div className="mb-4">
        <h3 className="text-xl justify-center items-center  font-bold text-slate-900">
          Subscribe to Job Updates
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Get the latest graduate jobs, internships, and career opportunities
          delivered directly to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 flex-1"
            required
          />

          <Button type="submit" className="h-11 px-6">
            Subscribe
          </Button>
        </div>

        <p className="text-xs text-slate-500">
          Subscribe to our newsletter to receive job alerts and updates based on
          your preferences.
        </p>
      </form>
    </div>
  );
};

export default SubscriptionForm;
