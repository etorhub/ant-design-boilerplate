import { takeLatest, call, put } from 'redux-saga/effects';

import Constants from './constants';
import API_URL from '../../config/constants';
import { getAPIDataLoaded, getAPIDataError } from './actions';

const apiUrl = API_URL;

const fetchData = ({ data }, options) => {
  let url = apiUrl;
  url += `?results=${data.results}`;
  url += `&page=${data.page}`;
  const fetchRequest = new Request(url, options);

  return fetch(fetchRequest)
    .then(response => (
      response.json().then(result => ({ result }))
    ))
    .catch(error => ({ error }));
};

function* getApiData(params) {
  const { result, error } = yield call(fetchData, params, { method: 'get' });

  if (error) {
    yield put(getAPIDataError(error));
  }

  yield put(getAPIDataLoaded(result));
}

function* apiData() {
  yield takeLatest(Constants.GET_API_DATA, getApiData);
}

export default apiData;
