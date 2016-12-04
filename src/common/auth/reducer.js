import * as actions from './actions';
import {Record} from 'immutable';

const InitialState = Record({
  auth: null,
  isLoggedIn: false,
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case actions.LOGIN:
      {
        const auth = action.payload;
        return state.set('auth', auth);
      }
      
  }
  return state;
}
