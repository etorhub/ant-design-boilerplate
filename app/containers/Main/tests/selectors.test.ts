import type { RootState } from '@/types';
import {
  getFilteredDataArray,
  isDataLoading,
  getSearchText,
  getApiDataError,
  isApiDataLoaded,
} from '../selectors';
import { initialState } from '../module';

const makeState = (overrides: Partial<RootState['app']> = {}): RootState => ({
  app: { ...initialState, ...overrides },
});

describe('Main selectors', () => {
  it('getFilteredDataArray returns results and filters by name', () => {
    const people = [
      { name: { first: 'Ada', last: 'Lovelace' }, gender: 'female', email: 'a@b.c' },
      { name: { first: 'Alan', last: 'Turing' }, gender: 'male', email: 'd@e.f' },
    ];
    const full = makeState({ apiData: { results: people }, searchText: '' });
    expect(getFilteredDataArray(full)).toHaveLength(2);

    const filtered = makeState({ apiData: { results: people }, searchText: 'lovelace' });
    expect(getFilteredDataArray(filtered)).toEqual([people[0]]);
  });

  it('loading / loaded / error / searchText selectors read app slice', () => {
    const err = new Error('boom');
    const state = makeState({
      apiDataLoading: true,
      apiDataLoaded: true,
      apiDataError: err,
      searchText: 'hi',
    });
    expect(isDataLoading(state)).toBe(true);
    expect(isApiDataLoaded(state)).toBe(true);
    expect(getApiDataError(state)).toBe(err);
    expect(getSearchText(state)).toBe('hi');
  });
});
