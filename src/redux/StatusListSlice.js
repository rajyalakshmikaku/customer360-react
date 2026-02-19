import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStatuslist } from "../services/StatusListApi";

export const fetchStatusListInfo = createAsyncThunk(
  "status/fetchStatusListInfo",
  async (payload, thunkAPI) => {
    try {
      return await GetStatuslist(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const StatusSlice = createSlice({
  name: "status",
  initialState: {
    AccountsListInfo: null,
    totalCount : null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
   
    builder
      .addCase(fetchStatusListInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatusListInfo.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload;
        state.success = response?.success;
        state.AccountsListInfo = response?.list;
        state.totalCount = response?.totalCount;
        state.WardType = response?.type;
      })
      .addCase(fetchStatusListInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      

  }
});

export default StatusSlice.reducer;
