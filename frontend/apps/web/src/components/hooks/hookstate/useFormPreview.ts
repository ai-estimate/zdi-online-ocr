import {useHookstate, hookstate} from '@hookstate/core';

const gFormPreview = hookstate({schema: null, show: false});

interface ISet {
  schema?: any;
  show: boolean;
}
export const useFormPreview = () => {
  const state = useHookstate(gFormPreview);

  const setState = (param: ISet) => {
    state.set((p) => ({...p, ...param}));
  };

  return [state.get(), setState] as const;
};
