import {API_BASE_URL} from '../config';
import { crudError } from './index';
import { normalizeResponseErrors } from './utils';
import { SubmissionError } from 'redux-form';

//  POST/PUT Actions
export const SUBMIT_POST_REQUEST = "SUBMIT_POST_REQUEST";
export const submitPostRequest = () => ({
    type: SUBMIT_POST_REQUEST,
})

export const SUBMIT_POST_SUCCESS = "SUBMIT_POST_SUCCESS";
export const submitPostSuccess = (post, currentUserId, postId) => ({
    type: SUBMIT_POST_SUCCESS,
    post,
    currentUserId,
    postId
})

export const submitPost = (values, currentUserId, postId) => (dispatch, getState) =>{
    //  use the same form for editing existing forms and creating a new one
    const method = postId ? "PUT" : "POST";
    const path = postId ? `${API_BASE_URL}/posts/${currentUserId}/${postId}` : `${API_BASE_URL}/posts/${currentUserId}`; 
    dispatch(submitPostRequest());
    fetch(path, { 
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(post => {
        dispatch(submitPostSuccess(post, currentUserId, postId));
    }).catch(err => {
        dispatch(crudError("An error has occured. Please try again."));
        const {message, location, status} = err;
        if (status === 400) {
            // Convert errors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        else{
            return Promise.reject(
                new SubmissionError({
                    _error: 'Unable to create post, please try again',
                })
            );
        }
    });
}


//  Delete POST
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const deletePostSuccess = (currentUserId, postId) => ({
    type: DELETE_POST_SUCCESS,
    currentUserId,
    postId
});

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const deletePostRequest = () => ({
    type: DELETE_POST_REQUEST,
})

export const deletePost = (currentUserId, postId) => (dispatch, getState) =>{
    dispatch(deletePostRequest());
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/posts/${currentUserId}/${postId}`, { 
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(deletePostSuccess(currentUserId, postId));
    })
    .catch(err => {
        dispatch(crudError("An error has occured. Please try refreshing!"));
    });
}