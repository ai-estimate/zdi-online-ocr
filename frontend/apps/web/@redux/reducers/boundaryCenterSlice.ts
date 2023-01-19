import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './../store';
import {TData} from './../types';

interface IBoundaryCenter {
  boundary: TData | null;
  center: TData | null;
}
export interface IState {
  data: IBoundaryCenter | null;
}

const initialState: IState = {
  data: {
    boundary: null,
    center: null,
  },
};

const boundaryCenterSlice = createSlice({
  name: 'boundaryCenter',
  initialState,
  reducers: {
    setBoundaryCenter(state, action: PayloadAction<IBoundaryCenter | null>) {
      state.data = action.payload;
    },
    reset: () => initialState,
  },
});

export const {setBoundaryCenter, reset} = boundaryCenterSlice.actions;

export const selectBoundaryCenter = ({boundaryCenter}: RootState) =>
  boundaryCenter.data;

export default boundaryCenterSlice.reducer;
