import { handleActions } from 'modules/helpers';
import { AlertActionTypes } from 'constants/index';

export const systemAlertsState = {
  alerts: [],
};

export default {
  systemAlerts: handleActions(
    {
      [AlertActionTypes.HIDE_ALERT]: (draft, { payload: { id } }) => {
        draft.alerts = draft.alerts.filter(d => d.id !== id);
      },
      [AlertActionTypes.SHOW_ALERT]: (draft, { payload }) => {
        draft.alerts.push(payload);
      },
    },
    systemAlertsState,
  ),
};
