export const SHOW_Userfile_FORM = 'SHOW_Userfile_FORM';
export const showUserfileForm = (bool, currentUserfileFormId) => ({
  type: SHOW_Userfile_FORM,
  bool,
  currentUserfileFormId
});

export const CHANGE_SORTING_UserS_METHOD = 'CHANGE_SORTING_UserS_METHOD';
export const changeSortingUsersMethod = (sortMethod) => ({
  type: CHANGE_SORTING_UserS_METHOD,
  sortMethod
});

export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";
export const toggleNavbar = (bool) => ({
  type: TOGGLE_NAVBAR,
  bool
  //lying about bool
})

export const CHANGE_CURRENT_User_ID = 'CHANGE_CURRENT_User_ID';
export const changeCurrentUserId = (currentUserId) => ({
  type: CHANGE_CURRENT_User_ID,
  currentUserId
})

export const SHOW_MEDICAL_FORM = "SHOW_MEDICAL_FORM";
export const showMedicalForm = (bool, currentPostId) => ({
  type: SHOW_MEDICAL_FORM,
  bool,
  currentPostId
})

export const SHOW_MEMORY_FORM = "SHOW_MEMORY_FORM";
export const showMemoryForm = (bool, currentPostId) => ({
  type: SHOW_MEMORY_FORM,
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
