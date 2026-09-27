import MyApplications from "@/pages/student/MyApplications";

export default function SDashboardInfo({ applications }) {
  return <MyApplications suppliedApplications={applications} recent />;
}
