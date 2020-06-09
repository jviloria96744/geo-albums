import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { userApi } from "../../api/user/userApi";
import {
  CREATE_LOGIN_USER,
  SET_CREATING_USER,
  SET_SHOW_USER_FORM,
  LOGOUT_USER,
} from "../types";

const UserState = (props) => {
  const initialState = {
    user: null,
    creatingUser: false,
    showUserForm: false,
    alert: "",
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const createLoginUser = async (username, password) => {
    setCreatingUser();

    const res = await userApi.post("/get_create_user", {
      username,
      password,
    });

    console.log(res);

    dispatch({
      type: CREATE_LOGIN_USER,
      payload: res.data,
    });
  };

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    });
  };

  const setCreatingUser = () => {
    dispatch({ type: SET_CREATING_USER });
  };

  const setShowUserForm = (state) => {
    dispatch({
      type: SET_SHOW_USER_FORM,
      payload: state,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        creatingUser: state.creatingUser,
        showUserForm: state.showUserForm,
        alert: state.alert,
        createLoginUser,
        setShowUserForm,
        logoutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
