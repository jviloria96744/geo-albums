import React, { useContext } from "react";
import { SwipeableDrawer, useMediaQuery } from "@material-ui/core";
import Gallery from "react-photo-gallery";
import PhotoContext from "../../context/photo/photoContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";

export const PhotoContainer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const useStyles = makeStyles(() => ({
    paper: {
      width: matches ? "75%" : "95%",
    },
  }));
  const classes = useStyles();

  const photoContext = useContext(PhotoContext);
  const {
    isPhotoContainerOpen,
    togglePhotoContainer,
    selectedPhotos,
  } = photoContext;

  const baseUrl = process.env.REACT_APP_BASE_PHOTO_URL;

  const formatPhotos = (photos) => {
    return photos.map((photo) => {
      return {
        src: baseUrl + photo.File,
        width: photo.ImageWidth,
        height: photo.ImageLength,
      };
    });
  };

  return (
    isPhotoContainerOpen && (
      <SwipeableDrawer
        anchor="right"
        open={isPhotoContainerOpen}
        onClose={() => togglePhotoContainer(false)}
        onOpen={() => togglePhotoContainer(true)}
        classes={{
          paper: classes.paper,
        }}
      >
        <Gallery photos={formatPhotos(selectedPhotos)} />
      </SwipeableDrawer>
    )
  );
};

export default PhotoContainer;
