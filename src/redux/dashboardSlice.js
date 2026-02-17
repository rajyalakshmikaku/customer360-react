import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardCounts } from '../services/dashboardApi';

export const fetchDashboardCounts = createAsyncThunk(
  "dashboard/fetchCounts",
  async (wardNo, thunkAPI) => {
    try {
      return await getDashboardCounts(wardNo);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    counts: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardCounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardCounts.fulfilled, (state, action) => {
  state.loading = false;
  state.counts = action.payload?.data || [];
})
      .addCase(fetchDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer;