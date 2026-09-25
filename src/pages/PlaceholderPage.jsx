import { Link } from "react-router-dom";
export default function PlaceholderPage({ title, description = "This page is coming soon. Contact GradLink for assistance." }) {
  return <main className="mx-auto w-full max-w-4xl px-6 py-12"><section className="rounded-xl border bg-white p-8"><h1 className="text-3xl font-bold">{title}</h1><p className="my-5 text-slate-600">{description}</p><Link className="text-yellow-700 underline" to="/contact">Contact GradLink</Link></section></main>;
}
