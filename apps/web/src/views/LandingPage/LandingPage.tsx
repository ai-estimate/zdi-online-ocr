import React from 'react';
import {Hero, Plans, Footer, HowItWorks} from '@components/LandingPage';

export const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <Plans />
      <HowItWorks />
      <section className="pt-12 bg-gray-100 pb-7 lg:pb-8 lg:pt-16 xl:pt-8">
        <div className="container px-5 mx-auto">
          <Footer />
        </div>
      </section>
    </>
  );
};
