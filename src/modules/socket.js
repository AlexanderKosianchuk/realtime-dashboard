// @flow
import io from 'socket.io-client';
import { SERVER_URL } from 'constants/index';

let storedSocketHandler = null;

export default function socket() {
  if (storedSocketHandler) {
    return Promise.resolve(storedSocketHandler);
  }

  return new Promise((resolve, reject) => {
    storedSocketHandler = io(SERVER_URL);

    /* Reconnection logic should be somewhere here */
    storedSocketHandler
      .on('connect', () => {
        console.info('socket connected');

        resolve(storedSocketHandler);
      })
      .on('connect_error', () => {
        console.warn('socket connect error');

        storedSocketHandler = null;
        reject(new Error('connect error'));
      });
  });
}
