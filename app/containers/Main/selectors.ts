import get from 'lodash.get';
import { createSelector } from 'reselect';
import type { RootState, RandomUserPerson } from '../../types';

export const getAppData = (state: RootState) => state.app;

export const getFilteredDataArray = createSelector(
  getAppData,
  data => {
    const results = get(data, 'apiData.results', []) as RandomUserPerson[];
    const sText = get(data, 'searchText', null) as string | null;
    return results.length > 0 && sText && sText.length > 0
      ? results.filter(
        ({ name }) => name.first.toLocaleLowerCase().includes(sText.toLowerCase()) ||
            name.last.toLocaleLowerCase().includes(sText.toLowerCase()),
      )
      : results;
  },
);

export const isDataLoading = createSelector(
  getAppData,
  data => !!get(data, 'apiDataLoading'),
);

export const getSearchText = createSelector(
  getAppData,
  data => get(data, 'searchText', '') as string,
);
