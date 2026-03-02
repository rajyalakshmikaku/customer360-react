import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComplaintsCounts, getWardInfo, getUserInfo, getComplaintsList ,PostApproveComplaint} from '../services/complaintListApi';

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
export const fetchApproveComplaintsInfo = createAsyncThunk(
  "complaints/fetchApproveComplaintsInfo",
  async (payload, thunkAPI) => {
    try {
      return await PostApproveComplaint(payload);
     
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
    ComplaintsListInfo: [],
    ApproveInfo: null,
    loading: false,
    approveLoading : false,
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
        state.ComplaintsListInfo = [];
      })
      .addCase(fetchComplaintsListInfo.fulfilled, (state, action) => {
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
      builder
      .addCase(fetchApproveComplaintsInfo.pending, (state) => {
        state.approveLoading  = true;
      })
      .addCase(fetchApproveComplaintsInfo.fulfilled, (state, action) => {
        debugger
        state.approveLoading  = false;
        const response = action.payload;
        state.success = response?.success;
        state.ApproveInfo = response;

      })
      .addCase(fetchApproveComplaintsInfo.rejected, (state, action) => {
        state.approveLoading  = false;
        state.error = action.payload;
      });

  }
});

export default complaintListSlice.reducer;