import { combineReducers } from 'redux';
import vehicleReducer from './vehicleReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  vehicle: vehicleReducer,
  booking: bookingReducer,
});

export default rootReducer;
