import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { userApi } from "../../api/user/userApi";
import { CREATE_LOGIN_USER, SET_CREATING_USER, LOGOUT_USER } from "../types";

const UserState = (props) => {
  const initialState = {
    user: null,
    creatingUser: false,
    alert: "",
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const createLoginUser = async (username, password) => {
    setCreatingUser();

    const res = await userApi.post(
      "/user",
      JSON.stringify({
        username,
        password,
      })
    );

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

  const deleteUser = async (username) => {
    const res = await userApi.delete("/user", {
      username,
    });

    console.log(res);

    dispatch({
      type: LOGOUT_USER,
    });
  };

  const setCreatingUser = () => {
    dispatch({ type: SET_CREATING_USER });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        creatingUser: state.creatingUser,
        alert: state.alert,
        createLoginUser,
        logoutUser,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
