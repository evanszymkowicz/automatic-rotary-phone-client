import { API_BASE_URL } from '../config';
import {  normalizeResponseErrors } from './utils';
import {  crudError } from './index';

// POST and PUT Actions
export const SUBMIT_REMINDER_REQUEST = "SUBMIT_REMINDER_REQUEST";
export const submitReminderRequest = () => ({
  type: SUBMIT_REMINDER_REQUEST,
});

export const SUBMIT_REMINDER_SUCCESS = "SUBMIT_REMINDER_SUCESS";
export const submitReminderSuccess = (reminder, currentUserId, reminderId) => ({
  type: SUBMIT_REMINDER_SUCCESS,
  reminder,
  currentUserId,
  reminderId
})

export const submitReminder = (values, currentUserId, reminderId) => (dispatch, getState) => {
  const method = reminderId ? "PUT" : "POST";
  const path = reminderId ? `${API_BASE_URL}/reminders/${currentUserId}/${reminderId}` : `${API_BASE_URL}/reminders/${currentUserId}`;
  dispatch(submitReminderRequest());
  const authToken = getState().auth.authToken;
  fetch ( path, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(values)
  })
  .then(res => normalizeResponseErrors(res))
  ,then(res => res.json())
  .then(reminder => {
    dispatch(submitReminderSuccess(reminder, currentUserId, reminderId));
  }).catch(err => {
    dispatch(crudError("An error has occured. Please try again."));
  });
}

//  DELETE
export const DELETE_REMINDER_SUCCESS = 'DELETE_REMINDER_SUCCESS';
export const deleteReminderSuccess = (currentUserId, reminderId) => ({
  type: DELETE_REMINDER_SUCCESS,
  currentUserId,
  reminderId
});

export const DELETE_REMINDER_REQUEST = "DELETE_REMINDER_REQUEST";
export const deleteReminderRequest = () => ({
  type: DELETE_REMINDER_REQUEST,
})

export const deleteReminder = (currentUserId, reminderId) => (dispatch, getState) => {
  dispatch(deleteReminderRequest());
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/reminders/${currentUserId}/${reminderId}`, { 
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(deleteReminderSuccess(currentUserId, reminderId));
    })
    .catch(err => {
        dispatch(crudError("An error has occured. Please try refreshing!"));
    });
  }