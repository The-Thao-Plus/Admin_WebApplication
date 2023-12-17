import axiosClient from 'src/api/axiosClient';
import { getAccount, getAllAccounts, setMessageSuccess } from './accountSlice';

export const getAllAccountsThunk = async (_, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl('/user/all-users');
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getAccountDetailThunk = async (accountId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl(`/user/${accountId}`);
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteAccountThunk = async (accountId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(`/user/${accountId}`);
      if (response) {
        thunkAPI.dispatch(getAllAccounts());
        thunkAPI.dispatch(setMessageSuccess('Deleted account successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const activeAccountThunk = async (accountId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/user/unblock-user/${accountId}`);
      if (response) {
        console.log(response);
        thunkAPI.dispatch(getAllAccounts());
        thunkAPI.dispatch(getAccount(accountId));
        thunkAPI.dispatch(setMessageSuccess('Active account successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deactiveAccountThunk = async (accountId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/user/block-user/${accountId}`);
      if (response) {
        thunkAPI.dispatch(getAllAccounts());
        thunkAPI.dispatch(getAccount(accountId));
        thunkAPI.dispatch(setMessageSuccess('Deactive account successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};
