import CareerHero from "../career/CareerHero";
import BlogCard from "./BlogCard";

const blogPosts = [
  {
    id: 1,
    title: "Oil & Gas Careers in Ghana: Getting Into Tullow Oil and GNPC",
    description:
      "Ghana's offshore oil industry offers some of the most lucrative graduate opportunities in the country. Here's your guide to breaking in.",
    date: "Apr 21, 2026",
    readTime: "9 min read",
  },
  {
    id: 2,
    title: "CV Writing Tips for Fresh Ghanaian Graduates",
    description:
      "A well-crafted CV can make the difference between getting an interview and being overlooked. Here's how to write a CV that stands out.",
    date: "Apr 26, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Mining Industry Careers in Ghana: A Complete Guide for 2026",
    description:
      "Ghana is one of Africa's top gold producers. Here's what you need to know to build a career in mining at Newmont, AngloGold, and others.",
    date: "May 1, 2026",
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Understanding National Service in Ghana: Opportunities and Benefits",
    description:
      "National service is a mandatory requirement for Ghanaian graduates. But it can also be a launchpad for your career if you choose wisely.",
    date: "May 3, 2026",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Preparing for Psychometric Tests at Ghana's Top Companies",
    description:
      "MTN, GCB Bank, Stanbic and other leading employers use psychometric tests to screen candidates. Here's how to prepare and pass them.",
    date: "May 7, 2026",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "How to Land Your First Graduate Job in Ghana's Banking Sector",
    description:
      "The banking sector remains one of the most competitive yet rewarding career paths for Ghanaian graduates. Here's your complete guide to getting hired.",
    date: "May 12, 2026",
    readTime: "9 min read",
  },
];

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