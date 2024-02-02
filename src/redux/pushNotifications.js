import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  description: "",
  icon: "",
  image: "",
  button1: "",
  action1: "",
  button2: "",
  action2: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.title=action.payload.title,
      state.description=action.payload.description,
      state.icon=action.payload.icon,
      state.image=action.payload.image,
      state.button1=action.payload.button1,
      state.button2=action.payload.button2,
      state.action1=action.payload.action1,
      state.action2=action.payload.action2
    }
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
