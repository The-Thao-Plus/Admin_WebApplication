import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  activeSportThunk,
  createNewSportThunk,
  deactiveSportThunk,
  deleteSportThunk,
  getAllSportsThunk,
  getSportDetailThunk,
  updateSportThunk,
} from './sportThunk';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isEditing: false,
  message: '',
  sports: [],
  sport: {},
};

export const getAllSports = createAsyncThunk('sport/get-all-sports', getAllSportsThunk);
export const getSportDetail = createAsyncThunk('sport/get-sports-detail', getSportDetailThunk);
export const creatNewSport = createAsyncThunk('sport/create-sports', createNewSportThunk);
export const updateSport = createAsyncThunk('sport/update-sports', updateSportThunk);
export const deleteSport = createAsyncThunk('sport/delete-sports', deleteSportThunk);
export const activeSport = createAsyncThunk('sport/active-sports', activeSportThunk);
export const deactiveSport = createAsyncThunk('sport/deactive-sports', deactiveSportThunk);

const sportSlice = createSlice({
  name: 'sport',
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
      state.message = action.payload;
      toast.error(state.message);
    },
    setAddSport: (state) => {
      state.isEditing = false;
    },
    setEditSport: (state, action) => {
      state.isEditing = true;
      state.sport = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSports.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sports = [...action.payload?.listSport];
      })
      .addCase(getAllSports.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getSportDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSportDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sport = { ...action.payload?.getSport };
      })
      .addCase(getSportDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(creatNewSport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(creatNewSport.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(creatNewSport.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(updateSport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSport.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateSport.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deleteSport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sport = { ...action.payload?.getSport };
      })
      .addCase(deleteSport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload?.data.message);
      })
      .addCase(activeSport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeSport.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(activeSport.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deactiveSport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deactiveSport.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deactiveSport.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload?.data.message);
      });
  },
});

export const { setMessageSuccess, setMessageNoti, setMessageError, setAddSport, setEditSport } = sportSlice.actions;
export default sportSlice.reducer;
