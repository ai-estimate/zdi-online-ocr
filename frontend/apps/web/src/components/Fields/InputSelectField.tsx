import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import styled from 'styled-components';
import classNames from 'classnames';

export const InputSelectField = React.memo((props: any) => {
  const {
    label,
    input,
    options,
    removeDot,
    readOnly,
    meta,
    showMessage,
    onChange,
    required,
    labelInside,
    ...resp
  } = props;
  const hasError = (meta.error || meta.submitError) && meta.touched;
  if (options?.length === 0) return null;

  if (labelInside) {
    return (
      <StyledFormControl fullWidth error={hasError} required={required}>
        <InputLabel
          className={input.value ? classNames('active') : ''}
          required={required}>
          {label}
        </InputLabel>
        <Select
          size="small"
          id="select-field"
          fullWidth
          label={label}
          value={input.value || ''}
          {...input}
          {...resp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            input.onChange(e);
            onChange?.(e);
          }}>
          {options?.map((item: any, index: number) => (
            <MenuItem
              dense
              key={index}
              value={item.value}
              data-testid={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {showMessage && (
          <FormHelperText>
            {(hasError && meta.error) || meta.submitError}
          </FormHelperText>
        )}
      </StyledFormControl>
    );
  }

  return (
    <>
      {label && (
        <InputLabel required={required}>{`${label} ${
          removeDot ? '' : ':'
        }`}</InputLabel>
      )}
      <FormControl fullWidth error={hasError} required={required}>
        <Select
          size="small"
          id="select-field"
          value={input.value || ''}
          {...input}
          {...resp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            input.onChange(e);
            onChange?.(e);
          }}
          inputProps={{readOnly: readOnly ? true : false}}>
          {options.map((item: any, index: number) => (
            <MenuItem
              dense
              key={index}
              value={item.value}
              data-testid={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
        {showMessage && (
          <FormHelperText>
            {(hasError && meta.error) || meta.submitError}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
});

const StyledFormControl = styled(FormControl)`
  && {
    .MuiFormLabel-root {
      &.MuiInputLabel-root {
        left: 16px;
        top: 10px;
        &.active {
          left: 16px;
          top: -8px;
          font-size: ${({theme}) => theme.typography.pxToRem(10)};
        }
      }
    }
  }
`;
