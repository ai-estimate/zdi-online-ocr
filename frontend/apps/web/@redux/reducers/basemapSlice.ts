import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './../store';
import {TData} from './../types';

export interface IState {
  data: TData | null;
}

const initialState: IState = {
  data: null,
};
const basemapSlice = createSlice({
  name: 'basemap',
  initialState,
  reducers: {
    setBasemap(state, action: PayloadAction<TData | null>) {
      state.data = action.payload;
    },
  },
});

export const {setBasemap} = basemapSlice.actions;
export const selectBasemap = ({basemap}: RootState) => basemap.data;

export default basemapSlice.reducer;
