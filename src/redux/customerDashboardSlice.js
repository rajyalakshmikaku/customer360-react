import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomerDashboardCounts } from '../services/customerDashboardApi';

export const fetchCustomerDashboardCounts = createAsyncThunk(
  "customerDashboard/fetchCounts",
  async ({ wardNo, accountNo }, thunkAPI) => {
    try {
      return await getCustomerDashboardCounts(wardNo, accountNo);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const customerDashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    counts: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerDashboardCounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerDashboardCounts.fulfilled, (state, action) => {
  state.loading = false;

  console.log("Full API Response:", action.payload);
  console.log("Extracted counts data:", action.payload?.data);

  state.counts = action.payload?.data || {};  
})

      .addCase(fetchCustomerDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default customerDashboardSlice.reducer;