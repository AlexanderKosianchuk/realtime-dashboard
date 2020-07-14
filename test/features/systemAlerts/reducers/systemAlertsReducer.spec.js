import reducer from 'features/systemAlerts/reducers/systemAlertsReducer';
import { hideAlert, showAlert } from 'features/systemAlerts/actions/systemAlertsActions';

import { AlertActionTypes } from 'constants/index';

describe('systemAlerts systemAlertsReducer', () => {
  let systemAlerts = reducer.systemAlerts(undefined, {});

  it('should return the initial state', () => {
    expect(reducer.systemAlerts(systemAlerts, {})).toMatchSnapshot();
  });

  it(`should handle ${AlertActionTypes.SHOW_ALERT}`, () => {
    systemAlerts = reducer.systemAlerts(systemAlerts, showAlert('HELLO', { id: 'test', type: 'success' }));
    expect(systemAlerts).toMatchSnapshot();
  });

  it(`should handle ${AlertActionTypes.HIDE_ALERT}`, () => {
    systemAlerts = reducer.systemAlerts(systemAlerts, hideAlert('test'));
    expect(systemAlerts).toMatchSnapshot();
  });
});
