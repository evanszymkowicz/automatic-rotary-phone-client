import { SHOW_USERFILE_FORM, SHOW_UPDATE_PHOTO_FORM, CHANGE_SORTING_USERS_METHOD, LOADING_ANIMATION_TOGGLE, TOGGLE_NAVBAR, CHANGE_CURRENT_USER_ID, SHOW_REMIDNER_FORM, CHANGE_CATEGORY_FILTER, CHANGE_SEARCH_TERM, CRUD_ERROR, SHOW_REMINDER_FORM } from "../actions/index";
import {SUBMIT_REMINDER_REQUEST, SUBMIT_REMINDER_SUCCESS, DELETE_REMINDER_REQUEST, DELETE_REMINDER_SUCCESS} from '../actions/reminder-crud';
import {SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, DELETE_POST_REQUEST, DELETE_POST_SUCCESS} from '../actions/post-crud';
import {FETCH_USERFILES_SUCCESS, FETCH_USERFILES_REQUEST, SUBMIT_USERFILE_REQUEST, SUBMIT_USERFILE_SUCCESS, DELETE_USERFILE_REQUEST, DELETE_USERFILE_SUCCESS} from '../actions/userfile-crud'

const initialState = {
	sortingUsersMethod: "",
	showUserfileForm: false,
	showUpdatePhotoForm: false,
	showMemoryForm: false,
	currentSearchTerm: "",
	categoryFilter: "",
	toggleNavbar: false,

	loadingAnimation: false,
	currentUserfileFormId: undefined, 
	currentUserId: undefined, 
	currentPostId: undefined,
	currentReminderId: undefined,
	userfiles: [],
	userfilesPending: true,	//	fetch all userfiles
	loadingPending: true,
	error: null,
};

