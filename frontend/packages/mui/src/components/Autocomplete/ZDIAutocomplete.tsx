import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {TextFieldInput} from './TextFieldInput';
import {IProps} from './types';
import {AutoCompleteProvider, useAutoCompleteContext} from './Provider';

export const ZDIAutocomplete: React.FC<IProps> = React.memo((props) => {
  const {required, inputProps, multiple, ...res} = props;

  return (
    <AutoCompleteProvider
      {...res}
      inputProps={inputProps}
      multiple={multiple}
      required={required}>
      <RenderComponent />
    </AutoCompleteProvider>
  );
});

const RenderComponent: React.FC = React.memo((props) => {
  const {onChange, options, multiple, autoProps, loading, inputProps} =
    useAutoCompleteContext();
  const {name} = inputProps;
  return (
    <ZDIAutocompleteContent
      onChange={onChange}
      name={name}
      autoProps={autoProps}
      multiple={multiple}
      options={options}
      loading={loading}
    />
  );
});

const ZDIAutocompleteContent: React.FC<any> = React.memo((props) => {
  const {onChange, name, autoProps, loading, options} = props;

  return (
    <Autocomplete
      {...autoProps}
      size="medium"
      id={`id_${name}`}
      getOptionLabel={(option: any) => option?.label || option?.name || ''}
      isOptionEqualToValue={(option: any, value: any) =>
        option?.value === value?.value
      }
      options={options}
      loading={loading}
      onChange={onChange}
      renderInput={(params) => <TextFieldInput params={params} />}
    />
  );
});
