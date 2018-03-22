/* eslint-disable import/prefer-default-export */
import Constants from './constants';

export const changeSearchText = searchText => ({
  type: Constants.MAIN_SEARCH_TEXT_CHANGE,
  data: searchText,
});

export const getAPIData = pagination => ({
  type: Constants.GET_API_DATA,
  data: pagination,
});

export const getAPIDataLoaded = data => ({
  type: Constants.GET_API_DATA_LOADED,
  data,
});

export const getAPIDataError = error => ({
  type: Constants.GET_API_DATA_ERROR,
  error,
});
