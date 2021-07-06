import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type SettingState = {
  isLoading: boolean;
  hasSide: boolean;
  hasModal: { isOpen: boolean; status: "error" | "success" | null; title: string | null; message: string | null };
};

const initialState: SettingState = {
  isLoading: false,
  hasSide: false,
  hasModal: { isOpen: false, status: null, title: null, message: null },
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
    ModalOpen: (state, action) => {
      state.hasModal = {
        isOpen: true,
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    ModalClose: (state) => {
      state.hasModal = { isOpen: false, status: null, title: null, message: null };
    },
  },
});

export const loadingSelector = createSelector(
  (state: RootState) => state.setting,
  (setting) => setting.isLoading
);
export const modalSelector = createSelector(
  (state: RootState) => state.setting,
  (setting) => setting.hasModal
);
export const sideSelector = createSelector(
  (state: RootState) => state.setting,
  (setting) => setting.hasSide
);

export const { LoadingON, LoadingOFF, SideToggle, ModalOpen, ModalClose } = settingSlice.actions;
export default settingSlice.reducer;
