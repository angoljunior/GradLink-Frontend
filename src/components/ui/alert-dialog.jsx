import { AlertDialog as Primitive } from 'radix-ui';
export function AlertDialog(props) { return <Primitive.Root {...props} />; }
export function AlertDialogTitle(props) { return <Primitive.Title {...props} />; }
export function AlertDialogDescription(props) { return <Primitive.Description {...props} />; }
export function AlertDialogCancel(props) { return <Primitive.Cancel {...props} />; }
export function AlertDialogAction(props) { return <Primitive.Action {...props} />; }
export function AlertDialogContent({ children }) {
  return <Primitive.Portal><Primitive.Overlay className="fixed inset-0 z-50 bg-black/50" /><Primitive.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-xl border bg-background p-6 shadow-lg">{children}</Primitive.Content></Primitive.Portal>;
}
