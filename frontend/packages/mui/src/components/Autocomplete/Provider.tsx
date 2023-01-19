import React, {useContext, useEffect} from 'react';
import {IProps} from './types';
import {debounce, isEmpty, isEqual} from 'lodash';
import {usePrevious} from '../../hooks';
import {TData} from '../../types';

interface IContextType {
  textInputProps: TData;
  endAdornment(endAdornment: any): any;
  autoProps: TData;
  options: any[];
  loading: boolean;
  onChange: (value: any, opt: any) => void;
  onChangeText: (value: any) => void;
  inputProps: TData;
  multiple: boolean;
  required?: boolean;
}

const AutoCompleteContext = React.createContext<IContextType>(
  {} as IContextType,
);

export const useAutoCompleteContext = () => useContext(AutoCompleteContext);

interface IProviderProps extends IProps {
  children: React.ReactNode;
}

const gClicks: any = {};
export const AutoCompleteProvider: React.FC<IProviderProps> = React.memo(
  (props) => {
    const {
      options,
      onSearch,
      onSelect,
      multiple = true,
      defaultValue,
      loading,
      inputProps,
      required,
    } = props;

    const {name} = inputProps;
    const [value, setValue] = React.useState(undefined);
    const [selectValue, setSelectValue] = React.useState(null);

    const onChangeText = (event: any) => {
      setValue(event.target.value);
      debounce(() => {
        onSearch(event.target.value);
      }, 350)();
    };

    const onChange = (e: any, selectOption: any) => {
      if (selectOption) {
        const data = selectOption?.length > 0 ? selectOption[0] : selectOption;
        if (data?.length !== 0) {
          onSelect?.(data);
        }
        if (multiple) {
          console.log('gClicks[name]::: ', gClicks[name], name);
          setTimeout(() => {
            gClicks[name]?.(e);
          }, 60);
        }
      }
    };

    const RenderEndAdornment = (endAdornment: any) => {
      if (!multiple) return endAdornment;
      try {
        const onClick = endAdornment.props?.children[0]?.props?.onClick;
        if (!gClicks[name]) {
          gClicks[name] = onClick;
        }
      } catch (error) {}
      return endAdornment;
    };

    let autoExtra: any = {};
    let _textProps: any = {};

    if (multiple) {
      _textProps.value = value;
    } else {
      autoExtra = {value: selectValue || null};
    }

    const items: IContextType = {
      textInputProps: _textProps,
      endAdornment: RenderEndAdornment,
      autoProps: autoExtra,
      options,
      loading,
      onChange,
      onChangeText,
      inputProps,
      required,
      multiple,
    };

    const _selectedValue = cleanDefaultValue(defaultValue);
    const oldDefaultValue = usePrevious(_selectedValue);

    useEffect(() => {
      if (!isEqual(oldDefaultValue, _selectedValue)) {
        setSelectValue(_selectedValue);
      }
    }, [_selectedValue, oldDefaultValue]);

    return (
      <AutoCompleteContext.Provider value={items}>
        {props.children}
      </AutoCompleteContext.Provider>
    );
  },
);

const cleanDefaultValue = (value: any) => {
  if (!value || isEmpty(value)) return null;
  const _value = {label: value.name, value: value.id, ...value};
  return _value;
};
