import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersList } from '../services/UserListApi';

export const fetchUserListInfo = createAsyncThunk(
  "User/fetchUserListInfo",
  async (payload, thunkAPI) => {
    try {
      return await getUsersList(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const UserListSlice = createSlice({
  name: "User",
  initialState: {
    success: false,
    UserListInfo: [],
    totalCount: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserListInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserListInfo.fulfilled, (state, action) => {
        console.log("API response from backend:", action.payload);
        state.loading = false;
        const response = action.payload;

        state.success = response?.success;
        state.UserListInfo = response?.list || [];
        state.totalCount = response?.totalCount || 0;
      })
      .addCase(fetchUserListInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default UserListSlice.reducer;
