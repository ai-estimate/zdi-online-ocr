import React from 'react';
import {Box, Stack, styled, Typography} from '@mui/material';
import ImproSvg from '@components/svgs/improment.svg';

export const AsideLoader: React.FC = React.memo(() => {
  return (
    <StackStyled
      component="aside"
      justifyContent="center"
      alignContent="center"
      flex={1}>
      <ImproSvgStyled>
        <ImproSvg />
      </ImproSvgStyled>
      <Typography>That’s quite an improvement!</Typography>
    </StackStyled>
  );
});

const StackStyled = styled(Stack)({height: 'auto', zIndex: 10, flex: 1});

const ImproSvgStyled = styled(Box)({
  svg: {
    width: '16rem !important',
    height: '16rem !important',
  },
});