export const userfileReducer = (state = initialState, action) => {
	if(action.type===LOADING_ANIMATION_TOGGLE) {
		return Object.assign({}, state, {
			loadingAnimation: action.bool
		})
	}

	// add or edit
	if(action.type=== SHOW_USERFILE_FORM){
    return Object.assign({}, state, {
      showUserfileForm: action.bool,
      currentUserfileFormId: action.currentUserfileFormId
    })
  }

  else if(action.type=== SHOW_UPDATE_PHOTO_FORM){
    console.log('HERE')
    return Object.assign({}, state, {
      showUpdatePhotoForm: action.bool,
      currentUserfileFormId: action.currentUserfileFormId
    })
  }

  else if(action.type===CHANGE_CURRENT_USER_ID){
    return Object.assign({}, state, {
      currentUserId: action.currentUserId,
    })
  }

  else if (action.type=== CHANGE_SORTING_USERS_METHOD){
    return Object.assign({}, state, {
      sortingUsersMethod: action.sortMethod,
    })
  }

  else if (action.type===TOGGLE_NAVBAR){
    if(action.bool===true || action.bool===false){
      return Object.assign({}, state, {
        toggleNavbar: action.bool,
      })
    }
    return Object.assign({}, state, {
      toggleNavbar: !state.toggleNavbar,
    })
  }

  else if(action.type === SHOW_REMINDER_FORM){
    return Object.assign({}, state, {
      showReminderForm: action.bool,
      currentReminderId: action.currentReminderId,
    })
  }

  else if(action.type===CHANGE_SEARCH_TERM){
    return Object.assign({}, state, {
      currentSearchTerm: action.searchTerm,
    })
  }

  else if(action.type===CHANGE_CATEGORY_FILTER){
    return Object.assign({}, state, {
      categoryFilter: action.categoryFilter,
    })
  }

  //	CRUD Actions
  
  else if (action.type===CRUD_ERROR){
    return Object.assign({}, state, {
      userfilesPending: false,
      loadPending: false,
      error: action.error,
    })
  }

  else if (action.type === FETCH_USERFILES_REQUEST) {
    return Object.assign({}, state, {
      userfilesPending: true,
      error: null
    })
  }

  else if (action.type === FETCH_USERFILES_SUCCESS) {
    return Object.assign({}, state, {
      userfiles: action.userfiles,
      userfilesPending: false,
      error: null
    })
  }

  else if (action.type===SUBMIT_USERFILE_REQUEST){
    return Object.assign({}, state, {
      loadPending: true,
      error: null
    })
  }

  else if(action.type===SUBMIT_USERFILE_SUCCESS){
    //	edit existing userfile
    if(action.currentUserId){
      const updatedUserfile = action.userfile;


      const newArrayOfUserfiles = state.userfiles.map((item)=> {
        return (item.id===action.currentUserId ? updatedUserfile : item);
      })
  
      return Object.assign({}, state, {
          userfiles: newArrayOfUserfiles,
          // individualUserfile: action.userfile,
          loadPending: false,
          error: null
      })
    }

    //if its a new obj
    return Object.assign({}, state, {
      userfiles: [
        ...state.userfiles,
        action.userfile
      ],
      loadPending: false,
      error: null
    })
  }

  else if (action.type===DELETE_USERFILE_REQUEST){
    return Object.assign({}, state, {
      loadPending: true,
      error: null
    })
  }

  else if(action.type===DELETE_USERFILE_SUCCESS){
    const newArrayOfUserfiles = state.userfiles.filter((userfile)=> (userfile.id!==action.currentUserId));

    return Object.assign({}, state, {
      userfiles: newArrayOfUserfiles,
      loadPending: false,
      error: null
    })
  }

  // FOR REMINDER: 
  else if (action.type === SUBMIT_REMINDER_REQUEST){
    return Object.assign({}, state, {
      loadPending: true,
      error: null
    })
  }

  else if (action.type=== SUBMIT_REMINDER_SUCCESS){
    //figure out which userfile I need to updated 
    let userfileToUpdate = {...state.userfiles.find(userfile=> userfile.id===action.currentUserId)};

    //if I'm editing a reminder: 
    if(action.reminderId){
      let reminderToUpdate = action.reminder;
      userfileToUpdate.reminders = userfileToUpdate.reminders.map((reminder)=> (reminder.id===action.reminderId ? reminderToUpdate : reminder))
    }
    //if I'm adding a reminder: 
    else{
      userfileToUpdate.reminders = [...userfileToUpdate.reminders, action.reminder];
    }

    const newArrayOfUserfiles = state.userfiles.map((item)=> (item.id===action.currentUserId ? userfileToUpdate : item))

    return Object.assign({}, state, {
        loadPending: false, 
        userfiles: newArrayOfUserfiles,
        error: null
    })
  }

  else if (action.type===DELETE_REMINDER_REQUEST){
    return Object.assign({}, state, {
      loadPending: true,
      error: null
    })
  }

  else if(action.type=== DELETE_REMINDER_SUCCESS){
    let userfileToUpdate = {...state.userfiles.find(userfile=> userfile.id===action.currentUserId)};
    const updatedReminders = userfileToUpdate.reminders.filter((reminder)=> (reminder.id!==action.reminderId));
    userfileToUpdate.reminders=updatedReminders;
    const newArrayOfUserfiles = state.userfiles.map((item)=> (item.id===action.currentUserId ? userfileToUpdate : item))

    return Object.assign({}, state, {
      userfiles: newArrayOfUserfiles,
      loadPending: false,
      error: null
    })
  }

  //	POSTS
  else if (action.type===SUBMIT_POST_REQUEST){
    return Object.assign({}, state, {
      loadPending: true,
      error: null
    })
  }

  else if (action.type=== SUBMIT_POST_SUCCESS){
    // userfile join on current userid
    let userfileToUpdate = {...state.userfiles.find(userfile=> userfile.id===action.currentUserId)};

    //	editing post
    if(action.postId){
      let postToUpdate = action.post;
      userfileToUpdate.posts = userfileToUpdate.posts.map((post)=> (post.id===action.postId ? postToUpdate : post))
    }
    // adding a post
    else{
      userfileToUpdate.posts = [...userfileToUpdate.posts, action.post];
    }

    const newArrayOfUserfiles = state.userfiles.map((item)=> (item.id===action.currentUserId ? userfileToUpdate : item))
    return Object.assign({}, state, {
        loadPending: false,
        userfiles: newArrayOfUserfiles,
        error: null
    })
  }
  else if (action.type===DELETE_POST_REQUEST){
    return Object.assign({}, state, {
      loadPending: true,
      error: null
    })
  }

  else if(action.type=== DELETE_POST_SUCCESS){
    let userfileToUpdate = {...state.userfiles.find(userfile=> userfile.id===action.currentUserId)};
    const updatedPosts = userfileToUpdate.posts.filter((post)=> (post.id!==action.postId));
    userfileToUpdate.posts=updatedPosts;
    const newArrayOfUserfiles = state.userfiles.map((item)=> (item.id===action.currentUserId ? userfileToUpdate : item))

    return Object.assign({}, state, {
      userfiles: newArrayOfUserfiles,
      loadPending: false,
      error: null
    });
  }
	return state;
}