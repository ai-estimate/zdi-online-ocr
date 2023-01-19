import {combineReducers} from 'redux';
import currentMapsSlice from './currentMapSlice';
import basemapSlice from './basemapSlice';
import mapsLayersSlice from './mapsLayersSlice';
import boundaryCenterSlice from './boundaryCenterSlice';
import featureFormSlice from './featureFormSlice';

export default combineReducers({
  currentMap: currentMapsSlice,
  basemap: basemapSlice,
  mapsLayers: mapsLayersSlice,
  boundaryCenter: boundaryCenterSlice,
  featureForm: featureFormSlice,
});
