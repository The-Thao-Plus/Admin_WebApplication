import axiosClient from 'src/api/axiosClient';
import { getAllSports, setMessageError, setMessageSuccess } from './sportSlice';

export const createNewSportThunk = async (params, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.post('/sport/', params);
      if (response) {
        console.log(response);
        if (response.status === 'fail') {
          thunkAPI.dispatch(setMessageError('Sport name is aleady!'));
        } else {
          thunkAPI.dispatch(setMessageSuccess('Created new sport successfully'));
          thunkAPI.dispatch(getAllSports());
        }
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const getAllSportsThunk = async (_, thunkAPI) => {
  try {
    const response = await axiosClient.getByUrl('/sport/');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSportDetailThunk = async (sportId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.getByUrl(`/sport/${sportId}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const updateSportThunk = async (params, thunkAPI) => {
  console.log(params);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/sport/${params.sportId}`, params.newSport);
      if (response) {
        console.log(response);
        thunkAPI.dispatch(getAllSports());
        thunkAPI.dispatch(setMessageSuccess('Update sport successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deleteSportThunk = async (sportId, thunkAPI) => {
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.delete(`/sport/${sportId}`);
      if (response) {
        thunkAPI.dispatch(getAllSports());
        thunkAPI.dispatch(setMessageSuccess('Deleted sport successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const activeSportThunk = async (sportId, thunkAPI) => {
  console.log(sportId);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/sport/unblock-sport/${sportId}`);
      if (response) {
        thunkAPI.dispatch(getAllSports());
        thunkAPI.dispatch(setMessageSuccess('Active sport successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};

export const deactiveSportThunk = async (sportId, thunkAPI) => {
  console.log(sportId);
  const accessToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('AdminAccessToken'))
    ?.split('=')[1];
  if (accessToken) {
    axiosClient.setHeaderAuth(accessToken);
    try {
      const response = await axiosClient.put(`/sport/block-sport/${sportId}`);
      if (response) {
        thunkAPI.dispatch(getAllSports());
        thunkAPI.dispatch(setMessageSuccess('Deactive sport successfully'));
      }
      return response;
    } catch (error) {
      console.log('sport error thunk: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
};
