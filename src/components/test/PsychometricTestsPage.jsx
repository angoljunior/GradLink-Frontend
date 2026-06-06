import { Brain, CircleHelp } from "lucide-react";

import TestsHero from "./TestsHero";
import TestCard from "./TestCard";

const tests = [
  {
    id: 1,
    title: "Numerical Reasoning Test",
    description:
      "Test your ability to interpret numerical data, graphs, and tables. Used by top employers including banks and mining companies.",
    duration: "25 mins",
    questions: "15 questions",
    difficulty: "medium",
    icon: Brain,
  },
  {
    id: 2,
    title: "Verbal Reasoning Test",
    description:
      "Assess your comprehension, vocabulary, and logical reasoning with written text. Essential for management and communications...",
    duration: "30 mins",
    questions: "15 questions",
    difficulty: "medium",
    icon: CircleHelp,
  },
  {
    id: 3,
    title: "Logical Reasoning Test",
    description:
      "Evaluate your ability to identify patterns, complete sequences, and solve abstract problems. Used by technology and consultin...",
    duration: "20 mins",
    questions: "10 questions",
    difficulty: "hard",
    icon: Brain,
  },
];

const PsychometricTestsPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <TestsHero />

      <section className="max-w-7xl mx-auto px-6 -mt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PsychometricTestsPage;