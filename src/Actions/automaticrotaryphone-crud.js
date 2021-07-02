import {
  API_BASE_URL
} from '../config';

/* GENERAL */

export const CHANGE_ERROR = "CHANGE_ERROR";
export const changeError = bool => ({
  type: CHANGE_ERROR,
  bool
})

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

/* GET ACTIONS */

export const FETCH_AUTOMATICROTARYPHONE_SUCCESS = 'FETCH_AUTOMATICROTARYPHONE_SUCCESS';
export const fetchAUTOMATICROTARYPHONESuccess = AUTOMATICROTARYPHONE => ({
  type: FETCH_AUTOMATICROTARYPHONE_SUCCESS,
  AUTOMATICROTARYPHONE
});

export const FETCH_AUTOMATICROTARYPHONE_REQUEST = "FETCH_AUTOMATICROTARYPHONE_REQUEST";
export const fetchAUTOMATICROTARYPHONERequest = () => ({
  type: FETCH_AUTOMATICROTARYPHONE_REQUEST,
})


export const fetchAUTOMATICROTARYPHONE = () => dispatch => {
  dispatch(fetchAUTOMATICROTARYPHONERequest());
  fetch(`${API_BASE_URL}/AUTOMATICROTARYPHONE`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(AUTOMATICROTARYPHONE => {
      dispatch(fetchAUTOMATICROTARYPHONESuccess(AUTOMATICROTARYPHONE));
    })
    .catch(err => {
      dispatch(crudError());
    });
};

export const SUBMIT_Userfile_REQUEST = "SUBMIT_Userfile_REQUEST";
export const submitUserfileRequest = () => ({
  type: SUBMIT_Userfile_REQUEST,
})

export const SUBMIT_Userfile_SUCCESS = "SUBMIT_Userfile_SUCCESS";
export const submitAUTOMATICROTARYPHONEuccess = (Userfile, currentPetId) => ({
  type: SUBMIT_Userfile_SUCCESS,
  Userfile,
  currentPetId
})

export const submitUserfile = (values, currentPetId) => dispatch => {
  const method = currentPetId ? "PUT" : "POST";
  const path = currentPetId ? `${API_BASE_URL}/AUTOMATICROTARYPHONE/${currentPetId}` : `${API_BASE_URL}/AUTOMATICROTARYPHONE`;

  dispatch(submitUserfileRequest());
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
    }).then(Userfile => {
      dispatch(submitAUTOMATICROTARYPHONEuccess(Userfile, currentPetId));
    }).catch(err => {
      dispatch(crudError());
    });
}


/* DELETE ACTIONS */
export const DELETE_Userfile_SUCCESS = 'DELETE_Userfile_SUCCESS';
export const deleteAUTOMATICROTARYPHONEuccess = (currentPetId) => ({
  type: DELETE_Userfile_SUCCESS,
  currentPetId
})

export const DELETE_Userfile_REQUEST = "DELETE_Userfile_REQUEST";
export const deleteUserfileRequest = () => ({
  type: DELETE_Userfile_REQUEST,
})

export const deleteUserfile = (currentPetId) => dispatch => {
  dispatch(deleteUserfileRequest());
  fetch(`${API_BASE_URL}/AUTOMATICROTARYPHONE/${currentPetId}`, {
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
      console.log("HERE");
      console.log('successful deleting');
      dispatch(deleteAUTOMATICROTARYPHONEuccess(currentPetId));
    })
    .catch(err => {
      dispatch(crudError());
    });
}