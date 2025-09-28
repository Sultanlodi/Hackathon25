import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AlertTriangle, Target, TrendingUp, Gamepad2 } from "lucide-react";

export function ProblemSolutionSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Poor Financial Literacy",
      description: "Young adults lack basic money management skills"
    },
    {
      icon: AlertTriangle,
      title: "Hidden Banking Fees",
      description: "Lack of transparency in traditional banking"
    },
    {
      icon: AlertTriangle,
      title: "Savings Struggles",
      description: "Difficulty sticking to financial goals"
    },
    {
      icon: AlertTriangle,
      title: "Boring Financial Apps",
      description: "Current apps are transactional, not educational"
    }
  ];

  const solutions = [
    {
      icon: Target,
      title: "AI Financial Coach",
      description: "Personalized guidance and education",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Blockchain Transparency", 
      description: "Smart contracts and immutable records",
      color: "text-green-600"
    },
    {
      icon: Gamepad2,
      title: "Tokenized Rewards",
      description: "Gamified financial behavior incentives",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Micro-Investing",
      description: "Accessible, fractionalized investments",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="destructive" className="w-fit">
                The Problem
              </Badge>
              <h2 className="text-3xl lg:text-4xl">
                Young Adults Struggle with <span className="text-destructive">Money</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Traditional financial apps fail to educate and motivate users, 
                leaving them financially illiterate and unmotivated.
              </p>
            </div>

            <div className="space-y-4">
              {problems.map((problem, index) => (
                <Card key={index} className="border-destructive/20">
                  <CardContent className="flex items-center gap-4 p-4">
                    <problem.icon className="w-6 h-6 text-destructive flex-shrink-0" />
                    <div>
                      <h4 className="text-destructive">{problem.title}</h4>
                      <p className="text-sm text-muted-foreground">{problem.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1599585183326-87b1fff61c33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFkdWx0cyUyMG1vbmV5JTIwc2F2aW5nc3xlbnwxfHx8fDE3NTg5NTA3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Young adults struggling with finances"
                className="w-full h-64 object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Solution Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="default" className="w-fit bg-green-100 text-green-800">
                Our Solution
              </Badge>
              <h2 className="text-3xl lg:text-4xl">
                Smart <span className="text-primary">Wealth</span> Changes Everything
              </h2>
              <p className="text-lg text-muted-foreground">
                Combining AI coaching with blockchain transparency to create 
                an engaging, trustworthy financial education platform.
              </p>
            </div>

            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <Card key={index} className="border-primary/20 bg-primary/5">
                  <CardContent className="flex items-center gap-4 p-4">
                    <solution.icon className={`w-6 h-6 ${solution.color} flex-shrink-0`} />
                    <div>
                      <h4 className="text-primary">{solution.title}</h4>
                      <p className="text-sm text-muted-foreground">{solution.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1564707944519-7a116ef3841c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODg4MDY0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI Technology"
                className="w-full h-32 object-cover rounded-lg"
              />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1643449689391-f798261a16ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvY3VycmVuY3klMjBkaWdpdGFsfGVufDF8fHx8MTc1ODk1MDcxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Blockchain Technology"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}