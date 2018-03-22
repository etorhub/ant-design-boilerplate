import Constants from './constants';

export const initialState = {
  apiData: [],
  apiDataLoading: false,
  apiDataLoaded: false,
  apiDataError: false,
  searchText: '',
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_API_DATA:
      return {
        ...state,
        apiDataLoading: true,
        apiDataError: null,
      };
    case Constants.GET_API_DATA_LOADED:
      return {
        ...state,
        apiData: action.data,
        apiDataLoading: false,
        apiDataLoaded: true,
        apiDataError: null,
      };
    case Constants.GET_API_DATA_ERROR:
      return {
        ...state,
        apiDataLoading: false,
        apiDataLoaded: false,
        apiDataError: action.error,
      };
    case Constants.MAIN_SEARCH_TEXT_CHANGE:
      return { ...state, searchText: action.data };
    default:
      return state;
  }
};

export default mainReducer;
