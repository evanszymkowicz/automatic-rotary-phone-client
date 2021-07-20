export const SHOW_USERFILE_FORM = 'SHOW_USERFILE_FORM';
export const showUserfileForm = (bool, currentUserfileFormId) => ({
  type: SHOW_USERFILE_FORM,
  bool,
  currentUserfileFormId
});

export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";
export const toggleNavbar = (bool) => ({
  type: TOGGLE_NAVBAR,
  bool
});

export const SHOW_UPDATE_PHOTO_FORM = 'SHOW_UPDATE_PHOTO_FORM';
export const showUpdatePhotoForm = (bool, currentUserfileFormId) => ({
  type: SHOW_UPDATE_PHOTO_FORM,
  bool,
  currentUserfileFormId
});

export const CHANGE_SORTING_USERS_METHOD = 'CHANGE_SORTING_USERS_METHOD';
export const changeSortingUsersMethod = (sortMethod) => ({
  type: CHANGE_SORTING_USERS_METHOD,
  sortMethod
});

export const CHANGE_CURRENT_USER_ID = 'CHANGE_CURRENT_USER_ID';
export const changeCurrentUserId = (currentUserId) => ({
  type: CHANGE_CURRENT_USER_ID,
  currentUserId
})

export const SHOW_POST_FORM = "SHOW_POST_FORM";
export const showMemoryForm = (bool, currentPostId) => ({
  type: SHOW_POST_FORM,
  bool,
  currentPostId
})

export const SHOW_REMINDER_FORM = 'SHOW_REMINDER_FORM';
export const showReminderForm = (bool, currentReminderId) => ({
  type: SHOW_REMINDER_FORM,
  bool,
  currentReminderId
});

export const CHANGE_SEARCH_TERM = "CHANGE_SEARCH_TERM";
export const changeSearchTerm = (searchTerm) => ({
  type: CHANGE_SEARCH_TERM,
  searchTerm
})

export const CHANGE_CATEGORY_FILTER = "CHANGE_CATEGORY_FILTER";
export const changeCategoryFilter = (categoryFilter) => ({
  type: CHANGE_CATEGORY_FILTER,
  categoryFilter
})

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = (error) => ({
  type: CRUD_ERROR,
  error
})

export const LOADING_ANIMATION_TOGGLE = "LOADING_ANIMATION_TOGGLE";
export const loadingAnimationToggle = (bool) => ({
  type: LOADING_ANIMATION_TOGGLE,
  bool
})
