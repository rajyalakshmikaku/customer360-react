import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComplaintsCounts, getWardInfo, getUserInfo, getComplaintsList } from '../services/complaintListApi';

export const fetchComplaintsCounts = createAsyncThunk(
  "complaints/fetchCounts",
  async (wardNo, thunkAPI) => {
    debugger
    try {
      return await getComplaintsCounts(wardNo);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const fetchwardInfo = createAsyncThunk(
  "complaints/fetchWardInfo",
  async (type, thunkAPI) => {
    try {
      return await getWardInfo(type);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
export const fetchUserInfo = createAsyncThunk(
  "complaints/fetchUserInfo",
  async (type, thunkAPI) => {
    try {
      return await getUserInfo(type);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
export const fetchComplaintsListInfo = createAsyncThunk(
  "complaints/fetchComplaintsListInfo",
  async (payload, thunkAPI) => {
    try {
      return await getComplaintsList(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const complaintListSlice = createSlice({
  name: "complaints",
  initialState: {
    counts: null,
    wardInfo: null,
    WardType: null,
    UserInfo: null,
    ComplaintsListInfo: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaintsCounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComplaintsCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload?.data;
        //console.log('complaintscounts',action.payload?.data);
      })
      .addCase(fetchComplaintsCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchwardInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchwardInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.wardInfo = action.payload?.data;
        // console.log('wardInfo',action.payload?.data);
      })
      .addCase(fetchwardInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.UserInfo = action.payload?.data;
        //console.log('UserInfo',action.payload?.data);
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchComplaintsListInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComplaintsListInfo.fulfilled, (state, action) => {
        debugger
        state.loading = false;
        const response = action.payload;

        state.success = response?.success;
        state.ComplaintsListInfo = response?.list;
        state.totalCount = response?.totalCount;
        state.WardType = response?.type;
      })
      .addCase(fetchComplaintsListInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
});

export default complaintListSlice.reducer;