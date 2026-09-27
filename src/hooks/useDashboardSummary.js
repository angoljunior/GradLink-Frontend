import { useCallback, useEffect, useState } from "react";
import api from "@/api/axios";

export default function useDashboardSummary(role) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => { setLoading(true); setRevision((value) => value + 1); }, []);
  useEffect(() => {
    const controller = new AbortController();
    api.get(`${role}/dashboard/`, { signal: controller.signal }).then(({ data }) => {
      setData(data); setError("");
    }).catch((failure) => {
      if (failure.code !== "ERR_CANCELED") {
        setError(failure.response?.status === 401 ? "unauthorized" : failure.response?.data?.detail || "Unable to load your dashboard. Please try again.");
      }
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [role, revision]);
  return { data, error, loading, refresh };
}
