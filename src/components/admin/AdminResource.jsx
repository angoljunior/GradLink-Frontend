import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ReferenceSelect from "./ReferenceSelect";

function labelFor(key) { return key.replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase()); }
function errorText(err) {
  const data = err.response?.data;
  if (!data) return "The request failed. Check your connection and try again.";
  if (typeof data === "string") return "The server could not complete the request.";
  return Object.entries(data).map(([key, value]) => `${key === "detail" ? "" : `${labelFor(key)}: `}${Array.isArray(value) ? value.join(" ") : typeof value === "object" ? JSON.stringify(value) : value}`).join(" ");
}
function Value({ value }) {
  if (typeof value === "boolean") return <Badge variant={value ? "default" : "secondary"}>{value ? "Yes" : "No"}</Badge>;
  if (value === null || value === undefined || value === "") return <span className="text-muted-foreground">—</span>;
  if (typeof value === "string" && /^https?:\/\//i.test(value)) return <a className="text-yellow-800 underline" href={value} target="_blank" rel="noreferrer">Open link / document</a>;
  return <span className="whitespace-pre-wrap break-words">{String(value)}</span>;
}
function Field({ field, value, onChange }) {
  if (field.resource) return <ReferenceSelect {...field} value={value} onChange={onChange} />;
  if (field.type === "boolean") return <label className="flex items-center gap-2"><input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} /> Enabled</label>;
  if (field.options) return <select className="h-10 w-full rounded-md border bg-card px-3" aria-label={field.label} value={value ?? ""} required={field.required} onChange={(e) => onChange(e.target.value)}><option value="">Select…</option>{field.options.map((option) => <option key={option[0]} value={option[0]}>{option[1]}</option>)}</select>;
  if (field.type === "textarea") return <textarea aria-label={field.label} className="min-h-28 w-full rounded-md border p-3" required={field.required} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  if (field.type === "file") return <Input aria-label={field.label} type="file" accept="image/png,image/jpeg" onChange={(e) => onChange(e.target.files[0])} />;
  return <Input aria-label={field.label} type={field.type || "text"} required={field.required} min={field.min} step={field.step} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
}
export default function AdminResource({ config }) {
  const location = useLocation();
  return <ResourceTable key={`${config.resource}:${location.search}`} config={config} initialFilters={Object.fromEntries(new URLSearchParams(location.search))} />;
}
function ResourceTable({ config, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState(initialFilters.search || "");
  const [page, setPage] = useState(1);
  const [revision, setRevision] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState(null);
  const [values, setValues] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setLoading(true);
      api.get(`admin/${config.resource}/`, { params: { ...filters, search, page }, signal: controller.signal }).then(({ data: result }) => { setData(result); setError(""); }).catch((err) => { if (err.code !== "ERR_CANCELED") setError(errorText(err)); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, 200);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [config.resource, filters, search, page, revision]);
  function openDialog(mode, row, action) {
    setFormError("");
    setValues(Object.fromEntries((config.fields || []).map((f) => [f.name, f.type === "file" ? undefined : row?.[f.name] ?? f.default ?? (f.type === "boolean" ? false : "")])));
    setDialog({ mode, row, action });
  }
  async function submit(event) {
    event.preventDefault();
    setSaving(true); setFormError("");
    try {
      const url = `admin/${config.resource}/${dialog.row ? `${dialog.row.id}/` : ""}`;
      if (dialog.mode === "delete") await api.delete(url);
      else if (dialog.mode === "action") await api.patch(url, dialog.action.payload(dialog.row));
      else {
        const payload = {};
        for (const field of config.fields) {
          const value = values[field.name];
          if (field.type === "file" && !value) continue;
          payload[field.name] = field.resource && value === "" ? null : value;
        }
        let body = payload;
        if (Object.values(payload).some((v) => v instanceof File)) {
          body = new FormData(); Object.entries(payload).forEach(([k, v]) => body.append(k, v ?? ""));
        }
        if (dialog.mode === "create") await api.post(url, body);
        else await api.patch(url, body);
      }
      toast.success("Changes saved."); setDialog(null); setRevision((n) => n + 1);
      if (dialog.mode === "delete" && data.results.length === 1 && page > 1) setPage(page - 1);
    } catch (err) { setFormError(errorText(err)); }
    finally { setSaving(false); }
  }
  return <section className="space-y-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-2xl font-bold">{config.title}</h1><p className="mt-1 max-w-3xl text-sm text-muted-foreground">{config.description}</p></div>{config.create && <Button className="bg-yellow-400 text-slate-950 hover:bg-yellow-500" onClick={() => openDialog("create")}>Add {config.singular || "record"}</Button>}</div><Card><CardContent className="space-y-4 pt-6"><div className="grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4"><label className="space-y-1 text-sm"><span>Search</span><Input placeholder="Search records…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} /></label>{(config.filters || []).map((filter) => <label key={filter.name} className="space-y-1 text-sm"><span>{filter.label}</span>{filter.resource ? <ReferenceSelect {...filter} value={filters[filter.name]} onChange={(value) => { setFilters({ ...filters, [filter.name]: value }); setPage(1); }} /> : filter.options ? <select aria-label={filter.label} className="h-9 w-full rounded-md border bg-card px-2" value={filters[filter.name] || ""} onChange={(e) => { setFilters({ ...filters, [filter.name]: e.target.value }); setPage(1); }}><option value="">All</option>{filter.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select> : <Input aria-label={filter.label} value={filters[filter.name] || ""} onChange={(e) => { setFilters({ ...filters, [filter.name]: e.target.value }); setPage(1); }} />}</label>)}</div><div className="flex justify-end gap-2"><Button size="sm" variant="outline" onClick={() => { setFilters({}); setSearch(""); setPage(1); }}>Clear filters</Button><Button size="sm" variant="outline" onClick={() => setRevision((n) => n + 1)}>Refresh</Button></div>{error ? <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div> : loading ? <p role="status" className="p-8 text-center">Loading records…</p> : !data?.results.length ? <p className="p-8 text-center text-muted-foreground">No records match these filters.</p> : <><Table><TableHeader><TableRow>{config.columns.map(([key, label]) => <TableHead key={key}>{label}</TableHead>)}<TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>{data.results.map((row) => <TableRow key={row.id}>{config.columns.map(([key]) => <TableCell key={key} className="max-w-72"><Value value={row[key]} /></TableCell>)}<TableCell><div className="flex min-w-36 flex-wrap gap-2"><Button variant="outline" size="sm" onClick={() => openDialog("view", row)}>Details</Button>{config.fields?.length > 0 && <Button variant="outline" size="sm" onClick={() => openDialog("edit", row)}>Edit</Button>}{config.actions?.filter((action) => !action.when || action.when(row)).map((action) => <Button key={action.label} variant="outline" size="sm" onClick={() => openDialog("action", row, action)}>{action.label}</Button>)}{config.links?.map((link) => <Button key={link.label} variant="outline" size="sm" asChild><Link to={link.to(row)}>{link.label}</Link></Button>)}{config.remove && <Button variant="destructive" size="sm" onClick={() => openDialog("delete", row)}>Delete</Button>}</div></TableCell></TableRow>)}</TableBody></Table><div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4"><p className="text-sm text-muted-foreground">{data.count} records · Page {page} of {Math.max(1, Math.ceil(data.count / 20))}</p><div className="flex gap-2"><Button variant="outline" disabled={!data.previous} onClick={() => setPage(page - 1)}>Previous</Button><Button variant="outline" disabled={!data.next} onClick={() => setPage(page + 1)}>Next</Button></div></div></>}</CardContent></Card><Dialog open={Boolean(dialog)} onOpenChange={(open) => { if (!open && !saving) setDialog(null); }}><DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl"><DialogHeader><DialogTitle>{dialog?.mode === "view" ? "Record details" : dialog?.mode === "action" ? dialog.action.label : `${labelFor(dialog?.mode || "")} ${config.singular || "record"}`}</DialogTitle><DialogDescription>{dialog?.row ? `Record #${dialog.row.id}. ` : ""}{dialog?.mode === "view" ? "Private document links expire after five minutes. Refresh the table to renew them." : "Administrative changes are recorded in the activity log."}</DialogDescription></DialogHeader>{dialog?.mode === "view" ? <dl className="space-y-3">{Object.entries(dialog.row).map(([key, value]) => <div key={key} className="grid gap-1 border-b pb-2 sm:grid-cols-[160px_1fr]"><dt className="text-sm font-medium text-muted-foreground">{labelFor(key)}</dt><dd className="min-w-0 text-sm"><Value value={value} /></dd></div>)}</dl> : <form onSubmit={submit} className="space-y-4">{dialog?.mode === "delete" ? <p>Delete this record permanently? {config.deleteWarning || "This cannot be undone."}</p> : dialog?.mode === "action" ? <p>{dialog.action.confirm || `Apply “${dialog.action.label}” to this record?`}</p> : config.fields?.map((field) => <div key={field.name} className="space-y-1"><p className="text-sm font-medium">{field.label}{field.required ? " *" : ""}</p><Field field={field} value={values[field.name]} onChange={(value) => setValues({ ...values, [field.name]: value })} />{field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}</div>)}{formError && <p role="alert" className="rounded bg-red-50 p-3 text-sm text-red-700">{formError}</p>}<div className="flex justify-end gap-2"><Button type="button" variant="outline" disabled={saving} onClick={() => setDialog(null)}>Cancel</Button><Button type="submit" disabled={saving} className="bg-yellow-400 text-slate-950 hover:bg-yellow-500">{saving ? "Saving…" : "Confirm"}</Button></div></form>}</DialogContent></Dialog></section>;
}
