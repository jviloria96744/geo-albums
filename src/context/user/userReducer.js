import { CREATE_LOGIN_USER, SET_CREATING_USER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case CREATE_LOGIN_USER:
      return {
        ...state,
        creatingUser: false,
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
