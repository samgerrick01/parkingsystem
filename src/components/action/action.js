import * as types from "./actionTypes";
import axios from "axios";

const getParkings = (parkings) => ({
  type: types.GET_PARKINGS,
  payload: parkings,
});

const parkingAdded = () => ({
  type: types.ADD_PARKING,
});

const parkingUpdated = () => ({
  type: types.UPDATE_PARKING,
});

const getParking = (parking) => ({
  type: types.GETSINGLE_PARKING,
  payload: parking,
});

const parkingDeleted = () => ({
  type: types.DELETE_PARKING,
});

const searchParking = (parkings) => ({
  type: types.SEARCH_PARKING,
  payload: parkings,
});

export const loadParkings = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getParkings(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const addParking = (parking) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, parking)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(parkingAdded());
        dispatch(loadParkings());
      })
      .catch((error) => console.log(error));
  };
};

export const getSingleParking = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getParking(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const updateParking = (parking, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, parking)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(parkingUpdated());
        dispatch(loadParkings());
      })
      .catch((error) => console.log(error));
  };
};

export const deleteParking = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(parkingDeleted());
        dispatch(loadParkings());
      })
      .catch((error) => console.log(error));
  };
};

export const searchParkings = (value) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}?VehiclePlate_like=${value}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(searchParking(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
