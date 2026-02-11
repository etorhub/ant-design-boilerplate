import { createSelector } from 'reselect';
import type { RootState, RandomUserPerson } from '@/types';

const getAppData = (state: RootState) => state.app;

export const getFilteredDataArray = createSelector(
  getAppData,
  data => {
    const results = (data.apiData?.results ?? []) as RandomUserPerson[];
    const sText = data.searchText ?? '';
    return results.length > 0 && sText.length > 0
      ? results.filter(
        ({ name }) => name.first.toLocaleLowerCase().includes(sText.toLowerCase())
            || name.last.toLocaleLowerCase().includes(sText.toLowerCase()),
      )
      : results;
  },
);

export const isDataLoading = createSelector(
  getAppData,
  data => !!data.apiDataLoading,
);

export const getSearchText = createSelector(
  getAppData,
  data => data.searchText ?? '',
);

export const getApiDataError = createSelector(
  getAppData,
  data => data.apiDataError,
);

export const isApiDataLoaded = createSelector(
  getAppData,
  data => !!data.apiDataLoaded,
);
