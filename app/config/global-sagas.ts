import { fork, all } from 'redux-saga/effects';

import appSagas from '@/containers/Main/sagas';

const sagas = [appSagas];

function* globalSagas(): Generator {
  const globalSagasForks = sagas.map(saga => fork(saga as () => Generator));
  yield all([...globalSagasForks]);
}

export default globalSagas;
