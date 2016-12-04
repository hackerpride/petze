import appReducer from './app/reducer';
import injectDependencies from './lib/injectDependencies';
import {applyMiddleware, createStore} from 'redux';

export default function configureStore({credentialsStore, initialState}) {

  const dependenciesMiddleware = injectDependencies({
    credentialsStore
  });

  const middleware = [
    dependenciesMiddleware
  ];

  const createReduxStore = applyMiddleware(...middleware);
  const store = createReduxStore(createStore)(appReducer, initialState);

  return store;
}
