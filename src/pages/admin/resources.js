const yesNo = [["true", "Yes"], ["false", "No"]];
const roles = [["student", "Student"], ["employer", "Employer"], ["university", "University"], ["admin", "Admin"]];
const statuses = ["submitted", "reviewed", "shortlisted", "interview", "accepted", "rejected"].map((v) => [v, v]);
const verificationStatuses = ["pending", "approved", "rejected"].map((v) => [v, v]);
const types = [["graduate_program", "Graduate program"], ["internship", "Internship"], ["entry_level", "Entry level"], ["national_service", "National service"], ["trainee", "Trainee"]];
const testTypes = [["numerical", "Numerical"], ["verbal", "Verbal"], ["logical", "Logical"]];
const field = (name, label, type = "text", extra = {}) => ({ name, label, type, ...extra });
const select = (name, label, options) => ({ name, label, options });
const ref = (name, label, resource) => ({ name, label, resource });
const toggle = (name, label) => ({ label, payload: (row) => ({ [name]: !row[name] }) });
const action = (label, payload, extra = {}) => ({ label, payload: () => payload, ...extra });
const jobsLink = (key = "id") => ({ label: "Jobs", to: (row) => `/admin/jobs?company=${row[key]}` });

export const resources = {
  users: {
    resource: "users", title: "User management", singular: "user", description: "Inspect accounts and control access. Privileged accounts cannot be suspended here.",
    columns: [["id", "ID"], ["email", "Email"], ["role", "Role"], ["is_active", "Active"], ["is_verified", "Verified"]],
    filters: [select("role", "Role", roles), select("is_active", "Active", yesNo), select("is_verified", "Verified", yesNo)],
    fields: [field("is_active", "Account active", "boolean"), field("is_verified", "Verified", "boolean")],
  },
  employers: {
    resource: "employers", title: "Employers", description: "Inspect profiles, verification, job counts and current subscriptions. Suspension hides the employer’s public jobs and blocks login.",
    columns: [["id", "ID"], ["name", "Company"], ["is_verified", "Verified"], ["is_active", "Active"], ["job_count", "Jobs"], ["active_subscription", "Subscription"]],
    filters: [select("is_verified", "Verified", yesNo), select("user__is_active", "Account active", yesNo)],
    fields: [field("is_active", "Account active", "boolean"), field("is_verified", "Verified", "boolean")],
    links: [jobsLink(), { label: "Verification", to: (r) => `/admin/verifications?user=${r.user}` }, { label: "Subscriptions", to: (r) => `/admin/subscriptions?employer=${r.id}` }],
  },
  jobs: {
    resource: "jobs", title: "Job moderation", description: "Approve, reject or deactivate existing jobs. Deactivation preserves applications and the recruitment history.",
    columns: [["id", "ID"], ["title", "Title"], ["company_name", "Company"], ["moderation_status", "Review"], ["is_active", "Active"], ["application_count", "Applications"]],
    filters: [ref("company", "Company", "employers"), ref("category", "Category", "categories"), select("job_type", "Job type", types), select("moderation_status", "Review status", verificationStatuses), select("is_active", "Active", yesNo), field("location", "Location (exact)")],
    actions: [action("Approve", { is_approved: true, is_active: true }, { when: (r) => !r.is_approved }), action("Reject", { is_approved: false, is_active: false }, { when: (r) => r.is_approved || r.is_active }), toggle("is_active", "Toggle active")],
    links: [{ label: "Applications", to: (r) => `/admin/applications?job=${r.id}` }],
  },
  applications: {
    resource: "applications", title: "Applications oversight", description: "Read-only recruitment oversight. Status decisions remain with the employer. Pipeline totals are available in Analytics.",
    columns: [["id", "ID"], ["full_name", "Applicant"], ["student_email", "Email"], ["job_title", "Job"], ["company_name", "Company"], ["status", "Status"]],
    filters: [ref("job__company", "Company", "employers"), ref("job", "Job", "jobs"), field("student", "Student profile ID", "number"), select("status", "Status", statuses)],
  },
  verifications: {
    resource: "verifications", title: "Verification queue", description: "Review the submitted document before approval. Approving verifies the associated user and profile; rejection or pending removes verification.",
    columns: [["id", "ID"], ["user_email", "Applicant"], ["request_type", "Type"], ["status", "Status"], ["submitted_at", "Submitted"]],
    filters: [select("status", "Status", verificationStatuses), select("request_type", "Type", [["company", "Company"], ["university", "University"]])],
    fields: [{ ...select("status", "Decision", verificationStatuses), required: true }, field("admin_note", "Admin notes", "textarea")],
  },
  reports: {
    resource: "reports", title: "Reports and moderation", description: "Inspect report reasons, record moderation notes and resolve reports. Open the linked job or employer to take enforcement action.",
    columns: [["id", "ID"], ["job_title", "Job"], ["company_name", "Company"], ["reason", "Reason"], ["resolved", "Resolved"]],
    filters: [select("resolved", "Resolved", yesNo)],
    fields: [field("moderation_note", "Moderation notes", "textarea"), field("resolved", "Resolved", "boolean")],
    links: [{ label: "Moderate job", to: (r) => `/admin/jobs?id=${r.job}` }, { label: "Employer", to: (r) => `/admin/employers?id=${r.company}` }],
  },
  subscriptions: {
    resource: "subscriptions", title: "Employer subscriptions", description: "Recorded payment references and access periods. Amounts are historical records, not payment-provider settlement confirmations.",
    columns: [["id", "ID"], ["company_name", "Company"], ["plan_name", "Plan"], ["amount_paid", "Amount paid"], ["payment_method", "Method"], ["current_status", "Status"]],
    filters: [ref("employer", "Company", "employers"), select("current_status", "Status", ["active", "expired", "inactive", "scheduled"].map((v) => [v, v]))],
    fields: [ref("plan", "Plan", "plans"), field("start_date", "Start date", "date", { required: true }), field("end_date", "End date", "date", { required: true }), field("is_active", "Active", "boolean")],
  },
  plans: {
    resource: "plans", title: "Subscription plans", singular: "plan", description: "Manage the plans available to employers. Deleting a plan keeps its historical subscription records.", create: true, remove: true,
    columns: [["id", "ID"], ["name", "Name"], ["price", "Price"], ["duration_days", "Days"]],
    fields: [field("name", "Plan name", "text", { required: true }), field("price", "Price", "number", { min: 0, step: "0.01", required: true }), field("duration_days", "Duration (days)", "number", { min: 1, required: true }), field("features", "Features", "textarea", { required: true })],
  },
  content: {
    resource: "content", title: "Career content", singular: "article", description: "Create and publish career articles. Content is rendered as plain text with paragraphs; HTML is not executed.", create: true, remove: true,
    columns: [["id", "ID"], ["title", "Title"], ["slug", "URL slug"], ["published", "Published"], ["created_at", "Created"]], filters: [select("published", "Published", yesNo)],
    fields: [field("title", "Title", "text", { required: true }), field("slug", "Unique URL slug", "text", { required: true, help: "Use letters, numbers, hyphens and underscores." }), field("content", "Article content", "textarea", { required: true }), field("featured_image", "Featured image", "file"), field("published", "Published", "boolean")],
    actions: [toggle("published", "Publish / unpublish")], links: [{ label: "Public article", to: (r) => `/career-advice/${r.slug}` }],
  },
  tests: {
    resource: "tests", title: "Psychometric tests", singular: "test", description: "Manage the test catalog. Average score is the raw number of correct answers. Tests with attempts cannot be deleted.", create: true, remove: true, deleteWarning: "Questions are also deleted; recorded attempts prevent deletion.",
    columns: [["id", "ID"], ["title", "Title"], ["test_type", "Type"], ["duration_minutes", "Minutes"], ["question_count", "Questions"], ["attempt_count", "Attempts"], ["average_score", "Average score"]],
    filters: [select("test_type", "Type", testTypes)],
    fields: [field("title", "Title", "text", { required: true }), { ...select("test_type", "Test type", testTypes), required: true }, field("duration_minutes", "Duration (minutes)", "number", { required: true, min: 1 }), field("description", "Description", "textarea")],
    links: [{ label: "Questions", to: (r) => `/admin/tests?test=${r.id}&section=questions` }],
  },
  questions: {
    resource: "questions", title: "Test questions", singular: "question", create: true, remove: true, description: "Correct answers are available only to authorized administrators.",
    columns: [["id", "ID"], ["test_title", "Test"], ["question_text", "Question"], ["correct_option", "Correct answer"]], filters: [ref("test", "Test", "tests")],
    fields: [{ ...ref("test", "Test", "tests"), required: true }, field("question_text", "Question", "textarea", { required: true }), ...["a", "b", "c", "d"].map((v) => field(`option_${v}`, `Option ${v.toUpperCase()}`, "text", { required: true })), { ...select("correct_option", "Correct answer", ["A", "B", "C", "D"].map((v) => [v, v])), required: true }],
  },
  notifications: {
    resource: "notifications", title: "Sent notifications", description: "Inspect in-app delivery records, including announcements and system notifications.",
    columns: [["id", "ID"], ["title", "Title"], ["recipient", "Recipient"], ["notification_type", "Type"], ["is_read", "Read"], ["created_at", "Created"]],
    filters: [select("user__role", "Recipient role", roles), select("notification_type", "Type", ["general", "application_status", "message", "job_alert"].map((v) => [v, v]))],
  },
  activity: {
    resource: "activity", title: "Admin activity log", description: "Immutable portal audit records. Changes made directly through Django’s built-in admin use its separate admin log.",
    columns: [["timestamp", "Time"], ["admin_email", "Admin"], ["action", "Action"], ["target_type", "Record type"], ["target_id", "Record ID"], ["description", "Description"]],
    filters: [select("action", "Action", ["created", "updated", "deleted", "announcement_sent"].map((v) => [v, v]))],
  },
  categories: {
    resource: "categories", title: "Job categories", singular: "category", description: "Deleting a category leaves its jobs in place with no category.", create: true, remove: true,
    columns: [["id", "ID"], ["name", "Category"]], fields: [field("name", "Category name", "text", { required: true })],
  },
};
