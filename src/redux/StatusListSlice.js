import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStatuslist } from '../services/StatusListApi';

export const fetchStatusListInfo = createAsyncThunk(
  "Status/fetchStatusListInfo",
  async (payload, thunkAPI) => {
    try {
      const res = await GetStatuslist(payload);
      // console.log("THUNK RESULT:", res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);


const StatusSlice = createSlice({
  name: "Status",
  initialState: {
    success: false,
    StatusListInfo: [],
    totalCount: 0,
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
          debugger
           state.loading = false;
           const response = action.payload;
           state.success = response?.success;
           state.StatusListInfo = response?.data;
           state.totalCount = response?.totalCount;
         })
         .addCase(fetchStatusListInfo.rejected, (state, action) => {
           state.loading = false;
           state.error = action.payload;
         });


  }
});

export default StatusSlice.reducer;
