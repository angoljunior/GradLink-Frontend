import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import api from "@/api/axios";
import AdminResource from "@/components/admin/AdminResource";
import { resources } from "./resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function PlatformSettings() {
  const [state, setState] = useState({});
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    api.get("admin/settings/", { signal: controller.signal }).then(({ data }) => setState({ data })).catch((err) => { if (err.code !== "ERR_CANCELED") setState({ error: true }); });
    return () => controller.abort();
  }, [revision]);
  return <Card><CardHeader><CardTitle>Platform configuration</CardTitle></CardHeader><CardContent>{state.error ? <p role="alert">Could not load settings. <Button onClick={() => setRevision((v) => v + 1)}>Retry</Button></p> : !state.data ? <p role="status">Loading configuration…</p> : <div className="space-y-4 text-sm"><p className="text-muted-foreground">{state.data.configuration_note}</p><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="font-semibold">Industries</dt><dd>{state.data.industries.map((v) => v[1]).join(", ")}</dd></div><div><dt className="font-semibold">Job types</dt><dd>{state.data.job_types.map((v) => v[1]).join(", ")}</dd></div><div><dt className="font-semibold">CV formats</dt><dd>{state.data.cv_file_types.join(", ")}</dd></div><div><dt className="font-semibold">Maximum CV size</dt><dd>{state.data.max_cv_size_bytes / 1024 / 1024} MiB</dd></div><div><dt className="font-semibold">Platform contact</dt><dd>{state.data.platform_contact || "Not configured"}</dd></div></dl></div>}</CardContent></Card>;
}
function Announcements({ onSent }) {
  const [audience, setAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function send() {
    setBusy(true); setError("");
    try {
      const { data } = await api.post("admin/announcements/", { audience, title, message });
      toast.success(`Announcement delivered to ${data.recipients} active accounts.`);
      setConfirm(false); setTitle(""); setMessage(""); onSent();
    } catch (err) { setError(err.response?.data?.detail || "Could not send the announcement. Verify delivery records before retrying after a connection failure."); }
    finally { setBusy(false); }
  }
  return <Card><CardHeader><CardTitle>Send an announcement</CardTitle></CardHeader><CardContent><form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setConfirm(true); }}><p className="text-sm text-muted-foreground">Deliver an in-app notification to active accounts in the selected audience.</p><label className="block space-y-1 text-sm"><span>Audience</span><select className="block h-10 w-full rounded border bg-card px-3" value={audience} onChange={(e) => setAudience(e.target.value)}><option value="all">All active users</option><option value="student">Students only</option><option value="employer">Employers only</option></select></label><label className="block space-y-1 text-sm"><span>Title</span><Input required maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} /></label><label className="block space-y-1 text-sm"><span>Message</span><textarea required maxLength={5000} className="min-h-28 w-full rounded border p-3" value={message} onChange={(e) => setMessage(e.target.value)} /></label><Button className="bg-yellow-400 text-slate-950 hover:bg-yellow-500">Review announcement</Button></form><Dialog open={confirm} onOpenChange={(open) => { if (!busy) setConfirm(open); }}><DialogContent><DialogHeader><DialogTitle>Send announcement?</DialogTitle><DialogDescription>This sends an in-app notification to {audience === "all" ? "all active users" : `active ${audience} accounts`}.</DialogDescription></DialogHeader><p className="font-semibold">{title}</p><p className="whitespace-pre-wrap break-words">{message}</p>{error && <p role="alert" className="text-red-700">{error}</p>}<Button disabled={busy} onClick={send}>{busy ? "Sending…" : "Send now"}</Button></DialogContent></Dialog></CardContent></Card>;
}
export default function AdminModule({ module }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [revision, setRevision] = useState(0);
  const section = searchParams.get("section");
  if (module === "settings") return <><PlatformSettings /><AdminResource config={resources.categories} /></>;
  if (module === "notifications") return <><Announcements onSent={() => setRevision((v) => v + 1)} /><AdminResource key={revision} config={resources.notifications} /></>;
  if (module === "subscriptions" || module === "tests") {
    const secondary = module === "subscriptions" ? "plans" : "questions";
    const active = section === secondary ? secondary : module;
    return <><div className="flex gap-2" aria-label="Module sections"><Button variant={active === module ? "default" : "outline"} onClick={() => setSearchParams({})}>{module === "tests" ? "Tests" : "Subscriptions"}</Button><Button variant={active === secondary ? "default" : "outline"} onClick={() => setSearchParams({ section: secondary })}>{secondary === "plans" ? "Plans" : "Questions"}</Button></div><AdminResource config={resources[active]} /></>;
  }
  return <AdminResource config={resources[module]} />;
}
