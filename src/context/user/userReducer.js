import {
  CREATE_LOGIN_USER,
  SET_CREATING_USER,
  SET_SHOW_USER_FORM,
  LOGOUT_USER,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case CREATE_LOGIN_USER:
      return {
        ...state,
        creatingUser: false,
        user: action.payload.user,
        alert: action.payload.alert,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        alert: "",
        showUserForm: true,
      };

    case SET_CREATING_USER:
      return {
        ...state,
        creatingUser: true,
      };

    case SET_SHOW_USER_FORM:
      return {
        ...state,
        showUserForm: action.payload,
      };
    default:
      return state;
  }
};
