import { combineReducers } from "redux";
import basemapSlice from "./basemapSlice";
import boundaryCenterSlice from "./boundaryCenterSlice";
import featureFormSlice from "./featureFormSlice";

export default combineReducers({
  basemap: basemapSlice,
  boundaryCenter: boundaryCenterSlice,
  featureForm: featureFormSlice,
});
