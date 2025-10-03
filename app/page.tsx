"use client";

import React, { useState } from 'react';
import { Navigation, TopBar } from '@/components/landing';
import { HeroSection } from '@/components/landing/hero/HeroSection';
import { FeaturesSection } from '@/components/landing/features/FeaturesSection';
import { MarketContextSection } from '@/components/landing/market-context/MarketContextSection';
import { HowItWorksSection } from '@/components/landing/how-it-works/HowItWorksSection';
import { WaitlistSection } from '@/components/landing/waitlist/WaitlistSection';
import { PricingSection } from '@/components/landing/pricing/PricingSection';
import { FaqSection } from '@/components/landing/faq/FaqSection';
import { CtaSection } from '@/components/landing/cta/CtaSection';
import { FooterSection } from '@/components/landing/footer/FooterSection';
import { BackToTop } from '@/components/landing/back-to-top/BackToTop';

export default function LandingPage() {
  const [topBarVisible, setTopBarVisible] = useState(true);

  return (
    <div className="min-h-screen bg-black">
      {/* Top Offer Bar */}
      <TopBar onClose={() => setTopBarVisible(false)} />
      
      {/* Navigation */}
      <Navigation topBarVisible={topBarVisible} />
      
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
     
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Market Context Section */}
      <MarketContextSection />
      
      {/* Magic Tools Section 
      <MagicToolsSection />
      */}
      <HowItWorksSection />

      

      {/* Pricing Section */}
      <PricingSection />
{/* Waitlist Section */}
<WaitlistSection />
      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <CtaSection />
      
      {/* Footer Section */}
      <FooterSection />

      {/* Back to Top Button - Mobile Only */}
      <BackToTop />
    </div>
  );
}