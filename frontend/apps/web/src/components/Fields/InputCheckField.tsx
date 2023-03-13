import React from 'react';
import {Stack, Checkbox, FormControlLabel} from '@mui/material';

export const InputCheckField = React.memo(
  ({label, input, form, mainCode, onChange}: any) => {
    const handleChange = (event: any) => {
      onChange && onChange(event.target.checked);
      input.onChange(event.target.checked);
      if (event.target.checked && mainCode) {
        form && form.change(`permissions.${mainCode}`, true);
      }
    };
    return (
      <Stack direction="row" alignItems="center">
        <Stack>
          <FormControlLabel
            control={
              <Checkbox
                {...input}
                checked={input.value || false}
                size="small"
                onChange={handleChange}
              />
            }
            label={label || ''}
          />
        </Stack>
      </Stack>
    );
  },
);
