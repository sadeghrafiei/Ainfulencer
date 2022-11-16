import {createSlice} from '@reduxjs/toolkit';
import {IUser} from '../types';

const userSlice = createSlice({
  name: 'users',
  initialState: {loggedIn: false, onCheck: false},
  reducers: {
    login: (state: IUser) => ({...state, onCheck: true}),
    loginSuccess(state: IUser) {
      state.onCheck = false;
      state.loggedIn = true;
    },
    logout: (state: IUser) => ({...state, onCheck: true}),
    logoutSuccess(state: IUser) {
      state.onCheck = false;
      state.loggedIn = false;
    },
  },
});

export const {login, loginSuccess, logout, logoutSuccess} = userSlice.actions;

export default userSlice.reducer;
