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

//   extraReducers: (builder) => {
//     builder
    
//       .addCase(fetchAccountListInfo.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(fetchLinkedAccounts.fulfilled, (state, action) => {
//   state.linkedLoading = false;
//   console.log("LINKED API RESPONSE:", action.payload);

//   state.linkedAccounts = action.payload?.list || action.payload || [];
// })

//       .addCase(fetchAccountListInfo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchApproveAccountsInfo.pending, (state) => {
//         state.approveLoading = true;
//       })

//       .addCase(fetchApproveAccountsInfo.fulfilled, (state, action) => {
//         state.approveLoading = false;
//         state.success = action.payload?.success;
//         state.ApproveInfo = action.payload;
//       })

//       .addCase(fetchApproveAccountsInfo.rejected, (state, action) => {
//         state.approveLoading = false;
//         state.error = action.payload;
//       })

//       .addCase(fetchLinkedAccounts.pending, (state) => {
//         state.linkedLoading = true;
//       })

//       .addCase(fetchLinkedAccounts.fulfilled, (state, action) => {
//         state.linkedLoading = false;
//         state.linkedAccounts = Array.isArray(action.payload)
//           ? action.payload
//           : action.payload?.list || [];
//       })

//       .addCase(fetchLinkedAccounts.rejected, (state, action) => {
//         state.linkedLoading = false;
//         state.error = action.payload;
//       });
//   }
extraReducers: (builder) => {
  builder
    .addCase(fetchAccountListInfo.pending, (state) => {
      state.loading = true;
    })

    .addCase(fetchAccountListInfo.fulfilled, (state, action) => {
      state.loading = false;

      state.AccountsListInfo = action.payload?.list || [];
      state.totalCount = action.payload?.totalCount || 0;
      state.activestatus = action.payload?.activeStatus || [];
    })

    .addCase(fetchAccountListInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase(fetchApproveAccountsInfo.pending, (state) => {
      state.approveLoading = true;
    })

    .addCase(fetchApproveAccountsInfo.fulfilled, (state, action) => {
      state.approveLoading = false;
      state.success = action.payload?.success;
      state.ApproveInfo = action.payload;
    })

    .addCase(fetchApproveAccountsInfo.rejected, (state, action) => {
      state.approveLoading = false;
      state.error = action.payload;
    })

    .addCase(fetchLinkedAccounts.pending, (state) => {
      state.linkedLoading = true;
    })

    .addCase(fetchLinkedAccounts.fulfilled, (state, action) => {
      state.linkedLoading = false;

      console.log("LINKED API RESPONSE:", action.payload);

      state.linkedAccounts = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.list || [];
    })

    .addCase(fetchLinkedAccounts.rejected, (state, action) => {
      state.linkedLoading = false;
      state.error = action.payload;
    });
}
});

export default AccountListSlice.reducer;