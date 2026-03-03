import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveRegistration } from '../services/RegistrationApi';


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userdata, { rejectWithValue }) => {
    try {
      const res = await saveRegistration(userdata);
      return res;
    } catch (err) {
      let errorMessage = "Registration failed";

      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registrationResult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registrationResult = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      });
  },
});

export default registrationSlice.reducer;                