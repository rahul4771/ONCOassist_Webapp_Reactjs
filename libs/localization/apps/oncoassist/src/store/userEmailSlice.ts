import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decryptUserID } from '../utils/decrypt';

export interface UserState {
  opUserEmail: string | null;
  userName: string | null;
  userProfession: string | null;
  userID: string | null;
  userPrimarySpeciality : string | null;
}

// Utility function to safely access localStorage
const getUserFromLocalStorage = (): UserState => {
  try {
   
    return {
      opUserEmail: localStorage.getItem('opuseremail'),
      userName: localStorage.getItem('opuser'),
      userProfession: localStorage.getItem('opprofession'),
      userID: localStorage.getItem("userID"), // Decrypt userID
      userPrimarySpeciality: localStorage.getItem('opuserPrimarySpeciality'),
    };
  } catch (error) {
    console.warn("Error accessing localStorage:", error);
    return {
      opUserEmail: null,
      userName: null,
      userProfession: null,
      userID: null, // Decrypt userID
      userPrimarySpeciality: null,
    };
  }
};

// Initial state from localStorage
const initialState: UserState = getUserFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set multiple user fields and sync with localStorage
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value) {
          localStorage.setItem(key, value);
          (state as any)[key] = value;
        } else {
          localStorage.removeItem(key);
          (state as any)[key] = null;
        }
      });
    },

    // Update a single user field and sync to localStorage
    updateUserField: (
      state,
      action: PayloadAction<{ key: keyof UserState; value: string | null }>
    ) => {
      const { key, value } = action.payload;
      if (value) {
        localStorage.setItem(key, value);
        state[key] = value;
      } else {
        localStorage.removeItem(key);
        state[key] = null;
      }
    },

    // Clear all user fields and remove from localStorage
    clearUser: (state) => {
      Object.keys(state).forEach((key) => {
        localStorage.removeItem(key);
        (state as any)[key] = null;
      });
    },
  },
});

export const { setUser, updateUserField, clearUser } = userSlice.actions;
export default userSlice.reducer;
