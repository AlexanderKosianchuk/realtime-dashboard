import { put } from 'redux-saga/effects';
import _get from 'lodash/get';
import { DataReceiverActionTypes } from 'constants/index';

export default function* sagaHandleEventData(data) {
  const value = _get(data, 'value', null);
  const timestamp = _get(data, 'timestamp', null);

  if (typeof value !== 'number' || typeof timestamp !== 'number') {
    return;
  }

  yield put({
    type: DataReceiverActionTypes.DATA_RECEIVER_SET_DATA,
    payload: { value, timestamp },
  });

  return data;
}
