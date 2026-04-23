import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Registration ,GetGISData} from "../services/RegistrationApi";



export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Registration(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGISData = createAsyncThunk(
  "registration/fetchGISData",
  async (params, { rejectWithValue }) => {
    try {
      const { wardNo, page, pageSize } = params;

      const response = await GetGISData(wardNo, page, pageSize);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    registrationResult: null,

      gisLoading: false,
     gisData: [],
     totalCount: 0 
  },
  reducers: {
    clearRegistrationResult: (state) => {
      state.registrationResult = null;
    },
    resetRegistrationState: (state) => {
      state.loading = false;
      state.registrationResult = null;
    },
  },

   extraReducers: (builder) => {
    builder

      // ---------------- REGISTER ----------------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registrationResult = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registrationResult = action.payload;
      })

      // ---------------- GIS ----------------
      .addCase(fetchGISData.pending, (state) => {
        state.gisLoading = true;
      })
 .addCase(fetchGISData.fulfilled, (state, action) => {
  state.gisLoading = false;
  state.gisData = action.payload?.data || [];
  state.totalCount = action.payload?.totalCount || 0;
})
      .addCase(fetchGISData.rejected, (state, action) => {
        state.gisLoading = false;
        state.gisData = [];
      });
  },
});

export const { clearRegistrationResult, resetRegistrationState } = registrationSlice.actions;
export default registrationSlice.reducer;