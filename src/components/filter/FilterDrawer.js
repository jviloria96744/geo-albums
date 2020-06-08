import React, { Fragment } from "react";
import { Drawer, Typography, Divider, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Filter from "./Filter";
import ImageUpload from "../files/ImageUpload";

const FilterDrawer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const useStyles = makeStyles(() => ({
    paper: {
      width: matches ? "18%" : "100%",
      height: matches ? "100%" : "15%",
      background: "lightgray",
    },
  }));
  const classes = useStyles();
  const filterTypes = ["City", "Country", "Labels"];

  return (
    <Drawer
      anchor={matches ? "left" : "bottom"}
      variant="permanent"
      classes={{ paper: classes.paper }}
    >
      <Fragment>
        <Typography variant="h4">GeoAlbums</Typography>
        <Divider />
        <Typography variant="h5" style={{ marginTop: "3vh" }}>
          Filters
        </Typography>
        {filterTypes.map((filter) => {
          return (
            <Filter filterType={filter} filterLabel={filter} key={filter} />
          );
        })}
        <Divider />
        <Typography variant="h5" style={{ marginTop: "3vh" }}>
          Upload Files
        </Typography>
        <ImageUpload />
      </Fragment>
    </Drawer>
  );
};

export default FilterDrawer;
