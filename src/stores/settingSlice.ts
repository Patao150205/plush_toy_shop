import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type SettingState = {
  isLoading: boolean;
  hasSide: boolean;
  hasModal: { isOpen: boolean; status: "error" | "success" | null };
};

const initialState: SettingState = {
  isLoading: false,
  hasSide: false,
  hasModal: { isOpen: false, status: null },
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
      state.hasModal = { isOpen: true, status: action.payload };
    },
    ModalClose: (state) => {
      state.hasModal = { isOpen: false, status: null };
    },
  },
});

export const { LoadingON, LoadingOFF, SideToggle, ModalOpen, ModalClose } = settingSlice.actions;
export default settingSlice.reducer;
