import { takeLatest, call, put } from 'redux-saga/effects';

import API_URL from '@/config/constants';
import type { RandomUserResult } from '@/types';
import Constants from './constants';
import { getAPIData, getAPIDataLoaded, getAPIDataError } from './actions';

const apiUrl = API_URL;

type GetAPIDataAction = ReturnType<typeof getAPIData>;

const fetchData = (
  action: GetAPIDataAction,
  options: RequestInit,
): Promise<{ result?: RandomUserResult; error?: Error }> => {
  const { data } = action;
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
  action: GetAPIDataAction,
): Generator<unknown, void, { result?: RandomUserResult; error?: Error }> {
  const { result, error } = yield call(fetchData, action, { method: 'get' });

  if (error) {
    yield put(getAPIDataError(error));
  }

  if (result) {
    yield put(getAPIDataLoaded(result));
  }
}

function* apiData(): Generator {
  yield takeLatest(Constants.GET_API_DATA, getApiData);
}

export default apiData;
