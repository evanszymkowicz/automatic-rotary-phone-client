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

//	The logic behind the reducers
//	TODO: Begin here for debugging
export const fetchUserfiles = () => (dispatch, getState) => {
	dispatch(fetchUserfilesRequest());
	const authToken = getState().auth.authToken;
	fetch(`${API_BASE_URL}/userfiles`, {
		method: 'GET',
		//	provide auth token as credentials
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(res => res.json())
	.then(userfiles => {
		setTimeout(() => (dispatch(fetchUserfilesSuccess(userfiles))), 1500);
		})
		.catch(err => {
			dispatch(crudError("An error has occured. Please try again."));
	});
};

//	POST/PUT Actions

export const SUBMIT_USERFILE_REQUEST = "SUBMIT_USERFILE_REQUEST";
export const submitUserfileRequest = () => ({
	type: SUBMIT_USERFILE_REQUEST,
});

export const SUBMIT_USERFILE_SUCCESS = "SUBMIT_USEFILE_SUCCESS";
export const submitUserfileSuccess = (userfile, currentUserId) => ({
	TYPE: SUBMIT_USERFILE_SUCCESS,
	userfile,
	currentUserId
});

export const submitUserfile = (values, currentUserId) => (dispatch, getState) => {
	let formData = new FormData();
	Object.keys(values).forEach(item => {
		if (item === "img" && values[item].public_id) {
			formData.append('public_id', values[item].public_id)
      formData.append('url', values[item].url)
    }
    else{
    	formData.append(item, (values[item]))
    }
    });
    for (let pair of formData.entries()) {
        // console.log('DATA', pair[0]+ ', ' + pair[1]); 
    }
		const method = currentUserId ? "PUT" : "POST";
		const path = currentUserId ? `${API_BASE_URL}/userfiles/${currentUserId}` : `${API_BASE_URL}/userfiles`;

		dispatch(submitUserfileRequest());
		const authToken = getState().auth.authToken;

		//	this will return whenener there is a promise
		return fetch(path, {
			method: method,
			headers: {
				Authorization: `Bearer ${authToken}`
			},
			body: formData
		})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(userfile => {
			console.log('returning userfile...', userfile)
			dispatch(submitUserfileSuccess(userfile, currentUserId));
		}).catch(err => {
      dispatch(crudError("An error has occured. Please try refreshing!"));
      const {message, location, status} = err;
        if (status === 400) {
            // Convert errors into SubmissionErrors for redux form (Redux is cool!!)
        return Promise.reject(
          new SubmissionError({
          	[location]: message
          })
				);
}
  else{
    	return Promise.reject(
      	new SubmissionError({
					_error: 'Unable to create new userfile. Please try again.',
				}),
			);
		}
	});
}

//	Delete Actions (now should work)
export const DELETE_USERFILE_SUCCESS = "DELETE_USERFILE_SUCCESS"
export const deleteUserfileSuccess = (currentUserId) => ({
	type: DELETE_USERFILE_SUCCESS,
	currentUserId
});

export const DELETE_USERFILE_REQUEST = "DELETE_USERFILE_REQUEST";
export const deleteUserfileRequest = () => ({
	type: DELETE_USERFILE_REQUEST,
})

export const deleteUserfile = (currentUserId) => (dispatch, getState) => {
	dispatch(deleteUserfileRequest());
	const authToken = getState().auth.authToken;
	fetch(`${API_BASE_URL}/userfiles/${currentUserId}`, {
		method: "DELETE",
		headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${authToken}`
		}
	})
	.then(res => normalizeResponseErrors(res))
	.then(() => {
		dispatch(deleteUserfileSuccess(currentUserId));
	})
	.catch(err => {
		dispatch(crudError("An error has occured. Please try again."));
	});
}