import { cn } from '@/lib/utils';
export function Textarea({className,...props}) { return <textarea data-slot="textarea" className={cn('min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50',className)} {...props} />; }
