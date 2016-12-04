import {
  combineReducers
}
from 'redux';

import auth from '../auth/reducer';
import device from '../device/reducer';

const appReducer = combineReducers({
  auth,
  device,
});

export default appReducer;
