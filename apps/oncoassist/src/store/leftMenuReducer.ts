import { createSlice } from "@reduxjs/toolkit";

export interface LeftMenuState {
  selectedMenu: string | null; 
  isLeftMenuOpen: boolean; 
  selectedSubMenu: string | null; 
  selectSubSubMenu: string | null; 
  isAuthScreenOn: boolean; 
}

const initialState: LeftMenuState = {
  selectedMenu: null, 
  isLeftMenuOpen: true, 
  selectedSubMenu: null,
  selectSubSubMenu: null,
  isAuthScreenOn: false
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    selectMenu: (state, action) => {
      state.selectedMenu = action.payload;
      state.isLeftMenuOpen = false;
    },
    clearMenu: (state) => {
      state.selectedMenu = null;
    },
    toggleLeftMenu: (state, action) => {
      state.isLeftMenuOpen = action.payload;
    },
    selectSubMenu: (state, action) => {
      state.selectedSubMenu = action.payload;
    },
    setAuthScreenOn: (state, action) => {
      state.isAuthScreenOn = action.payload
    }
  },
});

export const { selectMenu, clearMenu, toggleLeftMenu, selectSubMenu, setAuthScreenOn } = menuSlice.actions;
export default menuSlice.reducer;
