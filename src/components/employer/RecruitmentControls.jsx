import { useState } from 'react';
import { toast } from 'sonner';
import api from '@/api/axios';
import { signupError } from '@/lib/registration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

export function RecruitmentActionMenu({ application, onChanged }) {
  const [action, setAction] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [terms, setTerms] = useState('');
  const early = ['submitted','screening','reviewed','assessment'].includes(application.status);
  const terminal = ['hired','rejected','withdrawn'].includes(application.status);
  const options = [
    ...(early ? [['reviewed','Start review'], ['screening','Screening'], ['assessment','Assessment'], ['shortlisted','Shortlist & invite']] : []),
    ...(application.status === 'shortlisted' ? [['interview_invited','Invite to interview']] : []),
    ...(['shortlisted','interview_invited','interview_scheduled'].includes(application.status) ? [['interview_scheduled','Schedule / reschedule interview']] : []),
    ...(application.status === 'interview_scheduled' ? [['interviewed','Mark interview complete']] : []),
    ...(application.status === 'interviewed' ? [['offer','Create offer']] : []),
    ...(application.status === 'offer' ? [['hired','Record offer acceptance']] : []),
    ...(!terminal ? [['rejected','Reject']] : []),
  ];
  const submit = async (event) => {
    event?.preventDefault(); setBusy(true); setError('');
    try {
      const payload = { status:action };
      if (action === 'interview_scheduled') Object.assign(payload, {interview_date:new Date(date).toISOString(), meeting_link:link, location});
      if (action === 'offer') payload.terms = terms;
      if (action === 'hired') payload.acceptance_confirmed = true;
      await api.patch(`employer/applications/${application.id}/status/`, payload);
      toast.success('Recruitment action saved'); setAction(''); onChanged();
    } catch (err) { setError(signupError(err)); } finally { setBusy(false); }
  };
  const label = options.find(([key]) => key === action)?.[1] || action;
  const formAction = ['interview_scheduled','offer'].includes(action);
  return <>
    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline" size="sm" disabled={!options.length}>Actions</Button></DropdownMenuTrigger><DropdownMenuContent>{options.map(([key,label]) => <DropdownMenuItem key={key} onSelect={() => {setError(''); setAction(key); setDate(''); setLink(application.interview_details?.meeting_link || ''); setLocation(application.interview_details?.location || '');}}>{label}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>
    <Dialog open={formAction} onOpenChange={open => {if (!open && !busy) setAction('');}}><DialogContent><DialogHeader><DialogTitle>{label}</DialogTitle><DialogDescription>{application.candidate_name} — {application.role}</DialogDescription></DialogHeader><form onSubmit={submit} className="space-y-4">
      {action === 'interview_scheduled' ? <><label className="block">Interview date and time ({Intl.DateTimeFormat().resolvedOptions().timeZone})<Input aria-label="Interview date and time" type="datetime-local" required value={date} onChange={e=>setDate(e.target.value)} /></label><label className="block">Meeting link<Input type="url" value={link} onChange={e=>setLink(e.target.value)} /></label><label className="block">Location<Input value={location} onChange={e=>setLocation(e.target.value)} /></label><p className="text-sm">Provide a meeting link or location. The candidate will be notified.</p></> : <label className="block">Offer terms<Textarea required value={terms} maxLength={10000} onChange={e=>setTerms(e.target.value)} /></label>}
      {error && <p role="alert" className="text-red-700">{error}</p>}<Button disabled={busy} className="bg-yellow-400 text-black">{busy?'Saving…':'Save and notify'}</Button>
    </form></DialogContent></Dialog>
    <AlertDialog open={!!action && !formAction} onOpenChange={open=>{if (!open && !busy) setAction('');}}><AlertDialogContent><AlertDialogTitle>{label}?</AlertDialogTitle><AlertDialogDescription>{action === 'hired' ? 'Confirm that the candidate has accepted the existing offer.' : `Apply this action to ${application.candidate_name}? Shortlisting sends an interview invitation, without assigning a date.`}</AlertDialogDescription>{error && <p role="alert" className="text-red-700">{error}</p>}<div className="flex gap-3"><AlertDialogCancel asChild><Button variant="outline" disabled={busy}>Cancel</Button></AlertDialogCancel><Button disabled={busy} onClick={submit}>{busy?'Saving…':'Confirm'}</Button></div></AlertDialogContent></AlertDialog>
  </>;
}

