import React from 'react';
import {Stack} from '@mui/material';
import dynamic from 'next/dynamic';

const PricingTable = dynamic(
  () => import('@components/Pricing').then(({PricingTable}) => PricingTable),
  {ssr: false},
);

export const Plan: React.FC = () => {
  return (
    <Stack pt={2} pb={2} bgcolor={'#f1f3f4'}>
      <PricingTable />
    </Stack>
  );
};
