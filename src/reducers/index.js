import { combineReducers } from "@reduxjs/toolkit";
// Add Slices Here
import parkingSlice from "./parkingSlice";

const rootReducer = combineReducers({
  parking: parkingSlice,
});

export default rootReducer;
