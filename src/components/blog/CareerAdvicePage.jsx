import { useEffect, useState } from "react";
import api from "@/api/axios";
import CareerHero from "../career/CareerHero";
import BlogCard from "./BlogCard";
import { blogPosts } from "./articles";

export default function CareerAdvicePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    api.get("blogs/", { signal: controller.signal }).then(({ data }) => {
      setPosts((data.results || data).map((post) => ({ ...post, id: `published-${post.id}`, description: post.content.slice(0, 180), date: new Date(post.created_at).toLocaleDateString(), readTime: `${Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read` })));
      setError(false);
    }).catch((err) => { if (err.code !== "ERR_CANCELED") setError(true); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [revision]);
  return <div className="min-h-screen bg-[#f6f8fa]"><CareerHero /><section className="mx-auto max-w-7xl px-6 py-12">{loading && <p role="status" className="mb-4 text-slate-500">Loading the latest articles…</p>}{error && <p role="alert" className="mb-4 text-slate-500">Latest articles could not be loaded. <button className="underline" onClick={() => setRevision((n) => n + 1)}>Retry</button></p>}<div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">{[...posts, ...blogPosts].map((post) => <BlogCard key={post.id} post={post} />)}</div></section></div>;
}
