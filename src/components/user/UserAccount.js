import React, { useContext, Fragment } from "react";
import { Typography, Link } from "@material-ui/core";
import UserContext from "../../context/user/userContext";
import UserLogin from "./UserLogin";

const UserAccount = () => {
  const userContext = useContext(UserContext);
  const { user, showUserForm, setShowUserForm, logoutUser } = userContext;

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowUserForm(true);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  if (user === null && !showUserForm) {
    return (
      <Fragment>
        <Typography variant="body2" style={{ marginTop: "3vh" }}>
          Welcome, this is a guest account with pre-loaded pictures
        </Typography>
        <Typography>
          <Link href="#" onClick={(e) => handleLoginClick(e)}>
            Login / Create New User
          </Link>
        </Typography>
      </Fragment>
    );
  } else if (user === null && showUserForm) {
    return <UserLogin />;
  }
  return (
    <Fragment>
      <Typography variant="h6" style={{ marginTop: "3vh" }}>
        Welcome {user.username}
      </Typography>
      <Link href="#" onClick={(e) => handleLogoutClick(e)}>
        Logout
      </Link>
    </Fragment>
  );
};

export default UserAccount;
