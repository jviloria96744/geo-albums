import React, { useContext, Fragment } from "react";
import { Typography, Link } from "@material-ui/core";
import UserContext from "../../context/user/userContext";
import UserLogin from "./UserLogin";

/**
 *
 * Component that displays options for user to login/create/delete account
 * I want to later replace this with an OAuth sign-in component
 */

const UserAccount = () => {
  const userContext = useContext(UserContext);
  const { user, logoutUser, deleteUser } = userContext;

  const handleLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const handleDeleteClick = (e) => {
    deleteUser(user.username);
  };

  if (user === null) {
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
      <Link href="#" onClick={(e) => handleDeleteClick(e)}>
        Delete Account
      </Link>
    </Fragment>
  );

  // if (user === null && !showUserForm) {
  //   return (
  //     <Fragment>
  //       <Typography variant="body2" style={{ marginTop: "3vh" }}>
  //         Welcome, this is a guest account with pre-loaded pictures
  //       </Typography>
  //       <Typography>
  //         <Link href="#" onClick={(e) => handleLoginClick(e)}>
  //           Login / Create New User
  //         </Link>
  //       </Typography>
  //     </Fragment>
  //   );
  // } else if (user === null && showUserForm) {
  //   return <UserLogin />;
  // }
  // return (
  //   <Fragment>
  //     <Typography variant="h6" style={{ marginTop: "3vh" }}>
  //       Welcome {user.username}
  //     </Typography>
  //     <Link href="#" onClick={(e) => handleLogoutClick(e)}>
  //       Logout
  //     </Link>
  //     <Link href="#" onClick={(e) => handleDeleteClick(e)}>
  //       Delete Account
  //     </Link>
  //   </Fragment>
  // );
};

export default UserAccount;
