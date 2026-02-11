import Constants from './constants';
import type { ApiPaginationParams, RandomUserResult } from '../../types';

export const changeSearchText = (searchText: string) => ({
  type: Constants.MAIN_SEARCH_TEXT_CHANGE,
  data: searchText,
});

export const getAPIData = (pagination: ApiPaginationParams) => ({
  type: Constants.GET_API_DATA,
  data: pagination,
});

export const getAPIDataLoaded = (data: RandomUserResult) => ({
  type: Constants.GET_API_DATA_LOADED,
  data,
});

export const getAPIDataError = (error: Error) => ({
  type: Constants.GET_API_DATA_ERROR,
  error,
});

export type MainAction =
  | ReturnType<typeof changeSearchText>
  | ReturnType<typeof getAPIData>
  | ReturnType<typeof getAPIDataLoaded>
  | ReturnType<typeof getAPIDataError>;
