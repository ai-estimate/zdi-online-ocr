import React from 'react';
import {TextField} from '@mui/material';

export const RenderTextInput = React.memo((props: any) => {
  const {
    input,
    label,
    placeholder,
    type,
    meta,
    password,
    variant,
    readOnly,
    ...resp
  } = props;
  const hasError = (meta.error || meta.submitError) && meta.touched;
  return (
    <TextField
      {...input}
      {...resp}
      size="small"
      label={label}
      placeholder={placeholder}
      value={input.value || ''}
      error={hasError}
      helperText={(hasError && meta.error) || meta.submitError}
      InputProps={{
        'data-testid': input.name,
        testmessage: meta.error || meta.submitError,
        readOnly: readOnly,
      }}
      sx={{
        '& .MuiInputBase-input': {
          backgroundColor: !readOnly && '#FFFFFF !important',
        },
      }}
    />
  );
});
