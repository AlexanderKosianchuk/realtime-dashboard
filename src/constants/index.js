import { keyMirror } from 'modules/helpers';

export const AlertActionTypes = keyMirror({
  SHOW_ALERT: undefined,
  HIDE_ALERT: undefined,
});

export const DataReceiverActionTypes = keyMirror({
  DATA_RECEIVER_CONNECT: undefined,
  DATA_RECEIVER_DISCONNECT: undefined,
  DATA_RECEIVER_SET_STATUS: undefined,
  DATA_RECEIVER_SET_DATA: undefined,
});

export const CONNECTION_STATUS = {
  IDLE: 'idle',
  CONNECTION_ATTEMPT: 'connectionAttempt',
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
};

export const SOCKET_EVENTS = {
  DATA: 'data',
  ERROR: 'error',
};

export const POINTS_MAX_COUNT = 50;

export const SERVER_URL = process.env.URL || 'http://localhost:4000';
