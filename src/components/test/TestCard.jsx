import {
  Brain,
  CircleHelp,
  Clock,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TestCard = ({ test }) => {
  const Icon = test.icon;

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-8">
        {/* Icon and difficulty */}
        <div className="flex items-start justify-between">
          <div className="h-14 w-14 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Icon className="h-7 w-7 text-yellow-600" />
          </div>

          <Badge
            className={
              test.difficulty === "hard"
                ? "bg-red-50 text-red-600 hover:bg-red-50 rounded-full px-4"
                : "bg-blue-50 text-blue-600 hover:bg-blue-50 rounded-full px-4"
            }
          >
            {test.difficulty}
          </Badge>
        </div>

        {/* Content */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-slate-950">
            {test.title}
          </h3>

          <p className="mt-3 text-base text-slate-500 leading-relaxed">
            {test.description}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-7 flex items-center gap-8 text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{test.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            <CircleHelp className="h-5 w-5" />
            <span>{test.questions}</span>
          </div>
        </div>

        {/* Button */}
        <Button className="mt-8 w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black text-base font-medium rounded-lg">
          Start Test
          <ArrowRight className="ml-3 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TestCard;