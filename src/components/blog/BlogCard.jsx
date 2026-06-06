import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";

const BlogCard = ({ post }) => {
  return (

    <Link to={`/career-advice/${post.id}`}>
        <Card className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-yellow-100 via-slate-100 to-emerald-100" />

      <CardContent className="p-6">
        <h3 className="text-xl font-bold leading-snug text-slate-950">
          {post.title}
        </h3>

        <p className="mt-5 text-sm leading-relaxed text-slate-500">
          {post.description}
        </p>

        <div className="mt-7 flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>


    
  );
};

export default BlogCard;