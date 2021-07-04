import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type SettingState = {
  isLoading: boolean;
  hasSide: boolean;
};

const initialState: SettingState = {
  isLoading: false,
  hasSide: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    LoadingON: (state) => {
      state.isLoading = true;
    },
    LoadingOFF: (state) => {
      state.isLoading = false;
    },
    SideToggle: (state) => {
      state.hasSide = !state.hasSide;
    },
  },
});

export const { LoadingON, LoadingOFF, SideToggle } = settingSlice.actions;
export default settingSlice.reducer;
