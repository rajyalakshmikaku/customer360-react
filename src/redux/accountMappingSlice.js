import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAccountMappingByUserId } from '../services/AccountListApi';

export const fetchAccountMappings = createAsyncThunk(
  'accountMapping/fetchAccountMappings',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await GetAccountMappingByUserId(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  accounts: [],
  loading: false,
  error: null,
};

const accountMappingSlice = createSlice({
  name: 'accountMapping',
  initialState,
  reducers: {
    clearAccounts(state) {
      state.accounts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountMappings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountMappings.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccountMappings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAccounts } = accountMappingSlice.actions;
export default accountMappingSlice.reducer;
