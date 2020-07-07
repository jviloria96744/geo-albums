import { CREATE_LOGIN_USER, SET_CREATING_USER, LOGOUT_USER } from "../types";

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
      };

    case SET_CREATING_USER:
      return {
        ...state,
        creatingUser: true,
      };

    default:
      return state;
  }
};
