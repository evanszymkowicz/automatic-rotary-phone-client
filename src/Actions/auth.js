import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken  = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
	type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
	type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
	type: AUTH_SUCCESS,
	currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
	type: AUTH_ERROR,
	error
});

export const CHANGE_SUCCESS_MESSAGE = 'CHANGE_SUCCESS_MESSAGE';
export const changeSuccessMessage = (message) => ({
	type: CHANGE_SUCCESS_MESSAGE,
	message
});

//	this will store the auth token in state and localStorage 
//	user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken.user));
	saveAuthToken(authToken);
	// dispatch(authRequest());
};

export const login = (username, password) => dispatch => {
	dispatch(authRequest());
	return (
		fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})
		 // Reject any requests which don't return a 200 status creating errors which follow a consistent format
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({authToken}) => storeAuthInfo(authToken, dispatch))
		.catch(err => {
			const {status} = err;
      const message = status === 401 ? 'Incorrect username or password' : 'Unable to login, please try again';
      dispatch(authError(err));
      // Could not authenticate so it will return a ReduxForm Submission Error 
      return Promise.reject(
      	new SubmissionError({
          _error: message
				})
		  );
    })
  );
};

export const refreshAuthToken = () => (dispatch, getState) => {
	dispatch(authRequest());
	const authToken = getState().auth.authToken;
	return fetch(`${API_BASE_URL}/refresh`, {
		method: 'POST',
		headers: {
			//	provide existing token as credentials to get a new one
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(({authToken}) => storeAuthInfo(authToken, dispatch))
	.catch(err => { //	auth credentials are invalid or expired so clear and sign out
		dispatch(authError(err));
		dispatch(clearAuth());
		clearAuthToken(authToken);
	});
};

export const refreshProfileAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/refresh-profile`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
  });
};