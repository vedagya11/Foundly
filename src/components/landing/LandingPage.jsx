import React from 'react';
import HeroSection from './HeroSection';
import ProblemSection from './ProblemSection';
import FlowSection from './FlowSection';
import EvidenceSection from './EvidenceSection';
import PlatformSection from './PlatformSection';
import ComparisonSection from './ComparisonSection';
import FinalCTASection from './FinalCTASection';

export default function LandingPage({
  onNavigateToDiscovery,
  onOpenOnboarding
}) {
  return (
    <div className="landing-container">
      {/* Section 1: Hero */}
      <HeroSection 
        onOpenOnboarding={onOpenOnboarding} 
        onExplore={onNavigateToDiscovery} 
      />

      {/* Section 2: The Visibility Problem */}
      <ProblemSection />

      {/* Section 3: How Foundly Works */}
      <FlowSection />

      {/* Section 4: Built Around Evidence */}
      <EvidenceSection />

      {/* Section 5 & 6: For Talent & For Opportunity Providers */}
      <PlatformSection 
        onOpenOnboarding={onOpenOnboarding}
        onDiscoverTalent={onNavigateToDiscovery}
      />

      {/* Section 7: Why Foundly */}
      <ComparisonSection />

      {/* Final CTA */}
      <FinalCTASection 
        onOpenOnboarding={onOpenOnboarding}
      />
    </div>
  );
}
