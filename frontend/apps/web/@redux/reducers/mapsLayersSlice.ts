import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MapsLayerQuery} from '@z1data/graphql';
import {TData} from '..';
import {RootState} from './../store';

interface IShowLayer {
  maxzoom: number;
  minzoom: number;
  name: string;
  readonly: boolean;
  tileSize: number;
}
type TShowLayer = {[key: string]: IShowLayer};

export interface IState {
  showLayer: TShowLayer | null;
  data: MapsLayerQuery['mapsLayer'][];
  sortedLayers: TData[] | null;
}

const initialState: IState = {
  showLayer: null,
  sortedLayers: [],
  data: [],
};
const mapsLayersSlice = createSlice({
  name: 'mapsLayers',
  initialState,
  reducers: {
    setSortedLayers(state, action: PayloadAction<TData[] | null>) {
      state.sortedLayers = action.payload;
    },
    setShowLayer(state, action: PayloadAction<TShowLayer>) {
      state.showLayer = action.payload;
    },
    setMapsLayers: (
      state,
      action: PayloadAction<MapsLayerQuery['mapsLayer'][]>,
    ) => {
      state.data = action.payload;
    },
  },
});

export const {setMapsLayers, setSortedLayers, setShowLayer} =
  mapsLayersSlice.actions;

export const selectSortedLayers = ({mapsLayers}: RootState) => {
  return mapsLayers.sortedLayers;
};

export const selectShowLayer = ({mapsLayers}: RootState) =>
  mapsLayers.showLayer;

export const selectMapsLayers = ({mapsLayers}: RootState) => mapsLayers.data;

export default mapsLayersSlice.reducer;
