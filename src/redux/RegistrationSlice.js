import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Registration } from '../services/RegistrationApi';


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userdata, { rejectWithValue }) => {
    try {
      const res = await Registration(userdata);
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
  })
  .addCase(registerUser.fulfilled, (state, action) => {
    state.loading = false;
    state.registrationResult = action.payload;
  })
  .addCase(registerUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });
  },
});

export default registrationSlice.reducer;                