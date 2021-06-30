import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default createStore(
  combineReducers({
    form: formReducer,
    automaticrotaryphone: automaticrotaryphoneReducer,
  }),
  applyMiddleware(thunk)
);