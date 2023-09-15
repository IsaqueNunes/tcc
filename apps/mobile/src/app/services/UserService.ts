import { getData } from "./ApiService";

export async function getDashboardData(adminId: string) {
  return getData('/tickets/admin-dashboard-information/', adminId);
}
