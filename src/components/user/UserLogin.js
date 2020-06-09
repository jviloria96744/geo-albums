import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import UserContext from "../../context/user/userContext";

const UserLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const userContext = useContext(UserContext);
  const { creatingUser, createLoginUser } = userContext;

  const handleButtonClick = () => {
    createLoginUser(user, password);
  };

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          label="Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          disabled={user === "" || password === ""}
          onClick={() => handleButtonClick()}
        >
          {creatingUser ? (
            <CircularProgress size={12} color="secondary" />
          ) : (
            "Login/Create Account"
          )}
        </Button>
      </div>
    </form>
  );
};

export default UserLogin;
