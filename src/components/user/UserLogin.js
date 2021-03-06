import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import UserContext from "../../context/user/userContext";

/**
 *
 * Component that handles and displays form for user to login/create account
 * I want to later replace this with an OAuth sign-in component
 */

const UserLogin = () => {
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userContext = useContext(UserContext);
  const { creatingUser, createLoginUser, alert } = userContext;

  const handleButtonClick = () => {
    createLoginUser(userValue, passwordValue);
  };

  return (
    <form noValidate autoComplete="off">
      <Typography variant="h6" style={{ marginTop: "3vh" }}>
        Login/Create Account
      </Typography>
      <div>
        <TextField
          label="Username"
          value={userValue}
          onChange={(e) => setUserValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div>
        <TextField
          type={!showPassword ? "password" : "text"}
          label="Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {showPassword ? (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div>
        <Button
          color="primary"
          style={{ width: "100%" }}
          disabled={userValue === "" || passwordValue === ""}
          onClick={() => handleButtonClick()}
        >
          {creatingUser ? (
            <CircularProgress size={12} color="secondary" />
          ) : (
            "Login/Create Account"
          )}
        </Button>
      </div>
      {alert.length > 0 && <Alert severity="error">{alert}</Alert>}
    </form>
  );
};

export default UserLogin;
