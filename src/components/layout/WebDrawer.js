import React, { Fragment } from "react";
import { Drawer, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "../filter/Filter";
import ImageUpload from "../files/ImageUpload";
import UserAccount from "../user/UserAccount";

const WebDrawer = () => {
  const useStyles = makeStyles(() => ({
    paper: {
      width: "20%",
      height: "100%",
      background: "lightgray",
    },
  }));
  const classes = useStyles();
  const filterTypes = ["City", "Country", "Labels"];

  return (
    <Drawer
      anchor={"left"}
      variant="permanent"
      classes={{ paper: classes.paper }}
    >
      <Fragment>
        <Typography variant="h4">GeoAlbums</Typography>
        <Divider />
        <UserAccount />
        <ImageUpload />
        <Divider />
        <Typography variant="h6" style={{ marginTop: "3vh" }}>
          Filters
        </Typography>
        {filterTypes.map((filter) => {
          return (
            <Filter filterType={filter} filterLabel={filter} key={filter} />
          );
        })}
        <Divider />
      </Fragment>
    </Drawer>
  );
};

export default WebDrawer;
