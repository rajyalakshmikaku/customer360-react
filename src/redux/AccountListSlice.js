import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetStatuslist,
  PostApproveAccounts,
  GetAccountlist
} from "../services/AccountListApi";

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

export const fetchApproveAccountsInfo = createAsyncThunk(
  "account/fetchApproveAccountsInfo",
  async (payload, thunkAPI) => {
    try {
      return await PostApproveAccounts(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const fetchLinkedAccounts = createAsyncThunk(
  "account/fetchLinkedAccounts",
  async (idNumber, thunkAPI) => {
    try {
      return await GetAccountlist(idNumber);
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
    approveLoading: false,
    ApproveInfo: null,
    success: false,
    error: null,
    activestatus: [],
    linkedAccounts: [],
    linkedLoading: false
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // LIST
      .addCase(fetchAccountListInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccountListInfo.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload;
        state.AccountsListInfo = response?.list || [];
        state.totalCount = response?.totalCount || 0;
        state.activestatus = response?.activeStatus || [];
      })
      .addCase(fetchAccountListInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // APPROVE
      .addCase(fetchApproveAccountsInfo.pending, (state) => {
        state.approveLoading = true;
      })
      .addCase(fetchApproveAccountsInfo.fulfilled, (state, action) => {
        state.approveLoading = false;
        const response = action.payload;
        state.success = response?.success;
        state.ApproveInfo = response;
      })
      .addCase(fetchApproveAccountsInfo.rejected, (state, action) => {
        state.approveLoading = false;
        state.error = action.payload;
      })

      // LINKED ACCOUNTS
      .addCase(fetchLinkedAccounts.pending, (state) => {
        state.linkedLoading = true;
      })
      .addCase(fetchLinkedAccounts.fulfilled, (state, action) => {
        state.linkedLoading = false;
        state.linkedAccounts = action.payload?.list || [];
      })
      .addCase(fetchLinkedAccounts.rejected, (state, action) => {
        state.linkedLoading = false;
        state.error = action.payload;
      });
  }
});

export default AccountListSlice.reducer;