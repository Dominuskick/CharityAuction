import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialAuthState = {
  login: null,
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      Cookies.set('accessToken', state.accessToken);
      Cookies.set('refreshToken', state.refreshToken);
    },
  },
});

export const { setLogin, setTokens } = authSlice.actions;

export default authSlice.reducer;
