"use client";

import React, { useState } from 'react';
import { Navigation, TopBar } from '@/components/landing';
import { HeroSection } from '@/components/landing/hero/HeroSection';
import { FeaturesSection } from '@/components/landing/features/FeaturesSection';
import { MarketContextSection } from '@/components/landing/market-context/MarketContextSection';
import { HowItWorksSection } from '@/components/landing/how-it-works/HowItWorksSection';
import { TestimonialsSection } from '@/components/landing/testimonials/TestimonialsSection';
import { PricingSection } from '@/components/landing/pricing/PricingSection';
import { FaqSection } from '@/components/landing/faq/FaqSection';
import { CtaSection } from '@/components/landing/cta/CtaSection';
import { FooterSection } from '@/components/landing/footer/FooterSection';

export default function LandingPage() {
  const [topBarVisible, setTopBarVisible] = useState(true);

  return (
    <div className="min-h-screen bg-white">
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

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* CTA Section */}
      <div style={{
        background: 'radial-gradient(ellipse at top left, #4c1d95 0%, #1e1b4b 50%, #000 100%)',
      }}>
        <CtaSection />
      <FooterSection />

      </div>

      {/* Footer Section */}
    </div>
  );
}