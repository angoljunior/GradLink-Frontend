import React, { useEffect, useRef, useState } from "react";

import jsPDF from "jspdf";
import { Download, Eye, Plus, Save, Trash2 } from "lucide-react";

const emptyEducation = {
  school: "",
  location: "",
  degree: "",
  startDate: "",
  endDate: "",
};

const emptyExperience = {
  company: "",
  location: "",
  role: "",
  startDate: "",
  endDate: "",
  description: "",
};

const emptyCertification = {
  title: "",
  issuer: "",
  date: "",
};

const CVBuilder = () => {
  const cvRef = useRef(null);
  const [activeTab, setActiveTab] = useState("personal");

  const [cvData, setCvData] = useState({
    firstName: "Nana Kofi Junior",
    lastName: "Angol",
    email: "nanakofiangol@gmail.com",
    phone: "+233 598 30 879",
    portfolio: "Portfolio Website",
    professionalSummary:
      "Self-taught Graphic Designer with hands-on experience in event planning, brand identity design, and digital creatives. Proficient in Adobe Photoshop, Figma, and software development, with a strong ability to create visually engaging and user-focused designs.",

    education: [
      {
        school: "University of Mines and Technology",
        location: "Tarkwa-Ghana",
        degree: "Bachelor of Science in Electrical and Electronic Engineering",
        startDate: "2022",
        endDate: "",
      },
      {
        school: "St. Hubert Seminary School",
        location: "Kumasi-Ghana",
        degree: "General Science",
        startDate: "2019",
        endDate: "2022",
      },
      {
        school: "AngloGold Ashanti School",
        location: "Obuasi-Ghana",
        degree: "",
        startDate: "2009",
        endDate: "2019",
      },
    ],

    experience: [
      {
        company: "Ghana Institute of Engineering",
        location: "Takoradi Chapter",
        role: "Graphic Designer",
        startDate: "OCT",
        endDate: "",
        description:
          "Designed creative marketing materials including banners, brochures, and social media posts.\nInterpreted design requirements and transformed ideas into visually compelling designs.\nAssisted in creating digital content to support promotional campaigns and improve online presence.\nCollaborated with team members to ensure timely delivery of creative projects and branding materials.",
      },
      {
        company: "Eco-Africa Limited",
        location: "Remote",
        role: "Volunteer",
        startDate: "SEPT 2025",
        endDate: "MARCH 2026",
        description:
          "Designed engaging social media graphics and promotional materials for digital campaigns.\nCreated flyers, posters, and branded content to improve audience engagement and brand visibility.\nCollaborated with team members to develop creative visual concepts aligned with organizational goals.\nEdited and enhanced images using graphic design tools to produce professional marketing materials.\nAssisted in maintaining brand consistency across digital and print media designs.",
      },
    ],

    skills:
      "Graphic Design & Branding: Skilled in creating logos, flyers, social media creatives, and brand identity materials using Adobe Photoshop and Figma.\nSoftware Development & Problem Solving: Proficient in developing responsive web applications and digital solutions using modern technologies and user-focused design principles.\nCommunication & Team Collaboration: Strong interpersonal, organizational, and teamwork skills with hands-on experience in event planning, project coordination, and creative collaboration.",

    certifications: [
      {
        title: "Complete Adobe Photoshop II",
        issuer: "Coursera",
        date: "NOV 2022",
      },
      {
        title: "Certified Full Stack Developer",
        issuer: "Coursera",
        date: "OCT 2023",
      },
      {
        title: "Project Management Fundamentals",
        issuer: "Pathfinders",
        date: "JAN 2026",
      },
    ],
  });

  useEffect(() => {
    const savedCV = localStorage.getItem("student_cv_draft");

    if (savedCV) {
      setCvData(JSON.parse(savedCV));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCvData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...cvData[section]];
    updatedSection[index][field] = value;

    setCvData((prev) => ({
      ...prev,
      [section]: updatedSection,
    }));
  };

  const addEducation = () => {
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, { ...emptyEducation }],
    }));
  };

  const removeEducation = (index) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }));
  };

  const removeExperience = (index) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addCertification = () => {
    setCvData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { ...emptyCertification }],
    }));
  };

  const removeCertification = (index) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const saveDraft = () => {
    localStorage.setItem("student_cv_draft", JSON.stringify(cvData));
    alert("CV draft saved successfully!");
  };

  const splitTextToBullets = (text) => {
    if (!text) return [];

    return text
      .split(/\n|•/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const exportPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const marginX = 18;
    const maxWidth = pageWidth - marginX * 2;

    let y = 18;

    const lineHeight = 6;

    const checkPageBreak = (neededSpace = 20) => {
      if (y + neededSpace > pageHeight - 18) {
        pdf.addPage();
        y = 18;
      }
    };

    const addSectionTitle = (title) => {
      checkPageBreak(16);

      pdf.setFont("times", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);

      pdf.text(title.toUpperCase(), marginX, y);
      y += 2;

      pdf.setDrawColor(80, 80, 80);
      pdf.line(marginX, y, pageWidth - marginX, y);

      y += 7;
    };

    const addWrappedText = (text, options = {}) => {
      if (!text) return;

      const {
        fontSize = 10.5,
        fontStyle = "normal",
        indent = 0,
        spacingAfter = 4,
      } = options;

      pdf.setFont("times", fontStyle);
      pdf.setFontSize(fontSize);
      pdf.setTextColor(0, 0, 0);

      const lines = pdf.splitTextToSize(text, maxWidth - indent);

      checkPageBreak(lines.length * lineHeight + spacingAfter);

      lines.forEach((line) => {
        pdf.text(line, marginX + indent, y);
        y += lineHeight;
      });

      y += spacingAfter;
    };

    const addBulletList = (text) => {
      const bullets = splitTextToBullets(text);

      bullets.forEach((bullet) => {
        const bulletText = `• ${bullet}`;
        const lines = pdf.splitTextToSize(bulletText, maxWidth - 8);

        checkPageBreak(lines.length * lineHeight + 2);

        pdf.setFont("times", "normal");
        pdf.setFontSize(10.5);

        lines.forEach((line, index) => {
          pdf.text(line, marginX + (index === 0 ? 5 : 9), y);
          y += lineHeight;
        });
      });

      y += 3;
    };

    const addTwoColumnRow = (leftText, rightText, options = {}) => {
      const { bold = true } = options;

      checkPageBreak(10);

      pdf.setFont("times", bold ? "bold" : "normal");
      pdf.setFontSize(10.5);

      const rightWidth = pdf.getTextWidth(rightText || "");
      const rightX = pageWidth - marginX - rightWidth;

      const leftMaxWidth = maxWidth - rightWidth - 10;
      const leftLines = pdf.splitTextToSize(leftText || "", leftMaxWidth);

      pdf.text(leftLines, marginX, y);

      if (rightText) {
        pdf.text(rightText, rightX, y);
      }

      y += leftLines.length * lineHeight;
    };

    // CV HEADER
    pdf.setFont("times", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);

    const fullName = `${cvData.firstName} ${cvData.lastName}`.toUpperCase();
    pdf.text(fullName, pageWidth / 2, y, { align: "center" });

    y += 8;

    pdf.setFont("times", "normal");
    pdf.setFontSize(10);

    pdf.setTextColor(29, 78, 216);

    const contactLine = `${cvData.email} | ${cvData.phone} | ${cvData.portfolio}`;
    pdf.text(contactLine, pageWidth / 2, y, { align: "center" });

    pdf.setTextColor(0, 0, 0);

    y += 12;

    // PROFILE SUMMARY
    addSectionTitle("Profile Summary");
    addWrappedText(cvData.professionalSummary, {
      fontSize: 10.5,
      spacingAfter: 4,
    });

    // EDUCATION
    addSectionTitle("Education");

    cvData.education.forEach((edu) => {
      const schoolLine = `${edu.school}${edu.location ? `, ${edu.location}` : ""}`;
      const dateLine = `${edu.startDate}${edu.endDate ? ` – ${edu.endDate}` : ""}`;

      addTwoColumnRow(schoolLine, dateLine, { bold: true });

      if (edu.degree) {
        addWrappedText(edu.degree, {
          fontSize: 10.5,
          spacingAfter: 3,
        });
      }
    });

    y += 2;

    // EXPERIENCE
    addSectionTitle("Professional Experience");

    cvData.experience.forEach((exp) => {
      const companyLine = `${exp.company}${exp.location ? ` | ${exp.location}` : ""}`;
      const dateLine = `${exp.startDate}${exp.endDate ? ` – ${exp.endDate}` : ""}`;

      addTwoColumnRow(companyLine, dateLine, { bold: true });

      if (exp.role) {
        addWrappedText(exp.role, {
          fontSize: 10.5,
          fontStyle: "bold",
          spacingAfter: 1,
        });
      }

      addBulletList(exp.description);
    });

    // SKILLS
    addSectionTitle("Core Skills and Competences");
    addBulletList(cvData.skills);

    // CERTIFICATIONS
    addSectionTitle("Certifications");

    cvData.certifications.forEach((cert) => {
      const leftText = cert.title;
      const rightText = `${cert.issuer}${cert.date ? `, ${cert.date}` : ""}`;

      addTwoColumnRow(leftText, rightText, { bold: true });
      y += 2;
    });

    pdf.save(`${cvData.firstName}_${cvData.lastName}_CV.pdf`);
  };

  const cvStyles = {
    page: {
      width: "794px",
      minHeight: "1123px",
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "48px",
      fontFamily: "Georgia, serif",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    },
    header: {
      marginBottom: "24px",
      textAlign: "center",
    },
    name: {
      fontSize: "30px",
      fontWeight: "700",
      letterSpacing: "4px",
      margin: 0,
    },
    contactLine: {
      marginTop: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
      fontSize: "14px",
    },
    link: {
      color: "#1d4ed8",
      textDecoration: "underline",
    },
    section: {
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      borderBottom: "1px solid #6b7280",
      paddingBottom: "4px",
      marginBottom: "12px",
    },
    paragraph: {
      fontSize: "14px",
      lineHeight: "1.8",
      textAlign: "justify",
      margin: 0,
    },
    itemWrapper: {
      marginBottom: "14px",
      fontSize: "14px",
    },
    rowBetween: {
      display: "flex",
      justifyContent: "space-between",
      gap: "16px",
      fontWeight: "700",
    },
    normalText: {
      fontSize: "14px",
      marginTop: "4px",
    },
    bulletList: {
      marginTop: "10px",
      paddingLeft: "28px",
      fontSize: "14px",
      lineHeight: "1.7",
    },
    certList: {
      paddingLeft: "28px",
      fontSize: "14px",
      lineHeight: "1.7",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 lg:px-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CV Builder</h1>
          <p className="mt-2 max-w-md text-lg text-muted-foreground">
            Create a professional CV and preview it while building.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={saveDraft}
            className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
          >
            <Save size={18} />
            Save Draft
          </button>

          <button
            onClick={exportPDF}
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-sm font-semibold text-black shadow-sm hover:bg-yellow-600"
          >
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.3fr]">
        <div className="min-w-0 rounded-2xl border bg-white shadow-sm">
          <div className="flex overflow-x-auto border-b">
            {["personal", "education", "experience", "skills", "certs"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-w-max px-5 py-4 text-sm font-medium capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-yellow-500 text-black"
                      : "text-muted-foreground"
                  }`}
                >
                  {tab === "certs" ? "Certifications" : tab}
                </button>
              ),
            )}
          </div>

          <div className="max-h-[760px] overflow-y-auto p-6">
            {activeTab === "personal" && (
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input
                      name="firstName"
                      value={cvData.firstName}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                      name="lastName"
                      value={cvData.lastName}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      name="email"
                      value={cvData.email}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <input
                      name="phone"
                      value={cvData.phone}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Portfolio</label>
                    <input
                      name="portfolio"
                      value={cvData.portfolio}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Profile Summary</label>
                  <textarea
                    name="professionalSummary"
                    value={cvData.professionalSummary}
                    onChange={handleChange}
                    rows="7"
                    className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Education</h2>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm text-white"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                {cvData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="space-y-4 rounded-xl border bg-slate-50 p-4"
                  >
                    <div className="flex justify-end">
                      {cvData.education.length > 1 && (
                        <button
                          onClick={() => removeEducation(index)}
                          className="flex items-center gap-1 text-sm text-red-600"
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      placeholder="School"
                      value={edu.school}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "school",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <input
                      placeholder="Location"
                      value={edu.location}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "location",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <input
                      placeholder="Degree / Programme"
                      value={edu.degree}
                      onChange={(e) =>
                        handleArrayChange(
                          "education",
                          index,
                          "degree",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        placeholder="Start Date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            index,
                            "startDate",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                      />

                      <input
                        placeholder="End Date"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "education",
                            index,
                            "endDate",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Professional Experience
                  </h2>

                  <button
                    onClick={addExperience}
                    className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm text-white"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                {cvData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="space-y-4 rounded-xl border bg-slate-50 p-4"
                  >
                    <div className="flex justify-end">
                      {cvData.experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(index)}
                          className="flex items-center gap-1 text-sm text-red-600"
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "company",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <input
                      placeholder="Location"
                      value={exp.location}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "location",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <input
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "role",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        placeholder="Start Date"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            index,
                            "startDate",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                      />

                      <input
                        placeholder="End Date"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleArrayChange(
                            "experience",
                            index,
                            "endDate",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                      />
                    </div>

                    <textarea
                      placeholder="Write each responsibility on a new line"
                      value={exp.description}
                      onChange={(e) =>
                        handleArrayChange(
                          "experience",
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      rows="7"
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div>
                <label className="text-sm font-medium">
                  Core Skills and Competences
                </label>

                <textarea
                  name="skills"
                  value={cvData.skills}
                  onChange={handleChange}
                  rows="12"
                  placeholder="Write each skill group on a new line"
                  className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                />
              </div>
            )}

            {activeTab === "certs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Certifications</h2>

                  <button
                    onClick={addCertification}
                    className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-sm text-white"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>

                {cvData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="space-y-4 rounded-xl border bg-slate-50 p-4"
                  >
                    <div className="flex justify-end">
                      {cvData.certifications.length > 1 && (
                        <button
                          onClick={() => removeCertification(index)}
                          className="flex items-center gap-1 text-sm text-red-600"
                        >
                          <Trash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>

                    <input
                      placeholder="Certification title"
                      value={cert.title}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          "title",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <input
                      placeholder="Issuer"
                      value={cert.issuer}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          "issuer",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />

                    <input
                      placeholder="Date"
                      value={cert.date}
                      onChange={(e) =>
                        handleArrayChange(
                          "certifications",
                          index,
                          "date",
                          e.target.value,
                        )
                      }
                      className="w-full rounded-xl border px-4 py-3 outline-none focus:border-yellow-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2 text-lg font-medium text-slate-600">
            <Eye size={20} />
            Live Preview
          </div>

          <div className="max-h-[760px] overflow-auto rounded-2xl border bg-slate-100 p-5 shadow-sm">
            <div className="flex justify-center">
              <div id="cv-preview" ref={cvRef} style={cvStyles.page}>
                <header style={cvStyles.header}>
                  <h1 style={cvStyles.name}>
                    {cvData.firstName} {cvData.lastName}
                  </h1>

                  <div style={cvStyles.contactLine}>
                    <span data-cv-link="true" style={cvStyles.link}>
                      {cvData.email}
                    </span>
                    <span>|</span>
                    <span>{cvData.phone}</span>
                    <span>|</span>
                    <span data-cv-link="true" style={cvStyles.link}>
                      {cvData.portfolio}
                    </span>
                  </div>
                </header>

                <section style={cvStyles.section}>
                  <h2 style={cvStyles.sectionTitle}>Profile Summary</h2>
                  <p style={cvStyles.paragraph}>{cvData.professionalSummary}</p>
                </section>

                <section style={cvStyles.section}>
                  <h2 style={cvStyles.sectionTitle}>Education</h2>

                  {cvData.education.map((edu, index) => (
                    <div key={index} style={cvStyles.itemWrapper}>
                      <div style={cvStyles.rowBetween}>
                        <p>
                          {edu.school}
                          {edu.location && `, ${edu.location}`}
                        </p>

                        <p>
                          {edu.startDate}
                          {edu.endDate && ` – ${edu.endDate}`}
                        </p>
                      </div>

                      {edu.degree && (
                        <p style={cvStyles.normalText}>{edu.degree}</p>
                      )}
                    </div>
                  ))}
                </section>

                <section style={cvStyles.section}>
                  <h2 style={cvStyles.sectionTitle}>Professional Experience</h2>

                  {cvData.experience.map((exp, index) => (
                    <div key={index} style={cvStyles.itemWrapper}>
                      <div style={cvStyles.rowBetween}>
                        <p>
                          {exp.company}
                          {exp.location && ` | ${exp.location}`}
                        </p>

                        <p>
                          {exp.startDate}
                          {exp.endDate && ` – ${exp.endDate}`}
                        </p>
                      </div>

                      <p style={{ ...cvStyles.normalText, fontWeight: "700" }}>
                        {exp.role}
                      </p>

                      <ul style={cvStyles.bulletList}>
                        {splitTextToBullets(exp.description).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section style={cvStyles.section}>
                  <h2 style={cvStyles.sectionTitle}>
                    Core Skills and Competences
                  </h2>

                  <ul style={cvStyles.bulletList}>
                    {splitTextToBullets(cvData.skills).map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </section>

                <section style={cvStyles.section}>
                  <h2 style={cvStyles.sectionTitle}>Certifications</h2>

                  <ul style={cvStyles.certList}>
                    {cvData.certifications.map((cert, index) => (
                      <li key={index}>
                        <div style={cvStyles.rowBetween}>
                          <span style={{ fontWeight: "700" }}>
                            {cert.title}
                          </span>

                          <span>
                            {cert.issuer}
                            {cert.date && `, ${cert.date}`}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
