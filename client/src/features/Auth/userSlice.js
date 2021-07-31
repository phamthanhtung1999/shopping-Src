import userApi from 'api/userApi'
import StorageKeys from 'constants/storage-keys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk(
  'users/register',
  async (payload) => {
    // call api to register
    const data = await userApi.register(payload);
    // luu vao localstorage
    localStorage.setItem(StorageKeys.TOKEN, data.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    return data.user;
  }
)
export const login = createAsyncThunk(
  'users/login',
  async (payload) => {
    // call api to register
    const data = await userApi.login(payload);
    // luu vao localstorage
    localStorage.setItem(StorageKeys.TOKEN, data.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    return data.user;
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
  },
  extraReducers: {

    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  }
})
export const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer