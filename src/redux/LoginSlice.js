import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../services/LoginApi';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Login error');
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  loginError: null,
  forgotError: null
};


const loginSlice = createSlice({
  name: 'auth',
  initialState, // use the above initialState
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loginError = null;
      sessionStorage.clear(); // clear all stored session
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        const userData = action.payload?.data || action.payload?.Data || {};

        const loggedUserId = userData.userid || userData.userId || userData.USERID || "";
        const loggedUserType = userData.usertype || userData.userType || userData.USERTYPE || "";
        const loggedWardId = userData.warD_NO || userData.wardNo || userData.WARD_NO || "";
        const loggedName = userData.name || userData.NAME || "";
        const loggedUsername = userData.username || userData.USERNAME || "";

        sessionStorage.setItem('LoggeduserId', String(loggedUserId));
        sessionStorage.setItem('LoggedUserType', String(loggedUserType));
        sessionStorage.setItem('LoggedWardId', String(loggedWardId));
        sessionStorage.setItem('LoggedName', String(loggedName));
        sessionStorage.setItem('LoggedUsername', String(loggedUsername));
  

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      });

  },
});



export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
