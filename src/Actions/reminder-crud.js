import { API_BASE_URL } from '../config';

export const SUBMIT_REMINDER_REQUEST = "SUBMIT_REMINDER_REQUEST";
export const submitReminderRequest = () => ({
  type: SUBMIT_REMINDER_REQUEST,
})

export const SUBMIT_REMINDER_SUCCESS = "SUBMIT_REMINDER_SUCESS";
export const submitReminderSuccess = (reminder, currentUserId, reminderId) => ({
  type: SUBMIT_REMINDER_SUCCESS,
  reminder,
  currentUserId,
  reminderId
})

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const submitReminder = (values, currentUserId, reminderId) => dispatch => {
  const method = reminderId ? "PUT" : "POST";
  const path = reminderId ? `${API_BASE_URL}/reminders/${currentUserId}/${reminderId}` : `${API_BASE_URL}/reminders/${currentUserId}`;

  dispatch(submitReminderRequest());
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
    }).then(reminder => {
      console.log('in actions, got back pawfile:', reminder);
      dispatch(submitReminderSuccess(reminder, currentUserId, reminderId));
    }).catch(err => {
      dispatch(crudError(err));
    });
}

/* DELETE */
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

export const deleteReminder = (currentUserId, reminderId) => dispatch => {
  console.log('in delete reminder action, deleting reminder with id', reminderId, 'in User with id', currentUserId);
  dispatch(deleteReminderRequest());
  fetch(`${API_BASE_URL}/reminders/${currentUserId}/${reminderId}`, {
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
      // console.log('deleted successfully');
      dispatch(deleteReminderSuccess(currentUserId, reminderId));
    })
    .catch(err => {
      dispatch(crudError(err));
    });
}