import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";
import notificationSlice from "./pushNotifications";

export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    notificaion: notificationSlice,
  },
});
