// A resettable, random browser signal. No fingerprinting or hardware information.
export function registrationDeviceId() {
  const key = "gradlink_device_id";
  try {
    const existing = localStorage.getItem(key);
    if (existing && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(existing)) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(key, id);
    return id;
  } catch {
    throw new Error("Allow browser storage and use HTTPS to create an account.");
  }
}

export function signupError(error) {
  const data = error.response?.data;
  if (data?.detail) return data.detail;
  if (data && typeof data === "object") {
    return Object.values(data).flat().map((value) => typeof value === "string" ? value : Object.values(value).flat().join(" ")).join(" ");
  }
  return error.message || "Registration failed. Please try again.";
}
