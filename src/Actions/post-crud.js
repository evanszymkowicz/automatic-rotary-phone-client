import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import { SubmissionError } from 'redux-form';
import {crudError} from './index';

//  First post and put actions
export const SUBMIT_POST_REQUEST = "SUBMIT_POST_REQUEST";
export const submitPostRequest = () => ({
  type: SUBMIT_POST_REQUEST,
})

export const SUBMIT_POST_SUCCESS = "SUBMIT_POST_SUCCESS";
export const submitPostSuccess = (post, currentUserId, postId) => ({
  type: SUBMIT_POST_REQUEST,
  post,
  currentUserId,
  postId
})
//  TODO: Resume work on submit action here

// export const submitPost = (values, currentUserId, postId) => (dispatch, getState) => {
//   let formData = new FormData();

//   if (values.type === " ") {
//     Object.keys(values).forEach(item => {

//     })
//   }


//  Delete POST

export const DELETE_POST_SUCCESS = 'DELTE_POST_SUCCESS';
export const deletePostSuccess = (currentUserId, postId) => ({
  type: DELETE_POST_SUCCESS,
  currentUserId,
  postId
});

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const deletePostRequest = () => ({
  type: DELETE_POST_REQUEST,
});

export const deletePost = (currentUserId, postId) => (dispatch, getState) => { 
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