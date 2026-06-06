import { Link } from "react-router-dom";
import { ChevronLeft, Calendar, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const ArticleDetails = () => {
  const tags = ["Career Advice", "CV", "resume", "job application", "tips"];

  return (
    <main className="min-h-screen bg-[#f6f8fa]">
      <section className="max-w-6xl px-6 py-12">
        {/* Back link */}
        <Link
          to="/career-advice"
          className="inline-flex items-center gap-2 text-lg text-slate-500 hover:text-slate-900 transition"
        >
          <ChevronLeft className="h-5 w-5" />
          Back to all articles
        </Link>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {tags.map((tag, index) => (
            <Badge
              key={tag}
              variant={index === 0 ? "default" : "outline"}
              className={
                index === 0
                  ? "rounded-full bg-slate-950 px-4 py-1.5 text-sm text-white hover:bg-slate-950"
                  : "rounded-full bg-white px-4 py-1.5 text-sm font-normal text-slate-700"
              }
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="mt-10 max-w-5xl text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-950">
          CV Writing Tips for Fresh Ghanaian Graduates
        </h1>

        <Separator className="my-12 bg-slate-200" />

        {/* Author and meta */}
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Author */}
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 bg-slate-100">
              <AvatarFallback className="bg-slate-100 text-slate-950 text-lg">
                S
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Sandra Owusu
              </h3>
              <p className="text-sm text-slate-500">Expert Contributor</p>
            </div>
          </div>

          <div className="hidden md:block h-14 w-px bg-slate-200" />

          {/* Date */}
          <div className="flex items-center gap-3 text-slate-500">
            <Calendar className="h-5 w-5" />
            <span className="text-lg">April 26, 2026</span>
          </div>

          {/* Read time */}
          <div className="flex items-center gap-3 text-slate-500">
            <Clock className="h-5 w-5" />
            <span className="text-lg">7 min read</span>
          </div>
        </div>

        <Separator className="my-10 bg-slate-200" />

        {/* Intro Quote */}
        <blockquote className="ml-10 max-w-5xl border-l-4 border-yellow-500 pl-8">
          <p className="text-2xl md:text-3xl italic leading-relaxed text-slate-500">
            A well-crafted CV can make the difference between getting an
            interview and being overlooked. Here&apos;s how to write a CV that
            stands out.
          </p>
        </blockquote>

        {/* Article Content */}
        <article className="mt-12 ml-10 max-w-4xl text-xl leading-relaxed text-slate-800">
          <p>Full article content here...</p>
        </article>
      </section>
    </main>
  );
};

export default ArticleDetails;