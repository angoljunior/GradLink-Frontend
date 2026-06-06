import React from "react";

const StudentDocuments = () => {
  return (
    <div className="px-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Documents</h1>
        <p className="mt-2 text-muted-foreground">
          Upload and manage your CV, cover letters, and certificates.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">CV / Resume</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload your latest CV for job applications.
            </p>
            <button className="mt-4 rounded-md border px-4 py-2 text-sm">
              Upload CV
            </button>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Cover Letter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Save your cover letters for quick applications.
            </p>
            <button className="mt-4 rounded-md border px-4 py-2 text-sm">
              Upload Letter
            </button>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-semibold">Certificates</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add certificates to strengthen your profile.
            </p>
            <button className="mt-4 rounded-md border px-4 py-2 text-sm">
              Upload Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDocuments;
