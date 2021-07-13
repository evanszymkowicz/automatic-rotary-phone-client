import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import {userfileReducer} from './reducers/userfile-reducer';
import thunk from 'redux-thunk';

import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    userfile: userfileReducer,
  }),
  applyMiddleware(thunk),
);


//  ensure that the app is properly hydrated
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;