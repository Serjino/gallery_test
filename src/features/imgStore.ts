import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { ISliderImg } from "../components/SliderWrapper/Slider.def";

export interface IImgStoreState {
  total: number;
  images: ISliderImg[];
}

const initialState: IImgStoreState = {
  total: 0,
  images: [],
};

export const imgStoreSlice = createSlice({
  name: "imgStore",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<ISliderImg[]>) => {
      state.images = action.payload;
    },
    addImages: (state, action: PayloadAction<ISliderImg[]>) => {
      state.images = [...state.images, ...action.payload];
    },
    setTotal: (state, action: PayloadAction<IImgStoreState["total"]>) => {
      state.total = action.payload;
    },
  },
});

export const { setImages, addImages, setTotal } = imgStoreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const imgStoreSelector = (state: RootState) => state.imgStore;

export default imgStoreSlice.reducer;
