import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface ISliderControlsState {
  currOrder: number;
}

const initialState: ISliderControlsState = {
  currOrder: 0,
};

export const sliderControlsSlice = createSlice({
  name: "sliderControls",
  initialState,
  reducers: {
    nextImg: (state) => {
      state.currOrder += 1;
    },
    prevImg: (state) => {
      state.currOrder -= 1;
    },
  },
});

export const { nextImg, prevImg } = sliderControlsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const sliderControlsSelector = (state: RootState) =>
  state.sliderControls;

export default sliderControlsSlice.reducer;
