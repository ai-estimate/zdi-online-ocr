import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

export const Loader = React.memo(() => {
  return (
    <StyledLoading>
      <CircularProgress color="primary" />
      <span>Loading...</span>
    </StyledLoading>
  );
});

const StyledLoading = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 15px;
  padding-top: 15px;
  flex: 1;
  span {
    margin-top: 10px;
    font-size: 10px;
  }
`;
