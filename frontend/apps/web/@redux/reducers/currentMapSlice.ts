import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './../store';
import {TData} from './../types';

export interface IcurrentMapsState {
  data: TData | null;
}

const initialState: IcurrentMapsState = {
  data: null,
};

export const currentMapsSlice = createSlice({
  name: 'currentMap',
  initialState,
  reducers: {
    setCurrentMap(state, action: PayloadAction<TData | null>) {
      state.data = action.payload;
    },
    setClearMap(state) {
      state.data = null;
    },
  },
});

export const {setCurrentMap, setClearMap} = currentMapsSlice.actions;

export const selectCurrentMaps = ({currentMap}: RootState) => currentMap.data;

export default currentMapsSlice.reducer;
