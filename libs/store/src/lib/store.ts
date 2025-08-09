import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./features/settings/settingsSlice"

export const sharedStore = {
  settings: settingsReducer
};
