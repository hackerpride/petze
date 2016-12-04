export default function injectDependencies(statics, dynamic = {}) {
  return ({dispatch, getState}) => next => action => {
    if (typeof action !== 'function') return next(action);
    const dependencies = {...statics};
    Object.keys(dynamic).forEach(key => {
      dependencies[key] = dynamic[key](getState());
    });
    return dispatch(action({...dependencies, getState, dispatch}));
  };
}
