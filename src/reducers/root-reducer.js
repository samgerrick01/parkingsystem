import { combineReducers } from "redux";
import parkingReducer from "./reducer";

const rootReducer = combineReducers({
  data: parkingReducer,
});

export default rootReducer;
