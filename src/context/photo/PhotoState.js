import React, { useReducer } from "react";
import PhotoContext from "./photoContext";
import PhotoReducer from "./photoReducer";
import { photoApi } from "../../api/photos/photoApi";
import {
  TOGGLE_PHOTO_CONTAINER,
  SET_SELECTED_PHOTOS,
  UPLOAD_NEW_PHOTO,
  UPDATE_FILTERS,
  SET_NEW_USER_PHOTOS,
} from "../types";
import { PHOTO_METADATA } from "../../api/photos";

const PhotoState = (props) => {
  const initialState = {
    allPhotos: [],
    filteredPhotos: [],
    isPhotoContainerOpen: false,
    selectedPhotos: [],
    filterValues: {
      City: [],
      Country: [],
      Labels: [],
    },
  };

  const [state, dispatch] = useReducer(PhotoReducer, initialState);

  const togglePhotoContainer = (isOpen) => {
    dispatch({
      type: TOGGLE_PHOTO_CONTAINER,
      payload: isOpen,
    });
  };

  const setSelectedPhotos = (photos) => {
    dispatch({
      type: SET_SELECTED_PHOTOS,
      payload: photos,
    });
  };

  const uploadNewPhotos = (photos) => {
    Promise.all(
      photos.map((photo) => {
        console.log(photo);
        console.log("Filling each element of promise array");
        return photoApi.post("/upload_photo", {
          image: photo.photoData,
          name: photo.photoName,
          username: photo.username,
        });
      })
    ).then((results) => {
      const uploadedPhotos = results.map((res) => {
        return !res.data.Error
          ? {
              ...res.data,
              GPSLat: parseFloat(res.data.GPSLat),
              GPSLng: parseFloat(res.data.GPSLng),
              ImageWidth: parseInt(res.data.ImageWidth),
              ImageLength: parseInt(res.data.ImageLength),
            }
          : null;
      });

      dispatch({
        type: UPLOAD_NEW_PHOTO,
        payload: uploadedPhotos,
      });
    });
  };

  const updateFilters = (updatedFilterType, newFilterValues) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: {
        updatedFilterType,
        newFilterValues,
      },
    });
  };

  const setNewUserPhotos = (user) => {
    dispatch({
      type: SET_NEW_USER_PHOTOS,
      payload: !user ? PHOTO_METADATA : user.photos,
    });
  };

  return (
    <PhotoContext.Provider
      value={{
        isPhotoContainerOpen: state.isPhotoContainerOpen,
        selectedPhotos: state.selectedPhotos,
        filteredPhotos: state.filteredPhotos,
        filterValues: state.filterValues,
        togglePhotoContainer,
        setSelectedPhotos,
        uploadNewPhotos,
        updateFilters,
        setNewUserPhotos,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoState;
