
import { AdminDashboard } from "@/components/admin/admin-dashboard";
async function AdminPage({ params }) {
  const { section } = await params;
  return <AdminDashboard section={section?.[0] || "dashboard"} />;
}
export {
  AdminPage as default
};
