import { useParams, Link } from "react-router-dom";
import ArticleDetails from "@/components/blog/ArticleDetails";
import { blogPosts, articleSlug } from "@/components/blog/articles";
import PlaceholderPage from "./PlaceholderPage";

export default function ArticleDetailsPage() {
  const { slug } = useParams();
  const post = blogPosts.find((post) => articleSlug(post) === slug || String(post.id) === slug);
  if (!post) return <PlaceholderPage title="Article not found" />;
  if (post.id === 2) return <ArticleDetails />;
  return <main className="mx-auto max-w-4xl px-6 py-12"><Link to="/career-advice" className="text-yellow-700 underline">Back to all articles</Link><h1 className="my-6 text-3xl font-bold">{post.title}</h1><p>{post.description}</p><p className="mt-6 text-slate-500">The full article is coming soon.</p></main>;
}
