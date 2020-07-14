//import app from './app';
import dataReceiverReducer from 'features/dataReceiver/reducers/dataReceiverReducer';
import systemAlertsReducer from 'features/systemAlerts/reducers/systemAlertsReducer';

export default {
  ...dataReceiverReducer,
  ...systemAlertsReducer,
};
