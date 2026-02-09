import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../services/LoginApi';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      console.log('Login API response:', data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Login error');
    }
  }
);

const initialState = {
  loading: false,
  loginError: null,
  forgotError: null
};
const getDisplayUserType = (type) => {
  debugger
  switch (type) {
    case "A":
      return "Admin";
    case "C":
      return "Customer";
    case "U":
      return "User";
    default:
      return "Unknown";
  }
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
        debugger
        state.loading = false;
        state.user = action.payload;
        const displayUserType = getDisplayUserType(action.payload.data.usertype);

        sessionStorage.setItem('LoggeduserId', action.payload.data.userid);
        sessionStorage.setItem('LoggedUserType', displayUserType);
        sessionStorage.setItem('LoggedWardId', action.payload.data.wardid);
        sessionStorage.setItem('LoggedName', action.payload.data.name);
        sessionStorage.setItem('LoggedUsername', action.payload.data.username);
  

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      });

  },
});



export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
