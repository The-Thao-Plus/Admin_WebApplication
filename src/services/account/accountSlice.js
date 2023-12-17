import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  activeAccountThunk,
  deactiveAccountThunk,
  deleteAccountThunk,
  getAccountDetailThunk,
  getAllAccountsThunk,
} from './accountThunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  accounts: [],
  account: {},
};

export const getAllAccounts = createAsyncThunk('account/get-all-accounts', getAllAccountsThunk);
export const getAccount = createAsyncThunk('account/get-account', getAccountDetailThunk);
export const activeAccount = createAsyncThunk('account/active-accounts', activeAccountThunk);
export const deactiveAccount = createAsyncThunk('account/deactive-accounts', deactiveAccountThunk);
export const deleteAccount = createAsyncThunk('account/delete-accounts', deleteAccountThunk);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setMessageSuccess: (state, action) => {
      state.message = action.payload;
      toast.success(state.message);
    },
    setMessageNoti: (state, action) => {
      state.message = action.payload?.messages;
      toast.info(state.message);
    },
    setMessageError: (state, action) => {
      state.message = action.payload?.messages;
      toast.error(state.message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.accounts = [...action.payload?.listUsers];
      })
      .addCase(getAllAccounts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.account = { ...action.payload?.user };
      })
      .addCase(getAccount.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(activeAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.accounts = [...action.payload?.listUsers];
      })
      .addCase(activeAccount.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deactiveAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactiveAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.accounts = [...action.payload?.listUsers];
      })
      .addCase(deactiveAccount.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        console.log(action.payload);
        toast.error(action.payload);
      });
  },
});

export const { setMessageSuccess, setMessageNoti, setMessageError } = accountSlice.actions;
export default accountSlice.reducer;
