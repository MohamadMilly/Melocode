import { LandingFeatures } from "../components/landing/LandingFeatures";
import { LandingHero } from "../components/landing/LandingHero";
import { LandingNav } from "../components/landing/LandingNav";

export function LandingPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden  text-[var(--gray-12)]"
    >  
      <LandingNav />
      <div className="mx-auto w-[min(1120px,calc(100%-2rem))] max-sm:w-[calc(100%-1.25rem)]">
        <LandingHero />
        <LandingFeatures />
      </div>
    </main>
  );
}
