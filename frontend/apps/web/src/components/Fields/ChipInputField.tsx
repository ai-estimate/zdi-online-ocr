import React from 'react';
import {Stack, Typography, TextField, Autocomplete, Chip} from '@mui/material';
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';

export const ChipInputField = React.memo((props: any) => {
  const {label, readOnly, input, meta, removeDot} = props;
  const hasError = (meta.error || meta.submitError) && meta.touched;
  const handleChange = (event: any, newValue: string) => {
    input.onChange(newValue);
  };

  return (
    <Stack flex="1" direction="column" className="text-label-direction">
      {label && (
        <Typography variant="body2" className="text-label">
          {`${label} ${removeDot ? '' : ':'}`}
        </Typography>
      )}
      <Stack flex="1">
        <StyledAutocomplete
          multiple
          fullWidth
          id="tags-map"
          data-testid="tags-map"
          options={[]}
          value={input.value || []}
          freeSolo
          readOnly={readOnly}
          onChange={handleChange}
          renderTags={(
            value: any[],
            getTagProps: (arg0: {index: any}) => JSX.IntrinsicAttributes,
          ) =>
            value.map((option: any, index: any) => {
              return (
                <Chip
                  deleteIcon={<ClearIcon />}
                  key={index}
                  label={option}
                  {...getTagProps({index})}
                />
              );
            })
          }
          renderInput={(params: any) => (
            <TextField
              {...params}
              error={hasError}
              fullWidth
              readOnly={readOnly}
              // helperText={(hasError && meta.error) || meta.submitError}
            />
          )}
        />
      </Stack>
    </Stack>
  );
});
const StyledAutocomplete = styled(Autocomplete)`
  && {
  }
`;
