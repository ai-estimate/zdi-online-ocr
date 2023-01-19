import {TData} from '../../types';

interface IOptions {
  label: string;
  value: string;
  [key: string]: any;
}
interface InputProps {
  label: string;
  placeholder?: string;
  name: string;
}
export interface IProps {
  inputProps: InputProps;
  options: IOptions[];
  loading: boolean;
  onSearch: (value: string) => void;
  onSelect: (value: TData) => void;
  required?: boolean;
  multiple?: boolean;
  defaultValue?: IOptions;
}
