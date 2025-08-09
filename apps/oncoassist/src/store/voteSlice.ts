import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VoteState {
  voteTypes: { [key: number]: number };
}

const initialState: VoteState = {
  voteTypes: {},
};

const voteSlice = createSlice({
  name: "vote",
  initialState,
  reducers: {
    setVoteType: (state, action: PayloadAction<{ newsId: number; type: number }>) => {
      state.voteTypes[action.payload.newsId] = action.payload.type;
    },
  },
});

export const { setVoteType } = voteSlice.actions;
export default voteSlice.reducer;