import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStatuslist } from '../services/StatusListApi';

export const fetchStatusListInfo = createAsyncThunk(
  "Status/fetchStatusListInfo",
  async (payload, thunkAPI) => {
    try {
      const res = await GetStatuslist(payload);
      console.log("THUNK RESULT:", res);
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
      .addCase(fetchStatusListInfo.fulfilled, (state, action) => {
  console.log("SLICE RECEIVED:", action.payload);

  state.loading = false;

  const res = action.payload;

  state.success = res?.success ?? true;

  // ✅ handle any casing + direct array
  state.StatusListInfo =
    res?.list ||
    res?.List ||
    res?.data ||
    res?.Data ||
    res?.items ||
    res?.Items ||
    (Array.isArray(res) ? res : []);

  state.totalCount =
    res?.totalCount ||
    res?.TotalCount ||
    res?.count ||
    res?.Count ||
    state.StatusListInfo.length;
});


  }
});

export default StatusSlice.reducer;
