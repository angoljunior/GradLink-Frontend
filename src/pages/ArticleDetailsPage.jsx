import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/api/axios";
import ArticleDetails from "@/components/blog/ArticleDetails";
import { blogPosts, articleSlug } from "@/components/blog/articles";
import PlaceholderPage from "./PlaceholderPage";

export default function ArticleDetailsPage() {
  const { slug } = useParams();
  return <Article key={slug} slug={slug} />;
}
function Article({ slug }) {
  const [state, setState] = useState({ loading: true });
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    api.get(`blogs/${encodeURIComponent(slug)}/`, { signal: controller.signal }).then(({ data }) => setState({ post: data })).catch((err) => { if (err.code !== "ERR_CANCELED") setState({ error: err.response?.status === 404 ? "missing" : "connection" }); });
    return () => controller.abort();
  }, [slug, revision]);
  if (state.loading) return <p role="status" className="p-12 text-center">Loading article…</p>;
  if (state.post) return <main className="mx-auto max-w-4xl px-6 py-12"><Link to="/career-advice" className="text-yellow-700 underline">Back to all articles</Link><h1 className="my-6 text-3xl font-bold">{state.post.title}</h1><p className="mb-6 text-sm text-slate-500">{new Date(state.post.created_at).toLocaleDateString()}</p>{state.post.featured_image && <img className="mb-8 max-h-96 w-full rounded-xl object-cover" src={state.post.featured_image} alt="" />}<div className="whitespace-pre-wrap break-words leading-relaxed">{state.post.content}</div></main>;
  const post = blogPosts.find((post) => articleSlug(post) === slug || String(post.id) === slug);
  if (post?.id === 2) return <ArticleDetails />;
  if (post) return <main className="mx-auto max-w-4xl px-6 py-12"><Link to="/career-advice" className="text-yellow-700 underline">Back to all articles</Link><h1 className="my-6 text-3xl font-bold">{post.title}</h1><p>{post.description}</p><p className="mt-6 text-slate-500">The full article is coming soon.</p></main>;
  if (state.error === "connection") return <div role="alert" className="p-12 text-center">Unable to load this article. <button className="underline" onClick={() => setRevision((n) => n + 1)}>Retry</button></div>;
  return <PlaceholderPage title="Article not found" />;
}
