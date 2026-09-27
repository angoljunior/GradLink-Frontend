export const sessionKeys = ["access", "refresh", "role", "email", "name", "userName", "userId", "isSuperUser", "isAdmin"];
export function clearSession() {
  sessionKeys.forEach((key) => localStorage.removeItem(key));
}
export function storeSession(data) {
  if (data.access) localStorage.setItem("access", data.access);
  if (data.refresh) localStorage.setItem("refresh", data.refresh);
  const name = data.name || [data.first_name, data.last_name].filter(Boolean).join(" ") || data.username || "User";
  for (const [key, value] of Object.entries({ role: data.role, email: data.email, name, userName: name, userId: data.userId ?? data.id, isSuperUser: Boolean(data.isSuperUser), isAdmin: Boolean(data.is_admin) })) {
    if (value !== undefined) localStorage.setItem(key, String(value));
  }
}
export function dashboardPath(identity) {
  const role = typeof identity === "string" ? identity : identity?.role;
  if ((typeof identity === "object" && identity?.is_admin) || role === "admin") return "/admin/dashboard";
  return role === "student" ? "/student/dashboard" : role === "employer" ? "/employer/dashboard" : "/";
}
