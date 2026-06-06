import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/axios";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("");

  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        setFetchingData(true);

        const [companiesResponse, categoriesResponse] = await Promise.all([
          api.get("/companies"),
          api.get("/job-categories"),
        ]);

        setCompanies(companiesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log("Failed to fetch companies or categories:", error);
      } finally {
        setFetchingData(false);
      }
    };

    fetchDropdownData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !company || !category) {
      alert(
        "Please enter your email, select a company, and choose a category.",
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/subscribers/create/", {
        mail: email,
        company: Number(company),
        category: Number(category),
      });

      alert(response.data.message || "You have successfully subscribed!");

      setEmail("");
      setCompany("");
      setCategory("");
    } catch (error) {
      console.log("Subscription failed:", error.response?.data || error);

      const errorMessage =
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.mail?.[0] ||
        "Failed to subscribe. You may have already subscribed to this company and category.";

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5 text-center">
        <h3 className="text-xl font-bold text-slate-900">
          Subscribe to Job Updates
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Select a company and job category to receive alerts whenever a new
          matching opportunity is posted.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <Input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Company
          </label>

          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={fetchingData}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-yellow-500"
            required
          >
            <option value="">
              {fetchingData ? "Loading companies..." : "Select company"}
            </option>

            {companies.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={fetchingData}
            className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-yellow-500"
            required
          >
            <option value="">
              {fetchingData ? "Loading categories..." : "Select category"}
            </option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          disabled={loading || fetchingData}
          className="h-11 w-full bg-yellow-500 text-black hover:bg-yellow-600"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>

        <p className="text-center text-xs text-slate-500">
          You will only receive alerts when the selected company posts a job
          under your selected category.
        </p>
      </form>
    </div>
  );
};

export default SubscriptionForm;
