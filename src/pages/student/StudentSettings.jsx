import React from "react";

const StudentSettings = () => {
  return (
    <div className="px-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings and preferences.
        </p>

        <form className="mt-6 max-w-xl space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-md border px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-md border px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="mt-2 w-full rounded-md border px-3 py-2 outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSettings;
