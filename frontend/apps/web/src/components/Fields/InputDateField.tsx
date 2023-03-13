import React from 'react';
import {Stack, Typography, TextField} from '@mui/material';

export const InputDateField = React.memo((props: any) => {
  const {label, input, ...resp} = props;

  const handleChange = (event: any) => {
    input.onChange(event.target.value);
  };

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="body2" className="text-label">
        {label}:
      </Typography>
      <TextField
        {...input}
        {...resp}
        id="date"
        type="date"
        defaultValue="2022-02-24"
        readOnly
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
});
