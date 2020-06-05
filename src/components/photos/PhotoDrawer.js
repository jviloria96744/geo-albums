import React from "react";
import PropTypes from "prop-types";
import { SwipeableDrawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paper: {
    width: "75%",
  },
}));

const PhotoDrawer = ({ isOpen, toggleDrawer, photoUrl }) => {
  const classes = useStyles();
  const baseUrl = "https://map-image-test.s3-us-west-2.amazonaws.com/";

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
      classes={{
        paper: classes.paper,
      }}
    >
      <img
        src={baseUrl + photoUrl}
        alt=""
        style={{ height: "400px", width: "600px" }}
      />
    </SwipeableDrawer>
  );
};

PhotoDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  photoUrl: PropTypes.string.isRequired,
};

export default PhotoDrawer;
