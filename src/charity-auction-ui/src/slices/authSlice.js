import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    login: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
