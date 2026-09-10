import { useState } from 'react';
import GalaxyBackground from '@/components/galaxy/GalaxyBackground';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import CompanyProfile from '@/components/sections/CompanyProfile';
import OurFocus from '@/components/sections/OurFocus';
import WhoWeServe from '@/components/sections/WhoWeServe';
import OurServices from '@/components/sections/OurServices';
import HealthCheck from '@/components/sections/HealthCheck';
import OnboardingProcess from '@/components/sections/OnboardingProcess';
import OurApproach from '@/components/sections/OurApproach';
import ValueProposition from '@/components/sections/ValueProposition';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import RegulatoryFramework from '@/components/sections/RegulatoryFramework';
import ProfessionalBoundaries from '@/components/sections/ProfessionalBoundaries';
import OurCommitment from '@/components/sections/OurCommitment';
import ContactFooter from '@/components/sections/ContactFooter';
import DraggableFloatingButton from '@/components/service-request/DraggableFloatingButton';
import ServiceRequestModal from '@/components/service-request/ServiceRequestModal';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated galaxy background — fixed, behind everything */}
      <GalaxyBackground />

      {/* Sticky navbar */}
      <Navbar />

      {/* Page content — sits above the canvas */}
      <div className="relative z-10">
        <HeroSection />
        <CompanyProfile />
        <OurFocus />
        <WhoWeServe />
        <OurServices />
        <HealthCheck />
        <OnboardingProcess />
        <OurApproach />
        <ValueProposition />
        <WhyChooseUs />
        <RegulatoryFramework />
        <ProfessionalBoundaries />
        <OurCommitment />
        <ContactFooter />
      </div>

      {/* Draggable floating action button */}
      <DraggableFloatingButton onClick={() => setModalOpen(true)} />

      {/* Service request modal */}
      <ServiceRequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
