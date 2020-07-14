import { all, put, call, select, take, fork, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import _get from 'lodash/get';
import {
  DataReceiverActionTypes,
  SOCKET_EVENTS,
  CONNECTION_STATUS
} from 'constants/index';
import sagaHandleEventData from 'features/dataReceiver/sagas/sagaHandleEventData';
import socket from 'modules/socket';

function createSocketChannel(socketHandler) {
  return eventChannel(emit => {
    const broadcastDataHandler = point => emit({ event: SOCKET_EVENTS.DATA, point });
    const errorHandler = errorEvent =>  emit(new Error(errorEvent));

    socketHandler.on(SOCKET_EVENTS.DATA, broadcastDataHandler);
    socketHandler.on(SOCKET_EVENTS.ERROR, errorHandler);

    const unsubscribe = () => {
      socketHandler.off(SOCKET_EVENTS.DATA, broadcastDataHandler);
      socketHandler.off(SOCKET_EVENTS.ERROR, errorHandler);
    }

    return unsubscribe;
  })
}

export function* sagaSocketConnect() {
  let socketHandler = null;
  yield put({
    type: DataReceiverActionTypes.DATA_RECEIVER_SET_STATUS,
    payload: { status: CONNECTION_STATUS.CONNECTION_ATTEMPT },
  });

  try {
   socketHandler = yield call(socket);

   yield put({
     type: DataReceiverActionTypes.DATA_RECEIVER_SET_STATUS,
     payload: { status: CONNECTION_STATUS.CONNECTED },
   });

   const socketChannel = yield call(createSocketChannel, socketHandler);

   while (true) {
     const { event, point } = yield take(socketChannel);

     const status = yield select(state => _get(state, 'dataReceiver.status'));
     if (status === CONNECTION_STATUS.DISCONNECTED) {
       socketChannel.close();
     }

     switch (event) {
       case SOCKET_EVENTS.DATA:
         yield fork(sagaHandleEventData, point);
         break;
       default:
         console.log('Unknown socket event');
     }
   }
 } catch (err) {
   console.error('sagaSocketConnect', err);
 }

  return socketHandler;
}

export default function* root() {
  yield all([
    takeLatest(
      DataReceiverActionTypes.DATA_RECEIVER_CONNECT,
      sagaSocketConnect
    )
  ]);
}
