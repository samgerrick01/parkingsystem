import * as types from "../components/action/actionTypes";

const initialState = {
  parkings: [],
  parking: [],
  loading: true,
};

const parkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PARKINGS:
    case types.SEARCH_PARKING:
      return {
        ...state,
        parkings: action.payload,
        loading: false,
      };
    case types.ADD_PARKING:
    case types.UPDATE_PARKING:
    case types.DELETE_PARKING:
      return {
        ...state,
        loading: false,
      };
    case types.GETSINGLE_PARKING:
      return {
        ...state,
        parking: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default parkingReducer;
