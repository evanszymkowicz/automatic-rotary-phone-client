import {API_BASE_URL} from '../config';

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

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const submitPost = (values, currentUserId, postId) => dispatch =>{
    //  use the same form for editing existing forms and creating a new one
    const method = postId ? "PUT" : "POST";
    const path = postId ? `${API_BASE_URL}/posts/${currentUserId}/${postId}` : `${API_BASE_URL}/posts/${currentUserId}`; 
    dispatch(submitPostRequest());
    fetch(path, { 
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(post => {
        console.log('in actions, got back post:', post);
        dispatch(submitPostSuccess(post, currentUserId, postId));
    }).catch(err => {
        dispatch(crudError(err));
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

export const deletePost = (currentUserId, postId) => dispatch =>{
    dispatch(deletePostRequest());
    fetch(`${API_BASE_URL}/posts/${currentUserId}/${postId}`, { 
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        console.log('successful deleting');
        dispatch(deletePostSuccess(currentUserId, postId));
    })
    .catch(err => {
        dispatch(crudError(err));
    });
  }