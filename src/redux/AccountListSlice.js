import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetStatuslist } from "../services/AccountListApi";

export const fetchAccountListInfo = createAsyncThunk(
  "account/fetchAccountListInfo",
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

const AccountListSlice = createSlice({
  name: "account",
  initialState: {
   
  AccountsListInfo: [],
  totalCount: 0,
  loading: false,
  error: null
  },
  reducers: {},
  extraReducers: (builder) => {
   
    builder
      .addCase(fetchAccountListInfo.pending, (state) => {
        state.loading = true;
      })
     .addCase(fetchAccountListInfo.fulfilled, (state, action) => {
  state.loading = false;
  const response = action.payload;

  state.AccountsListInfo = response?.list || [];
  state.totalCount = response?.totalCount || 0;
})
      .addCase(fetchAccountListInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      

  }
});

export default AccountListSlice.reducer;
