import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWardDetailsByType } from "../services/dashboardApi";

export const fetchWardDetails = createAsyncThunk(
  "dashboard/fetchWardDetails",
  async ({ wardNo, type, search }, thunkAPI) => {
    try {
      const res = await getWardDetailsByType(wardNo, type, search);
      console.log("THUNK RESPONSE:", res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const wardDetailsSlice = createSlice({
  name: "wardDetails",
  initialState: {
    details: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWardDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWardDetails.fulfilled, (state, action) => {
  state.loading = false;
  state.details  = action.payload.data;   // ONLY array
})
      .addCase(fetchWardDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default wardDetailsSlice.reducer;