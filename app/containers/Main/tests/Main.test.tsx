import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import type { RootState } from '@/types';
import type { Reducer } from 'redux';
import mainReducer, { initialState as mainInitialState } from '../module';
import {
  getAPIDataError as getAPIDataErrorAction,
  getAPIDataLoaded as getAPIDataLoadedAction,
} from '../actions';
import Main from '../index';

const rootReducer = combineReducers({
  app: mainReducer,
}) as unknown as Reducer<RootState>;

const createTestStore = (overrides: Partial<RootState['app']> = {}) => createStore(
  rootReducer,
  { app: { ...mainInitialState, ...overrides } },
);

describe('Main', () => {
  it('renders SearchBar and Table', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );
    expect(screen.getByPlaceholderText('Filter by name')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('shows loading state when apiDataLoading is true', () => {
    const store = createTestStore({ apiDataLoading: true });
    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table.querySelector('.ant-table-placeholder') ?? table.closest('.ant-spin-nested-loading')).toBeTruthy();
  });

  it('shows error Alert when apiDataError is set', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );
    act(() => {
      store.dispatch(getAPIDataErrorAction(new Error('Network error')));
    });
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('shows Empty when loaded with no data and no error', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );
    act(() => {
      store.dispatch(getAPIDataLoadedAction({ results: [] }));
    });
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
