import { takeLatest, call, put } from 'redux-saga/effects';

import Constants from './constants';
import API_URL from '../../config/constants';
import { getAPIDataLoaded, getAPIDataError } from './actions';
import type { ApiPaginationParams, RandomUserResult } from '../../types';

const apiUrl = API_URL;

interface FetchDataAction {
  data: ApiPaginationParams;
}

const fetchData = (
  { data }: FetchDataAction,
  options: RequestInit,
): Promise<{ result?: RandomUserResult; error?: Error }> => {
  let url = apiUrl;
  url += `?results=${data.results ?? 10}`;
  url += `&page=${data.page ?? 0}`;
  url += data.sortField ? `&sortField=${data.sortField}` : '';
  url += data.sortOrder ? `&sortOrder=${data.sortOrder}` : '';
  url += data.gender ? `&gender[]=${data.gender}` : '';
  const fetchRequest = new Request(url, options);

  return fetch(fetchRequest)
    .then(response => response.json().then((result: RandomUserResult) => ({ result })))
    .catch((error: Error) => ({ error }));
};

function* getApiData(
  params: FetchDataAction,
): Generator<unknown, void, { result?: RandomUserResult; error?: Error }> {
  const { result, error } = yield call(fetchData, params, { method: 'get' });

  if (error) {
    yield put(getAPIDataError(error));
  }

  if (result) {
    yield put(getAPIDataLoaded(result));
  }
}

function* apiData(): Generator {
  // redux-saga types expect ActionPattern; string action type is valid at runtime
  const getApiDataWorker = getApiData as (action: FetchDataAction) => Generator;
  yield takeLatest(Constants.GET_API_DATA as never, getApiDataWorker);
}

export default apiData;
