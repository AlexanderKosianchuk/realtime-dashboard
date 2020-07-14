import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import { handleActions } from 'modules/helpers';
import {
  DataReceiverActionTypes,
  CONNECTION_STATUS,
  POINTS_MAX_COUNT
} from 'constants/index';

export const dataReceiverState = {
  status: CONNECTION_STATUS.IDLE,
  points: {},
};

export default {
  dataReceiver: handleActions(
    {
      [DataReceiverActionTypes.DATA_RECEIVER_SET_STATUS]: (draft, { payload }) => {
        draft.status = _get(payload, 'status', CONNECTION_STATUS.IDLE);
      },
      [DataReceiverActionTypes.DATA_RECEIVER_CONNECT]: draft => {
        draft.status = CONNECTION_STATUS.CONNECTION_ATTEMPT;
      },
      [DataReceiverActionTypes.DATA_RECEIVER_DISCONNECT]: draft => {
        draft.status = CONNECTION_STATUS.DISCONNECTED;
      },
      [DataReceiverActionTypes.DATA_RECEIVER_SET_DATA]: (draft, { payload }) => {
        const value = _get(payload, 'value', null);
        const timestamp = _get(payload, 'timestamp', null);

        if (typeof value !== 'number' || typeof timestamp !== 'number') {
          return;
        }

        let allPoints = {
          ...draft.points,
          [timestamp]: value,
        }

        const keys = Object.keys(allPoints);
        if (keys.length > POINTS_MAX_COUNT) {
          const slicedPoints = _reduce(
            keys.slice(keys.length - POINTS_MAX_COUNT, keys.length),
            (res, key) => {
              res[key] = allPoints[key];

              return res;
            },
            {},
          );

          allPoints = slicedPoints;
        }

        draft.points = allPoints;
      },
    },
    dataReceiverState,
  ),
};
