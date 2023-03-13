import React from 'react';
import {
  Stack,
  Radio,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import styled from 'styled-components';

export const InputRadioField = React.memo(
  ({label, input, disabled, readOnly, options}: any) => {
    const handleChange = (event: any) => {
      input.onChange(event.target.value);
    };

    return (
      <StyledWrapper direction="row" alignItems="center">
        <Typography variant="body2" className="text-label">
          {label}
        </Typography>
        {readOnly ? (
          <Typography variant="body2">{input.value}</Typography>
        ) : (
          <RadioGroup
            className="radio-group"
            value={input.value || ''}
            onChange={handleChange}>
            {options.map((option: any, i: number) => (
              <FormControlLabel
                key={i}
                disabled={disabled}
                value={option.value}
                control={<Radio size="small" />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      </StyledWrapper>
    );
  },
);
const StyledWrapper = styled(Stack)`
  && {
    .MuiRadio-root {
      padding: 5px;
      margin-right: 5px;
    }
    input {
      padding: 6px 14px;
    }
  }
`;
