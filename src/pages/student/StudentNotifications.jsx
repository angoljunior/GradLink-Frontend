import React from "react";

const StudentNotifications = () => {
  return (
    <div className="px-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="mt-2 text-muted-foreground">
          View updates from employers and GradLink.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Application Reviewed</h3>
            <p className="text-sm text-muted-foreground">
              Genser Energy has reviewed your application.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">New Job Match</h3>
            <p className="text-sm text-muted-foreground">
              A new Electrical Engineering role matches your profile.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Profile Reminder</h3>
            <p className="text-sm text-muted-foreground">
              Complete your profile to increase your chances of being noticed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentNotifications;
