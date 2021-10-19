import userApi from 'api/userApi'
import StorageKeys from 'constants/storage-keys';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



export const register = createAsyncThunk(
  'users/register',
  async (payload) => {
    // call api to register
    const data = await userApi.register(payload);
    if (data.error) {
      return data
    }
    // luu vao localstorage
    localStorage.setItem(StorageKeys.TOKEN, data.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    return true;
  }
)
export const login = createAsyncThunk(
  'users/login',
  async (payload) => {
    // call api to login
    const data = await userApi.login(payload);
    if (data.error) {
      return data
    }
    // luu vao localstorage
    localStorage.setItem(StorageKeys.TOKEN, data.token);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    return JSON.parse(localStorage.getItem(StorageKeys.USER)) || {}
  }
)
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {}
    }
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