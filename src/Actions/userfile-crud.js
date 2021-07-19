import {API_BASE_URL} from '../config';
import { SubmissionError } from 'redux-form';
import { normalizeResponseErrors} from './utils';
import { crudError } from './index';

//	My GET actions

export const FETCH_USERFILES_SUCCESS = 'FETCH_USERFILES_SUCCESS';
export const fetchUserfilesSuccess = userfiles => ({
	type: FETCH_USERFILES_SUCCESS,
	userfiles
});

export const FETCH_USERFILES_REQUEST = "FETCH_USERFILES_REQUEST";
export const fetchUserfilesRequest = () => ({
	type: FETCH_USERFILES_REQUEST,
});


//	TODO: Begin here for debugging
export const fetchUserfiles = () => (dispatch, getState) => {
	dispatch(fetchUserfilesRequest());
	const authToken = getState().auth.authToken;
	fetch(`${API_BASE_URL}/userfiles`, {
		method: 'GET',
		headers: {
			//	provide auth token as credentials
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(userfiles => {
		setTimeout(() => (dispatch(fetchUserfilesSuccess(userfiles))), 1500);
		})
		.catch(err => {
			dispatch(crudError("An error has occured. Please try refreshing!"));
	});
};

//	POST & PUT 