export function BulkRecruitmentToolbar({ applications, selected, onChanged, jobs, jobFilter }) {
  const [action,setAction]=useState(''); const [busy,setBusy]=useState(false); const [error,setError]=useState('');
  const [subject,setSubject]=useState(''); const [message,setMessage]=useState(''); const [audience,setAudience]=useState('selected'); const [requestId,setRequestId]=useState('');
  const chosen = applications.filter(a=>selected.includes(a.id));
  const jobId = jobFilter !== 'All' ? Number(jobFilter) : chosen.length && chosen.every(a=>a.job_id===chosen[0].job_id) ? chosen[0].job_id : null;
  const recipients = audience === 'selected' ? chosen : applications.filter(a=>a.job_id===jobId && (audience==='all' || a.status===audience));
  const start = key => {setAction(key); setError(''); setRequestId(crypto.randomUUID()); setAudience('selected');};
  const send = async () => {
    setBusy(true); setError('');
    try {
      if (action==='message') {
        if (!jobId) throw new Error('Select a job or applicants from a single job.');
        const payload={subject,message,request_id:requestId};
        if(audience==='selected') payload.application_ids=chosen.map(a=>a.id); else if(audience!=='all') payload.status=audience;
        const {data}=await api.post(`employer/jobs/${jobId}/messages/bulk/`,payload);
        toast.success(`Message sent in-app to ${data.recipients} applicants`, {description:data.email_queued?'Email delivery queued.':'Email is not configured; in-app delivery completed.'});
      } else {
        await api.post('employer/applications/bulk/',{application_ids:chosen.map(a=>a.id),action}); toast.success('Bulk action completed');
      }
      setAction(''); onChanged();
    } catch(err) {setError(err.response ? signupError(err) : err.message);} finally {setBusy(false);}
  };
  return <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-yellow-50 p-3"><span>{chosen.length} selected</span><DropdownMenu><DropdownMenuTrigger asChild><Button disabled={!chosen.length} variant="outline">Bulk actions</Button></DropdownMenuTrigger><DropdownMenuContent>{[['shortlisted','Shortlist & invite'],['interview_invited','Invite to interview'],['rejected','Reject']].map(([key,label])=><DropdownMenuItem key={key} onSelect={()=>start(key)}>{label}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu><Button variant="outline" disabled={!jobId} onClick={()=>start('message')}>Send bulk message</Button>
    <Dialog open={action==='message'} onOpenChange={open=>{if(!open&&!busy)setAction('');}}><DialogContent><DialogHeader><DialogTitle>Message applicants</DialogTitle><DialogDescription>{jobs.find(j=>j.id===jobId)?.title || 'Selected job'}. Review the audience before sending.</DialogDescription></DialogHeader><Select value={audience} onValueChange={value=>{setAudience(value);setRequestId(crypto.randomUUID());}}><SelectTrigger aria-label="Message audience"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="selected">Selected applicants</SelectItem><SelectItem value="all">All applicants for this job</SelectItem>{[...new Set(applications.filter(a=>a.job_id===jobId).map(a=>a.status))].map(status=><SelectItem key={status} value={status}>{status.replaceAll('_',' ')}</SelectItem>)}</SelectContent></Select><p>{recipients.length} recipients currently match. Status audiences are resolved when sent.</p><Input aria-label="Message subject" placeholder="Subject" maxLength={200} value={subject} onChange={e=>{setSubject(e.target.value);setRequestId(crypto.randomUUID());}} /><Textarea aria-label="Bulk message" placeholder="Message" maxLength={5000} value={message} onChange={e=>{setMessage(e.target.value);setRequestId(crypto.randomUUID());}} />{error&&<p role="alert" className="text-red-700">{error}</p>}<Button disabled={busy||!recipients.length||!subject.trim()||!message.trim()} onClick={send}>{busy?'Sending…':`Send to ${recipients.length} applicants`}</Button></DialogContent></Dialog>
    <AlertDialog open={!!action&&action!=='message'} onOpenChange={open=>{if(!open&&!busy)setAction('');}}><AlertDialogContent><AlertDialogTitle>Confirm bulk action</AlertDialogTitle><AlertDialogDescription>Apply {action.replaceAll('_',' ')} to {chosen.length} selected applicants? Shortlisting also sends an interview invitation. If any application is ineligible, none will be changed.</AlertDialogDescription>{error&&<p role="alert" className="text-red-700">{error}</p>}<div className="flex gap-3"><AlertDialogCancel asChild><Button variant="outline" disabled={busy}>Cancel</Button></AlertDialogCancel><Button disabled={busy} onClick={send}>{busy?'Saving…':'Confirm'}</Button></div></AlertDialogContent></AlertDialog>
  </div>;
}
