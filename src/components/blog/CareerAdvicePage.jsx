import CareerHero from "../career/CareerHero";
import BlogCard from "./BlogCard";

import { blogPosts } from "./articles";

const CareerAdvicePage = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <CareerHero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CareerAdvicePage;