import {useReducer} from 'react';
import {TData} from '@types';

const useStates = (initState = {}) => {
  const [state, setState] = useReducer(
    (state: TData, newState: TData): TData => {
      return {...state, ...newState};
    },
    initState,
  );

  return [state, setState] as const;
};

export default useStates;
