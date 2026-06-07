import React, { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Pencil,
  Loader2,
  Download,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import api from "@/api/axios";

const StudentDocuments = () => {
  const [profileDocs, setProfileDocs] = useState(null);
  const [coverLetters, setCoverLetters] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [showCoverForm, setShowCoverForm] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);

  const [editingDocumentId, setEditingDocumentId] = useState(null);
  const [editingCertificateId, setEditingCertificateId] = useState(null);

  const [coverForm, setCoverForm] = useState({
    title: "",
    document_type: "cover_letter",
    file: null,
  });

  const [certForm, setCertForm] = useState({
    title: "",
    organisation: "",
    issue_date: "",
    certificate_file: null,
  });

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      const [profileRes, docsRes, certsRes] = await Promise.all([
        api.get("/student/documents/profile/"),
        api.get("/student/documents/"),
        api.get("/student/certificates/"),
      ]);

      const docsData = Array.isArray(docsRes.data)
        ? docsRes.data
        : docsRes.data.results || [];

      const certsData = Array.isArray(certsRes.data)
        ? certsRes.data
        : certsRes.data.results || [];

      setProfileDocs(profileRes.data);
      setCoverLetters(docsData);
      setCertificates(certsData);
    } catch (error) {
      console.log("Failed to fetch documents:", error.response?.data || error);

      toast.error("Failed to load documents", {
        description:
          error.response?.data?.detail ||
          "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const getFileName = (fileUrl) => {
    if (!fileUrl) return "No file uploaded";
    return fileUrl.split("/").pop();
  };

  const handleProfileFileUpload = async (field, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append(field, file);

    try {
      setUploading(true);

      const response = await api.patch(
        "/student/documents/profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setProfileDocs(response.data);

      toast.success(`${field === "cv" ? "CV" : "Transcript"} uploaded`, {
        description: "Your document has been updated successfully.",
      });
    } catch (error) {
      console.log("Upload failed:", error.response?.data || error);

      toast.error("Upload failed", {
        description:
          error.response?.data?.detail ||
          "Please check the file and try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProfileFile = async (field) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove your ${field}?`,
    );

    if (!confirmDelete) return;

    const formData = new FormData();
    formData.append(field, "");

    try {
      const response = await api.patch("/student/documents/profile/", {
        [field]: null,
      });

      setProfileDocs(response.data);

      toast.success(`${field === "cv" ? "CV" : "Transcript"} removed`);
    } catch (error) {
      console.log("Delete failed:", error.response?.data || error);

      toast.error("Failed to remove document", {
        description: "Please try again.",
      });
    }
  };

  const resetCoverForm = () => {
    setCoverForm({
      title: "",
      document_type: "cover_letter",
      file: null,
    });
    setEditingDocumentId(null);
    setShowCoverForm(false);
  };

  const resetCertForm = () => {
    setCertForm({
      title: "",
      organisation: "",
      issue_date: "",
      certificate_file: null,
    });
    setEditingCertificateId(null);
    setShowCertForm(false);
  };

  const handleCoverSubmit = async (e) => {
    e.preventDefault();

    if (!coverForm.title.trim()) {
      toast.warning("Title is required");
      return;
    }

    if (!editingDocumentId && !coverForm.file) {
      toast.warning("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", coverForm.title);
    formData.append("document_type", coverForm.document_type);

    if (coverForm.file) {
      formData.append("file", coverForm.file);
    }

    try {
      setUploading(true);

      if (editingDocumentId) {
        const response = await api.patch(
          `/student/documents/${editingDocumentId}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        setCoverLetters((prev) =>
          prev.map((item) =>
            item.id === editingDocumentId ? response.data : item,
          ),
        );

        toast.success("Document updated");
      } else {
        const response = await api.post("/student/documents/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setCoverLetters((prev) => [response.data, ...prev]);

        toast.success("Document uploaded");
      }

      resetCoverForm();
    } catch (error) {
      console.log("Document save failed:", error.response?.data || error);

      toast.error("Failed to save document", {
        description:
          error.response?.data?.detail ||
          error.response?.data?.title?.[0] ||
          error.response?.data?.file?.[0] ||
          "Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEditCover = (doc) => {
    setEditingDocumentId(doc.id);
    setCoverForm({
      title: doc.title,
      document_type: doc.document_type,
      file: null,
    });
    setShowCoverForm(true);
  };

  const handleDeleteCover = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/student/documents/${id}/`);

      setCoverLetters((prev) => prev.filter((item) => item.id !== id));

      toast.success("Document deleted");
    } catch (error) {
      console.log("Delete document failed:", error.response?.data || error);

      toast.error("Failed to delete document");
    }
  };

  const handleCertSubmit = async (e) => {
    e.preventDefault();

    if (!certForm.title || !certForm.organisation || !certForm.issue_date) {
      toast.warning(
        "Please fill in certificate title, organisation, and date.",
      );
      return;
    }

    if (!editingCertificateId && !certForm.certificate_file) {
      toast.warning("Please upload certificate file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", certForm.title);
    formData.append("organisation", certForm.organisation);
    formData.append("issue_date", certForm.issue_date);

    if (certForm.certificate_file) {
      formData.append("certificate_file", certForm.certificate_file);
    }

    try {
      setUploading(true);

      if (editingCertificateId) {
        const response = await api.patch(
          `/student/certificates/${editingCertificateId}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        setCertificates((prev) =>
          prev.map((item) =>
            item.id === editingCertificateId ? response.data : item,
          ),
        );

        toast.success("Certificate updated");
      } else {
        const response = await api.post("/student/certificates/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setCertificates((prev) => [response.data, ...prev]);

        toast.success("Certificate uploaded");
      }

      resetCertForm();
    } catch (error) {
      console.log("Certificate save failed:", error.response?.data || error);

      toast.error("Failed to save certificate", {
        description:
          error.response?.data?.detail ||
          error.response?.data?.title?.[0] ||
          error.response?.data?.certificate_file?.[0] ||
          "Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEditCertificate = (cert) => {
    setEditingCertificateId(cert.id);
    setCertForm({
      title: cert.title,
      organisation: cert.organisation,
      issue_date: cert.issue_date,
      certificate_file: null,
    });
    setShowCertForm(true);
  };

  const handleDeleteCertificate = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/student/certificates/${id}/`);

      setCertificates((prev) => prev.filter((item) => item.id !== id));

      toast.success("Certificate deleted");
    } catch (error) {
      console.log("Delete certificate failed:", error.response?.data || error);

      toast.error("Failed to delete certificate");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4 lg:px-6">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading documents...
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="mt-2 text-muted-foreground">
            Upload and manage your CV, transcript, cover letters, and
            certificates.
          </p>
        </div>

        {/* Main Documents */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* CV */}
          <div className="rounded-lg border bg-white p-4">
            <h3 className="font-semibold">CV / Resume</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload your latest CV for job applications.
            </p>

            <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm">
              {profileDocs?.cv_url ? (
                <a
                  href={profileDocs.cv_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-yellow-700 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  {getFileName(profileDocs.cv_url)}
                </a>
              ) : (
                <span className="text-muted-foreground">No CV uploaded.</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-slate-50">
                <Upload className="h-4 w-4" />
                {profileDocs?.cv_url ? "Replace CV" : "Upload CV"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) =>
                    handleProfileFileUpload("cv", e.target.files[0])
                  }
                />
              </label>

              {profileDocs?.cv_url && (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={profileDocs.cv_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      View
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProfileFile("cv")}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Transcript */}
          <div className="rounded-lg border bg-white p-4">
            <h3 className="font-semibold">Transcript</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload your academic transcript.
            </p>

            <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm">
              {profileDocs?.transcript_url ? (
                <a
                  href={profileDocs.transcript_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-yellow-700 hover:underline"
                >
                  <FileText className="h-4 w-4" />
                  {getFileName(profileDocs.transcript_url)}
                </a>
              ) : (
                <span className="text-muted-foreground">
                  No transcript uploaded.
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-slate-50">
                <Upload className="h-4 w-4" />
                {profileDocs?.transcript_url
                  ? "Replace Transcript"
                  : "Upload Transcript"}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) =>
                    handleProfileFileUpload("transcript", e.target.files[0])
                  }
                />
              </label>

              {profileDocs?.transcript_url && (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={profileDocs.transcript_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      View
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProfileFile("transcript")}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Cover Letters */}
        <div className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Cover Letters</h2>
              <p className="text-sm text-muted-foreground">
                Save reusable cover letters for quick applications.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                resetCoverForm();
                setShowCoverForm(true);
              }}
              className="bg-yellow-500 text-black hover:bg-yellow-600"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Cover Letter
            </Button>
          </div>

          {showCoverForm && (
            <form
              onSubmit={handleCoverSubmit}
              className="mt-5 rounded-lg border bg-white p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">
                  {editingDocumentId ? "Edit Cover Letter" : "New Cover Letter"}
                </h3>

                <button type="button" onClick={resetCoverForm}>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Document title"
                  value={coverForm.title}
                  onChange={(e) =>
                    setCoverForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
                />

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) =>
                    setCoverForm((prev) => ({
                      ...prev,
                      file: e.target.files[0],
                    }))
                  }
                  className="h-10 rounded-md border px-3 py-2 text-sm"
                />
              </div>

              <div className="mt-4 flex gap-2">
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Saving..." : "Save Document"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={resetCoverForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coverLetters.length > 0 ? (
              coverLetters.map((doc) => (
                <div key={doc.id} className="rounded-lg border bg-white p-4">
                  <h3 className="font-semibold">{doc.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {doc.document_type_display}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={doc.file_url} target="_blank" rel="noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        View
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCover(doc)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCover(doc.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No cover letters uploaded yet.
              </p>
            )}
          </div>
        </div>

        {/* Certificates */}
        <div className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Certificates</h2>
              <p className="text-sm text-muted-foreground">
                Add certificates to strengthen your profile.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => {
                resetCertForm();
                setShowCertForm(true);
              }}
              className="bg-yellow-500 text-black hover:bg-yellow-600"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Certificate
            </Button>
          </div>

          {showCertForm && (
            <form
              onSubmit={handleCertSubmit}
              className="mt-5 rounded-lg border bg-white p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">
                  {editingCertificateId
                    ? "Edit Certificate"
                    : "New Certificate"}
                </h3>

                <button type="button" onClick={resetCertForm}>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Certificate title"
                  value={certForm.title}
                  onChange={(e) =>
                    setCertForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
                />

                <input
                  type="text"
                  placeholder="Organisation"
                  value={certForm.organisation}
                  onChange={(e) =>
                    setCertForm((prev) => ({
                      ...prev,
                      organisation: e.target.value,
                    }))
                  }
                  className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
                />

                <input
                  type="date"
                  value={certForm.issue_date}
                  onChange={(e) =>
                    setCertForm((prev) => ({
                      ...prev,
                      issue_date: e.target.value,
                    }))
                  }
                  className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
                />

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) =>
                    setCertForm((prev) => ({
                      ...prev,
                      certificate_file: e.target.files[0],
                    }))
                  }
                  className="h-10 rounded-md border px-3 py-2 text-sm"
                />
              </div>

              <div className="mt-4 flex gap-2">
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Saving..." : "Save Certificate"}
                </Button>

                <Button type="button" variant="outline" onClick={resetCertForm}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <div key={cert.id} className="rounded-lg border bg-white p-4">
                  <h3 className="font-semibold">{cert.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.organisation}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Issued: {cert.issue_date}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {cert.certificate_file_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={cert.certificate_file_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          View
                        </a>
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCertificate(cert)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCertificate(cert.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No certificates uploaded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDocuments;
