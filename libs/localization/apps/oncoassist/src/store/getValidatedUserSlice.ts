import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HcpValidationState {
  isGetHcpValidationEnabled: boolean;
}

// Utility function to safely access localStorage
const getHcpValidationFromLocalStorage = (): HcpValidationState => {
  try {
    const storedValue = localStorage.getItem("IsGetHcpValidationEnabled");
    return {
      isGetHcpValidationEnabled: storedValue === "1",
    };
  } catch (error) {
    console.warn("Error accessing localStorage:", error);
    return { isGetHcpValidationEnabled: false };
  }
};

// Initial state from localStorage
const initialState: HcpValidationState = getHcpValidationFromLocalStorage();

const hcpValidationSlice = createSlice({
  name: "hcpValidation",
  initialState,
  reducers: {
    setHcpValidation: (state, action: PayloadAction<boolean>) => {
      localStorage.setItem("IsGetHcpValidationEnabled", action.payload ? "1" : "0");
      state.isGetHcpValidationEnabled = action.payload;
    },
    
    toggleHcpValidation: (state) => {
      const newValue = !state.isGetHcpValidationEnabled;
      localStorage.setItem("IsGetHcpValidationEnabled", newValue ? "1" : "0");
      state.isGetHcpValidationEnabled = newValue;
    },
    
    clearHcpValidation: (state) => {
      localStorage.removeItem("IsGetHcpValidationEnabled");
      state.isGetHcpValidationEnabled = false;
    },
  },
});

export const { setHcpValidation, toggleHcpValidation, clearHcpValidation } = hcpValidationSlice.actions;
export default hcpValidationSlice.reducer;
