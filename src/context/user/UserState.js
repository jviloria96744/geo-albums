import React, { useReducer } from "react";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import { userApi } from "../../api/user/userApi";
import { CREATE_LOGIN_USER, SET_CREATING_USER } from "../types";

const UserState = (props) => {
  const initialState = {
    user: null,
    creatingUser: false,
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

  const setCreatingUser = () => {
    dispatch({ type: SET_CREATING_USER });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        creatingUser: state.creatingUser,
        createLoginUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
