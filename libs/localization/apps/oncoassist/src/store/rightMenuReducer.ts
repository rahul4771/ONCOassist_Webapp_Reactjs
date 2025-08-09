import { createSlice } from "@reduxjs/toolkit";

export interface RightMenuState {
  isSearchEditable: boolean;
  searchedText: string | null;
  redirectLink: string | null;
  redirectIframeLink: string | null;
  redirectLoginClick: boolean;
}

const initialState: RightMenuState = {
    isSearchEditable: false,
    searchedText: null,
    redirectLink: null,
    redirectIframeLink: null,
    redirectLoginClick: false

};

const rightMenuSlice = createSlice({
  name: "rightmenu",
  initialState,
  reducers: {
    setSearchEditable: (state, action) => {
      state.isSearchEditable = action.payload;
    },
    setSearchedText: (state, action) => {
        state.searchedText = action.payload;
    },
    setRedirectLink: (state, action) => {
      state.redirectLink = action.payload;
    },
    setRedirectIframeLink: (state, action) => {
      state.redirectIframeLink = action.payload;
    },
    setRedirectLoginClick: (state, action) => {
      state.redirectLoginClick = action.payload;
    },
    },
});

export const { setSearchEditable, setSearchedText, setRedirectLink, setRedirectIframeLink, setRedirectLoginClick} = rightMenuSlice.actions;
export default rightMenuSlice.reducer;
