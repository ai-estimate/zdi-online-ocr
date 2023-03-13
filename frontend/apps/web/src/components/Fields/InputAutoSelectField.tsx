import React from 'react';
import {
  Stack,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  MenuItem,
} from '@mui/material';

import styled from 'styled-components';

export const InputAutoSelectField = React.memo((props: any) => {
  const {
    label,
    size,
    multi,
    placeholder,
    input,
    options,
    onInputChange,
    onChange,
    defaultVal,
  } = props;
  const handleChange = async (e: any, newValue: any) => {
    input.onChange(newValue);
    onChange && onChange(newValue);
  };

  const isMulti = typeof multi !== 'undefined' ? multi : false;
  const defaultValue =
    typeof defaultVal !== 'undefined' ? defaultVal : isMulti ? [] : '';
  return (
    <StyledWrapper>
      {label && (
        <Typography
          variant="body2"
          sx={{
            display: 'flex',
            flex: '1',
            paddingBottom: '4px',
            fontSize: '14px',
          }}
          className="label">
          {label}
        </Typography>
      )}
      <Autocomplete
        multiple={isMulti}
        fullWidth
        size={size || 'medium'}
        onChange={handleChange}
        options={options}
        onInputChange={onInputChange}
        defaultValue={defaultValue}
        isOptionEqualToValue={(option: any, value: any) =>
          option.id === value.id
        }
        getOptionLabel={(option: any) => option?.name}
        renderOption={(props: any, option: any) => (
          <MenuItem dense {...props}>
            {option.name}
          </MenuItem>
        )}
        renderInput={(params: any) => (
          <TextField {...params} placeholder={placeholder} />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option: any, index: number) => (
            <Chip
              {...getTagProps({index})}
              key={index}
              size={size || 'medium'}
              variant="outlined"
              label={<Typography variant="body2">{option.name}</Typography>}
            />
          ))
        }
      />
    </StyledWrapper>
  );
});

const StyledWrapper = styled(Stack)`
  && {
    .MuiOutlinedInput-root {
      border-radius: 2px !important;
    }
  }
`;
