import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './../store';
import {TData} from './../types';

export interface IState {
  feature: TData | null;
}

const initialState: IState = {
  feature: null,
};
const featureFormSlice = createSlice({
  name: 'featureForm',
  initialState,
  reducers: {
    setSelectedFeature(state, action: PayloadAction<TData | null>) {
      state.feature = action.payload;
    },
  },
});

export const {setSelectedFeature} = featureFormSlice.actions;
export const selectedFeature = ({featureForm}: RootState) =>
  featureForm.feature;

export default featureFormSlice.reducer;
