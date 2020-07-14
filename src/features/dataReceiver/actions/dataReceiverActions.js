// @flow
import { createActions } from 'redux-actions';
import { DataReceiverActionTypes } from 'constants/index';

export const {
  dataReceiverConnect,
  dataReceiverDisconnect,
  dataReceiverSetStatus,
  dataReceiverSetData
} = createActions({
  [DataReceiverActionTypes.DATA_RECEIVER_CONNECT]: () => {},
  [DataReceiverActionTypes.DATA_RECEIVER_DISCONNECT]: () => {},
  [DataReceiverActionTypes.DATA_RECEIVER_SET_STATUS]: status => ({ status }),
  [DataReceiverActionTypes.DATA_RECEIVER_SET_DATA]: data => ({ data }),
});
