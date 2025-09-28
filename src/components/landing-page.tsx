import { CTASection } from "./cta-section";
import { FeaturesSection } from "./features-section";
import { HeroSection } from "./hero-section";
import { ProblemSolutionSection } from "./problem-solution-section";
import { UserJourneySection } from "./user-journey-section";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <HeroSection onNavigate={onNavigate} />
        <FeaturesSection />
        <ProblemSolutionSection />
        <UserJourneySection />
        <CTASection onNavigate={onNavigate} />
      </main>
    </div>
  );
}