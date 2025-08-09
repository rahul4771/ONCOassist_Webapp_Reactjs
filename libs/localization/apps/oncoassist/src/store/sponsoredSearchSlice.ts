import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SponsoredSearchState {  // ✅ Export this type
    sponsoredResults: any[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SponsoredSearchState = {
    sponsoredResults: [],
    isLoading: false,
    error: null,
};

const sponsoredSearchSlice = createSlice({
    name: "sponsoredSearch",
    initialState,
    reducers: {
        setSponsoredResults: (state, action: PayloadAction<any[]>) => {
            state.sponsoredResults = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setSponsoredResults, setLoading, setError } = sponsoredSearchSlice.actions;
export default sponsoredSearchSlice.reducer;




