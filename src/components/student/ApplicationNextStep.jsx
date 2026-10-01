import { useState } from 'react';
import api from '@/api/axios';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { signupError } from '@/lib/registration';

export default function ApplicationNextStep({ application, onChanged }) {
  const [open,setOpen]=useState(false); const [busy,setBusy]=useState(false); const [error,setError]=useState(''); const [updated,setUpdated]=useState(null);
  const current=updated || application;
  if (!current.interview_details && !current.offer_details) return null;
  const accept=async()=>{
    setBusy(true);setError('');
    try {const {data}=await api.post(`student/applications/${current.id}/action/`,{action:'accept_offer'});setUpdated(data);onChanged?.();}
    catch(err){setError(signupError(err));}finally{setBusy(false);}
  };
  return <><Button variant="outline" size="sm" onClick={()=>setOpen(true)}>Interview / offer</Button><Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogHeader><DialogTitle>{current.job_title}</DialogTitle><DialogDescription>Recruitment details from {current.company_name}.</DialogDescription></DialogHeader>{current.interview_details&&<div className="space-y-2"><p>Interview: {new Date(current.interview_details.interview_date).toLocaleString()}</p><p>{current.interview_details.location}</p>{current.interview_details.meeting_link&&<a className="text-yellow-700 underline" href={current.interview_details.meeting_link} target="_blank" rel="noreferrer">Open meeting link</a>}</div>}{current.offer_details&&<div className="space-y-3"><h3 className="font-semibold">Offer terms</h3><p className="whitespace-pre-wrap">{current.offer_details.terms}</p>{current.status==='offer'?<><p className="text-sm">Selecting Accept offer confirms your acceptance of these terms to the employer.</p><Button disabled={busy} onClick={accept}>{busy?'Saving…':'Accept offer'}</Button></>:current.offer_details.accepted_at&&<p>Offer accepted.</p>}</div>}{error&&<p role="alert" className="text-red-700">{error}</p>}</DialogContent></Dialog></>;
}
