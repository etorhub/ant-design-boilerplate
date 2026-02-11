export interface RandomUserPerson {
  name: { first: string; last: string };
  gender: string;
  email: string;
  [key: string]: unknown;
}

/**
 * RandomUser API result shape (simplified)
 */
export interface RandomUserResult {
  results?: RandomUserPerson[];
}

/**
 * Main (app) slice of state
 */
export interface MainState {
  apiData: RandomUserResult;
  apiDataLoading: boolean;
  apiDataLoaded: boolean;
  apiDataError: Error | null;
  searchText: string;
}

/**
 * Root Redux state
 */
export interface RootState {
  app: MainState;
}

/**
 * Pagination and filter params for API (Ant Design table can pass extra filter keys)
 */
export interface ApiPaginationParams {
  results?: number;
  page?: number;
  sortField?: string;
  sortOrder?: string;
  gender?: string | string[];
  [key: string]: unknown;
}
