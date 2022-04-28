import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "parking",
  initialState: {
    parkingSlot: [],
  },
  reducers: {
    clearParking: (state) => {
      state.parkingSlot = [];
    },
    addParking: (state, { payload }) => {
      state.parkingSlot = [...state.parkingSlot, payload];
    },
  },
});

export const { clearParking, addParking } = slice.actions;

export const pakingSelector = (state) => state.parking;

export default slice.reducer;
