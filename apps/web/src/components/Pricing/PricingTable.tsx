import React from 'react';
import {Container} from '@mui/material';
import {useRouter} from 'next/router';

const priceList = [
  {
    title: 'Basic',
    price: 0,
    for: 'personal',
    features: [
      '1 page per upload',
      '10 limit per month',
      'Local Storage',
      'Email Support',
      'Slow Speed',
    ],
  },
  {
    title: 'Standard',
    price: 1,
    for: 'business',
    features: [
      '2 pages per upload',
      '200 limit per month',
      'Local Storage',
      'Priority Email Support',
      'Normal Speed',
    ],
  },
  {
    title: 'Premium',
    price: 5,
    for: 'business',
    features: [
      '5 pages per upload',
      '500 limit per month',
      'Local Storage',
      'Priority Email Support',
      'Fast Speed',
    ],
  },
];

export const PricingTable: React.FC = () => {
  const router = useRouter();

  return (
    <Container maxWidth="lg">
      <section className="relative z-20 overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
        <div className="container mx-auto">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
              <h2 className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
                Our Pricing Plan
              </h2>
            </div>
          </div>

          <div className="mx-4 flex flex-wrap justify-center">
            {priceList.map((item, index) => (
              <div key={index} className="w-full px-4 md:w-1/2 lg:w-1/3 px-3">
                <div className="border-primary hover:border-[blue] shadow-pricing relative z-10 mb-10 overflow-hidden rounded-xl border border-opacity-20 bg-white py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12">
                  <span className="text-primary mb-4 block text-lg font-semibold">
                    {item.title}
                  </span>
                  <h2 className="text-dark mb-5 text-[42px] font-bold">
                    ${item.price}
                    <span className="text-body-color text-base font-medium">
                      {' '}
                      / month{' '}
                    </span>
                  </h2>
                  <p className="text-body-color mb-8 border-b border-[#F2F2F2] pb-8 text-base">
                    Perfect for using in {item.for}
                  </p>
                  <div className="mb-7">
                    {item.features.map((feature, index) => (
                      <p
                        key={index}
                        className="text-body-color mb-1 text-base font-medium">
                        {feature}
                      </p>
                    ))}
                  </div>
                  <button
                    // onClick={() => router.push('/')}
                    className="text-primary hover:bg-[blue] hover:border-primary block w-full rounded-md border border-[#D4DEFF] bg-transparent p-4 text-center text-base font-semibold transition hover:text-[white] hover:bg-opacity-90">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};
