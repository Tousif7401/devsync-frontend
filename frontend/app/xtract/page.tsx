'use client';

import XtractNavigation from '@/components/xtract/XtractNavigation';
import XtractHero from '@/components/xtract/XtractHero';
import XtractServices from '@/components/xtract/XtractServices';
import XtractProcess from '@/components/xtract/XtractProcess';
import XtractCaseStudies from '@/components/xtract/XtractCaseStudies';
import XtractBenefits from '@/components/xtract/XtractBenefits';
import XtractPricing from '@/components/xtract/XtractPricing';
import XtractTestimonials from '@/components/xtract/XtractTestimonials';
import XtractFAQ from '@/components/xtract/XtractFAQ';
import XtractCTA from '@/components/xtract/XtractCTA';
import XtractFooter from '@/components/xtract/XtractFooter';

export default function XtractPage() {
  return (
    <main className="min-h-screen bg-xtractBg">
      <XtractNavigation />
      <XtractHero />
      <XtractServices />
      <XtractProcess />
      <XtractCaseStudies />
      <XtractBenefits />
      <XtractPricing />
      <XtractTestimonials />
      <XtractFAQ />
      <XtractCTA />
      <XtractFooter />
    </main>
  );
}
