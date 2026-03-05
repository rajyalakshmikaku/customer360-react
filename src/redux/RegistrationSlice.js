import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Registration } from "../services/RegistrationApi";

export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Registration(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    registrationResult: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationResult = action.payload;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationResult = action.payload;
      });
  },
});

export default registrationSlice.reducer;