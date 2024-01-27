import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    open: "",
    modalProps: {},
  },
  reducers: {
    openModal: (state, action) => {
      state.open = action.payload.modalName;
      state.modalProps = action.payload.modalProps;
    },

    closeModal: (state) => {
      state.open = "";
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
