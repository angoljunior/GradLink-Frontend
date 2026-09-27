import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Input } from "@/components/ui/input";

// Search keeps reference choices bounded even on large installations.
export default function ReferenceSelect({ resource, value, onChange, required = false, label }) {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      api.get(`admin/${resource}/`, { params: { search, page_size: 30 }, signal: controller.signal }).then(({ data }) => { setOptions(data.results); setError(""); }).catch((err) => { if (err.code !== "ERR_CANCELED") setError("Could not load choices. Change the search to retry."); });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [resource, search]);
  return <div className="space-y-1"><Input aria-label={`Search ${label}`} placeholder={`Search ${label.toLowerCase()}…`} value={search} onChange={(event) => setSearch(event.target.value)} /><select aria-label={label} required={required} className="h-9 w-full rounded-md border bg-card px-2 text-sm" value={value ?? ""} onChange={(event) => onChange(event.target.value)}><option value="">{required ? "Select…" : "All / none"}</option>{value && !options.some((item) => String(item.id) === String(value)) && <option value={value}>Selected #{value}</option>}{options.map((item) => <option key={item.id} value={item.id}>{item.name || item.title || item.email || item.full_name || `#${item.id}`} (#{item.id})</option>)}</select><p className="text-xs text-muted-foreground">{error || "Showing up to 30 matches; search to narrow choices."}</p></div>;
}
