import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {automaticrotaryphoneReducer} from './reducers/automaticrotaryphone-reducer';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers({
    form: formReducer,
    automaticrotaryphone: automaticrotaryphoneReducer,
  }),
  applyMiddleware(thunk)
);