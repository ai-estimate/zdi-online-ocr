import React from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import {useAutoCompleteContext} from './Provider';

interface IProps {
  params: any;
}
export const TextFieldInput: React.FC<IProps> = React.memo((props) => {
  const {
    required,
    textInputProps,
    endAdornment,
    onChangeText,
    inputProps,
    loading,
  } = useAutoCompleteContext();
  const {label, placeholder, name} = inputProps;
  const {params} = props;
  return (
    <StyledTextField
      type="text"
      required={required}
      placeholder={placeholder || ''}
      {...textInputProps}
      {...params}
      name={name}
      label={label}
      onChange={onChangeText}
      size="medium"
      InputProps={{
        ...params.InputProps,
        autoComplete: 'off',
        type: 'text',
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {endAdornment(params.InputProps.endAdornment)}
          </React.Fragment>
        ),
      }}
    />
  );
});

const StyledTextField: any = styled(TextField)`
  && {
    .MuiInputBase-root {
      margin-top: ${({theme}) => theme.spacing(3)};
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding-left: ${({theme}) => theme.spacing(1)};
      min-height: 40px;
      .MuiInputBase-input {
        border-radius: 0px;
        border-width: 0px;
        padding: 0px !important;
        margin-top: 0px;
        &::placeholder {
          opacity: 0.6 !important;
        }
      }
    }
  }
`;
