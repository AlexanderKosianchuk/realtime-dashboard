import { all, fork } from 'redux-saga/effects';

import sagaSocketConnect from 'features/dataReceiver/sagas/sagaSocketConnect';

export default function* root() {
  yield all([
    fork(sagaSocketConnect)
  ]);
}
