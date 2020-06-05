import React, { Fragment } from "react";
import { Drawer, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Filter from "./Filter";

const useStyles = makeStyles(() => ({
  paper: {
    width: "18%",
    background: "lightgray",
  },
}));

const FilterDrawer = () => {
  const classes = useStyles();
  const filterTypes = ["City", "Country", "Labels"];

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      classes={{
        paper: classes.paper,
      }}
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
      </Fragment>
    </Drawer>
  );
};

export default FilterDrawer;
